'use client';

import { useOrganizationFilters } from '@/zustand/selectors/organizationSelectors';
import { useCallback } from 'react';

const STORAGE_KEY = 'organization-filters';

type FilterPersistenceResponse = {
  saveFilters: () => void;
  restoreFromStorage: () => boolean;
};

export const useOrganizationFiltersPersistence =
  (): FilterPersistenceResponse => {
    const { search, page, restoreFilters } = useOrganizationFilters();

    const saveFilters = useCallback((): void => {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          search,
          page,
        })
      );
    }, [search, page]);

    const restoreFromStorage = useCallback((): boolean => {
      const data = sessionStorage.getItem(STORAGE_KEY);

      if (!data) {
        return false;
      }

      try {
        const parsed = JSON.parse(data);

        restoreFilters(parsed.search ?? '', parsed.page ?? 1);

        sessionStorage.removeItem(STORAGE_KEY);

        return true;
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);

        return false;
      }
    }, [restoreFilters]);

    return {
      saveFilters,
      restoreFromStorage,
    };
  };
