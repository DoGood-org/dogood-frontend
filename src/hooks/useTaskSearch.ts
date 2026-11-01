import {
  getAllTasksService,
  ITaskApi,
  searchTasksService,
} from '@/services/taskService';
import { TaskCategoryEnum } from '@/types/createTask.type';
import { ISearchTasksPayload } from '@/types/tasks.type';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useEffect, useRef } from 'react';

const TASK_CATEGORIES = new Set<string>(
  Object.values(TaskCategoryEnum).map((category) =>
    String(category).toUpperCase()
  )
);

const KM_IN_MILE = 1.60934;

const parseTasks = (body: unknown): ITaskApi[] =>
  Array.isArray(body)
    ? (body as ITaskApi[])
    : ((body as { tasks?: ITaskApi[] } | undefined)?.tasks ?? []);

// Key for removing duplicates when merging two responses
const getTaskKey = (task: ITaskApi): string => {
  const t = task as ITaskApi & { _id?: string; id?: string };
  return String(t._id ?? t.id ?? JSON.stringify(task));
};

export const useTaskSearch = (onResult: (raw: ITaskApi[]) => void): void => {
  const searchQuery = useFilterStore((s) => s.searchQuery);
  const choosenCategories = useFilterStore((s) => s.choosenCategories);
  const distanceFilter = useFilterStore((s) => s.distanceFilter);
  const distanceUnit = useFilterStore((s) => s.distanceUnit);
  const locationData = useFilterStore((s) => s.locationData);

  const userLocation = useMapStore((s) => s.userLocation);
  const defaultLocation = useMapStore((s) => s.defaultLocation);

  // Always use the latest onResult without triggering a new request
  const onResultRef = useRef(onResult);

  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  // Search center: chosen location -> user location -> default location
  const base = locationData ?? userLocation ?? defaultLocation;

  // Convert selected distance to kilometers
  const radiusValue =
    distanceFilter && distanceFilter !== 'all' ? Number(distanceFilter) : null;

  const radiusKm =
    radiusValue !== null && Number.isFinite(radiusValue) && radiusValue > 0
      ? distanceUnit === 'mi'
        ? radiusValue * KM_IN_MILE
        : radiusValue
      : null;

  const centerLat = radiusKm !== null ? (base?.lat ?? null) : null;
  const centerLng = radiusKm !== null ? (base?.lng ?? null) : null;

  // Location selected from autocomplete
  const address = locationData?.address ?? null;

  useEffect(() => {
    let cancelled = false;

    const fetchTasks = async (): Promise<void> => {
      try {
        const query = searchQuery.trim();
        const queryUpper = query.toUpperCase();

        // 1. Categories: search field has priority over the filter panel
        const searchedCategories = query
          ? Array.from(TASK_CATEGORIES).filter((category) =>
              category.startsWith(queryUpper)
            )
          : [];

        const panelCategories = choosenCategories
          .filter((category) => !!category && category !== 'all')
          .map((category) => String(category).toUpperCase())
          .filter((category) => TASK_CATEGORIES.has(category));

        const categories =
          searchedCategories.length > 0 ? searchedCategories : panelCategories;

        // Text from the search field that is not a category
        const textQuery =
          query && searchedCategories.length === 0 ? query : null;

        // Common part of every request
        const common: ISearchTasksPayload = {};

        if (categories.length > 0) {
          common.categories = categories;
        }

        const withRadius = (payload: ISearchTasksPayload): void => {
          if (radiusKm !== null && centerLat !== null && centerLng !== null) {
            payload.location = { lat: centerLat, lng: centerLng };
            payload.radiusKm = radiusKm;
          }
        };

        // 2. Build requests
        const payloads: ISearchTasksPayload[] = [];

        if (address) {
          // Chosen location: location name + optional title (AND)
          const payload: ISearchTasksPayload = {
            ...common,
            locationName: address,
          };

          if (textQuery) {
            payload.title = textQuery;
          }

          withRadius(payload);
          payloads.push(payload);
        } else if (textQuery) {
          // Unknown text: by title OR by location name
          const byTitle: ISearchTasksPayload = { ...common, title: textQuery };
          withRadius(byTitle);

          // No radius here: coordinates would come from the user location
          const byLocation: ISearchTasksPayload = {
            ...common,
            locationName: textQuery,
          };

          payloads.push(byTitle, byLocation);
        } else {
          // Only categories and/or radius
          const payload: ISearchTasksPayload = { ...common };
          withRadius(payload);

          if (Object.keys(payload).length > 0) {
            payloads.push(payload);
          }
        }

        console.log('[search payloads]', payloads);

        const isSearch = payloads.length > 0;

        const results = isSearch
          ? await Promise.all(payloads.map((p) => searchTasksService(p)))
          : [await getAllTasksService()];

        if (cancelled) return;

        const merged = new Map<string, ITaskApi>();
        let hasAnswer = false;

        for (const res of results) {
          if (!res.ok) {
            // 404 = nothing found, it is a valid empty answer
            if (isSearch && res.status === 404) {
              hasAnswer = true;
              continue;
            }

            console.error('Tasks request failed:', res.errorMessage);
            continue;
          }

          hasAnswer = true;

          parseTasks(res.data.data as unknown).forEach((task) => {
            merged.set(getTaskKey(task), task);
          });
        }

        if (!hasAnswer) return;

        onResultRef.current(Array.from(merged.values()));
      } catch (error) {
        if (!cancelled) {
          console.error('Tasks request error:', error);
        }
      }
    };

    fetchTasks();

    return (): void => {
      cancelled = true;
    };
  }, [searchQuery, choosenCategories, radiusKm, centerLat, centerLng, address]);
};
