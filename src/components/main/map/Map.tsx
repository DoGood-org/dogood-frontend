'use client';
import React, { JSX, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { getMarkerIcon } from '@/lib/mapUtils';
import { IMapClickHandlerProps, MarkerCategoryEnum } from '@/types/mapType';
import {
  AnimatedDrawler,
  ButtonOpenTasks,
  Container,
  MultiControlPanel,
  Filters,
  generateTasks,
  PopUpContent,
  TasksList,
  CustomControlContent,
  CustomControlZoom,
} from '@/components';
import { ScrollAfterDelay } from '@/components/main/map/ScrollAfterDelay';
import { AnimatedModalWrapper } from '@/components/portal/AnimatedModalWrapper';
import Portal from '@/components/portal/Portal';
import { useMapStore } from '@/zustand/stores/mapStore';
import { AcceptShareLocationPopUp } from './AcceptShareLocationPopUp';
import { FormSearch } from '@/components/main/map/filters/FormSearch';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { useFilteredTasksSelector } from '@/zustand/selectors/filteredTasksSelectors';
import { AnimatePresence, motion } from 'framer-motion';
import { StoreMapInstance } from '@/components/main/map/StoreMapInstance';
import { FilterBadges } from '@/components/main/map/filters/FilterBadges';
import baseLayerConfig from '@/components/main/map/config/baseLayerConfig';

export const Map: React.FC = (): JSX.Element => {
  const { ref: mapContainerRef, inView: isInView } = useInView({
    threshold: 0.6,
    triggerOnce: true,
    delay: 100,
  });

  const {
    mapIcons,
    leafletComponents,
    baseLayer,
    initMap,
    userLocation,
    setUserLocation,
    customMarkers,
    acceptLocationSharing,
    declineLocationSharing,
    showGeolocationPopup,
    checkLocationPermission,
    addMarker,
    taskListIsOpen,
    toggleTaskList,
    activePanel,
    setActivePanel,
    clickedCoords,
    showOptionsMenu,
    setClickedCoords,
    setShowOptionsMenu,
    closeOptionsMenu,
  } = useMapStore();
  const { choosenCategories, categories } = useFilterStore();
  const { setTasks } = useTaskStore();
  const { setCategories } = useFilterStore();

  useEffect(() => {
    initMap();
  }, []);
  useEffect((): void => {
    if (isInView) {
      checkLocationPermission();
    }
  }, [isInView, checkLocationPermission]);

  // Imitate backend data generation
  // This should be replaced with actual data fetching logic
  // For now, we generate tasks based on the user's location
  const generatedTasks = useMemo(() => {
    return generateTasks(
      userLocation?.lat || 27.9944024,
      userLocation?.lng || -81.7602544
    );
  }, [userLocation?.lat, userLocation?.lng]);

  useEffect(() => {
    if (generatedTasks.length > 0) {
      setTasks(generatedTasks);
      const categories = Array.from(
        new Set(generatedTasks.flatMap((task) => task.category))
      );
      setCategories(categories);
    }
  }, [generatedTasks]);

  const { noPaginatedTasks } = useFilteredTasksSelector();

  if (
    !leafletComponents ||
    !mapIcons ||
    Object.values(mapIcons).length === 0 ||
    Object.values(mapIcons).some((icon) => !icon)
  ) {
    return (
      <div className="w-full bg-background">
        <div className="max-w-[1920px] px-[100px] h-[560px] mx-auto flex items-center justify-center text-gray-500">
          Some nice loading animation here...
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, useMapEvent, Popup } =
    leafletComponents;

  const renderTaskMarkers = (): JSX.Element[] => {
    const isAll =
      choosenCategories.includes('all') ||
      choosenCategories.length === 0 ||
      choosenCategories.length === categories.length;

    return noPaginatedTasks.map((task) => {
      const resolvedCategory = ((): MarkerCategoryEnum => {
        if (isAll) return task.category?.[0] || MarkerCategoryEnum.Default;

        const matched = task.category.find((cat) =>
          choosenCategories.includes(cat)
        );
        return matched || MarkerCategoryEnum.Default;
      })();

      const icon = getMarkerIcon(
        Object.values(MarkerCategoryEnum).includes(
          resolvedCategory as MarkerCategoryEnum
        )
          ? (resolvedCategory as MarkerCategoryEnum)
          : MarkerCategoryEnum.Default,
        mapIcons
      );

      return (
        <Marker
          key={`task-marker-${task.id}`}
          position={{ lat: task.lat, lng: task.lng }}
          icon={icon}
          eventHandlers={{
            click: () => console.log('Task clicked:', task),
          }}
        >
          <Popup>
            <div className="text-sm max-w-[200px]">
              <h4 className="font-bold mb-1">{task.title}</h4>
              <p className="text-xs">{task.subtitle}</p>
              <p className="text-xs text-muted mt-1">{task.distance}</p>
            </div>
          </Popup>
        </Marker>
      );
    });
  };

  const renderCustomMarkers = (): JSX.Element[] => {
    return customMarkers.map((marker, index) => {
      const icon = getMarkerIcon(MarkerCategoryEnum.Default, mapIcons);
      return (
        <Marker
          key={`custom-marker-${index}`}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={icon}
          eventHandlers={{
            click: () => {
              console.log('Custom marker clicked:', marker);
            },
          }}
        >
          <Popup>
            <div className="">
              📍 Custom Marker
              <br />
              <strong>{marker.category}</strong>
              <br />
              Lat: {marker.lat.toFixed(5)}, Lng: {marker.lng.toFixed(5)}
            </div>
          </Popup>
        </Marker>
      );
    });
  };

  const renderUserLocation = (): JSX.Element | null => {
    if (!userLocation || !mapIcons?.myPosition) return null;

    const handleClick = (): void => {
      console.log('User location selected:', userLocation);
      setUserLocation({ ...userLocation });
    };

    return (
      <Marker
        position={userLocation}
        icon={mapIcons.myPosition}
        eventHandlers={{ click: handleClick }}
      >
        <Popup>
          <div className="text-sm text-foreground">
            📍 You are here: <br />
            <strong>{userLocation.lat.toFixed(5)}</strong>,{' '}
            <strong>{userLocation.lng.toFixed(5)}</strong>
          </div>
        </Popup>
      </Marker>
    );
  };

  const MapClickHandler: React.FC<IMapClickHandlerProps> = ({
    onClick,
    allowClickToAddMarker,
    clickOptions,
    setClickedCoords,
    setShowOptionsMenu,
  }) => {
    useMapEvent('click', (e) => {
      const latlng = e.latlng;
      if (!allowClickToAddMarker) return;
      onClick(latlng);
      clickOptions?.setMe(latlng);
      clickOptions?.setMyMarker(latlng);
      setClickedCoords?.(latlng);
      setShowOptionsMenu?.(true);
    });

    return null;
  };

  return (
    <Container className="flex flex-col">
      <div className="relative flex flex-col rounded-[12px] overflow-hidden bg-card ">
        <div
          ref={mapContainerRef}
          className="block overflow-hidden border-background text-foreground rounded-t-[10px] h-[547px] lg:h-[919px]"
        >
          <Portal>
            <AnimatedModalWrapper
              isVisible={showGeolocationPopup}
              onClose={declineLocationSharing}
            >
              <AcceptShareLocationPopUp
                requestGeolocation={acceptLocationSharing}
                declineGeolocation={declineLocationSharing}
              />
            </AnimatedModalWrapper>
          </Portal>

          <MapContainer
            className="h-full w-full cursor-default relative"
            center={userLocation || { lat: 27.9944024, lng: -81.7602544 }}
            zoom={14}
            minZoom={5}
            zoomControl={false}
            attributionControl={false}
            key="default-location"
            scrollWheelZoom={false}
          >
            <ScrollAfterDelay delay={2000} />
            <StoreMapInstance />

            {baseLayerConfig[baseLayer] && (
              <TileLayer
                url={baseLayerConfig[baseLayer].url}
                attribution={baseLayerConfig[baseLayer].attribution}
              />
            )}

            {renderTaskMarkers()}

            {/* Passive overlays */}
            {renderUserLocation()}
            {/* USER ONLY */}
            <MapClickHandler
              onClick={() => {}}
              allowClickToAddMarker
              setClickedCoords={setClickedCoords}
              setShowOptionsMenu={setShowOptionsMenu}
            />
            {renderCustomMarkers()}

            {/* Custom controls */}
            {clickedCoords && showOptionsMenu && (
              <Popup
                position={clickedCoords}
                eventHandlers={{ remove: closeOptionsMenu }}
                closeOnClick={false}
                autoPan={false}
              >
                <PopUpContent
                  clickedCoords={clickedCoords}
                  addMarker={addMarker}
                  setUserLocation={setUserLocation}
                  closeOptionsMenu={closeOptionsMenu}
                />
              </Popup>
            )}

            <MultiControlPanel
              controls={[
                { position: 'bottomright', element: <CustomControlContent /> },
                { position: 'topright', element: <CustomControlZoom /> },
              ]}
            />
          </MapContainer>
        </div>
        <div className="lg:absolute lg:flex lg:items-start lg:top-12 lg:left-32 lg:z-[500]">
          <div className="flex flex-col justify-center relative w-full bg-card lg:w-[485px]">
            <ButtonOpenTasks
              onClick={() => toggleTaskList()}
              isOpen={taskListIsOpen}
              className="mx-auto mb-2 lg:mb-0 lg:absolute lg:z-[500]  lg:h-10 lg:top-12 lg:left-1/2 lg:translate-x-[-50%]"
            />
            <FormSearch />
          </div>

          <FilterBadges />
        </div>

        <AnimatedDrawler
          isVisible={!!activePanel}
          onClose={() => setActivePanel(null)}
          direction="vertical"
          className={`
            relative flex flex-col bg-card z-[1000]
            w-full h-[675px] lg:mt-0
            lg:absolute lg:top-32 lg:left-32 lg:w-[485px] lg:h-[722px] lg:rounded-md  overflow-y-hidden
          `}
        >
          <AnimatePresence mode="wait">
            {activePanel === 'filters' && (
              <motion.div
                key="filters"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Filters tasks={noPaginatedTasks} />
              </motion.div>
            )}

            {activePanel === 'tasks' && (
              <motion.div
                key="tasks"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TasksList />
              </motion.div>
            )}
          </AnimatePresence>
        </AnimatedDrawler>
      </div>
    </Container>
  );
};

export default Map;
