'use client';
import React, { JSX, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { getMarkerIcon, initializeMapIcons } from '@/lib/mapUtils';
import {
  IMapClickHandlerProps,
  LeafletType,
  MarkerCategoryEnum,
  IReactLeafletModule,
} from '@/types/mapType';
import {
  AnimatedDrawler,
  ButtonOpenTasks,
  Container,
  CustomControlPanel,
  Filters,
  generateTasks,
  PopUpContent,
  TasksList,
  UserLocation,
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

export const Map: React.FC = (): JSX.Element => {
  const { ref: mapContainerRef, inView: isInView } = useInView({
    threshold: 0.6,
    triggerOnce: true,
    delay: 100,
  });

  const {
    mapIcons,
    setLeafletComponents,
    leafletComponents,
    setMapIcons,
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
    if (typeof window === 'undefined') return;
    Promise.all([import('react-leaflet'), import('leaflet')])
      .then(([reactLeafletModule, L]) => {
        const customIcons = initializeMapIcons(L as unknown as LeafletType);
        setMapIcons({
          medicine: customIcons.medicine,
          nature: customIcons.nature,
          animal: customIcons.animal,
          food: customIcons.food,
          myPosition: customIcons.myPosition,
          default: customIcons.default,
          myPin: customIcons.myPin,
        });
        setLeafletComponents({
          MapContainer: reactLeafletModule.MapContainer,
          TileLayer: reactLeafletModule.TileLayer,
          Marker: reactLeafletModule.Marker,
          ZoomControl: reactLeafletModule.ZoomControl,
          useMapEvent: reactLeafletModule.useMapEvent,
          LayersControl: reactLeafletModule.LayersControl,
          LayerGroup: reactLeafletModule.LayerGroup,
          useMap: reactLeafletModule.useMap,
          Popup: reactLeafletModule.Popup,
          Circle: reactLeafletModule.Circle,
          Polyline: reactLeafletModule.Polyline,
          GeoJSON: reactLeafletModule.GeoJSON,
          Control: L.Control,
          useMapEvents: reactLeafletModule.useMapEvents,
        } as IReactLeafletModule);
      })
      .catch((error) => {
        console.error('Error loading map components:', error);
      });
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

  const {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvent,
    LayersControl,
    Popup,
    LayerGroup,
  } = leafletComponents;

  const renderTaskMarkers = (): JSX.Element[] => {
    return noPaginatedTasks.map((task) => {
      const All =
        choosenCategories.includes('all') ||
        choosenCategories.length === categories.length ||
        choosenCategories.length === 0;

      const categoryForIcon = All
        ? task.category?.[0]
        : task.category.some((cat) => choosenCategories.includes(cat))
          ? choosenCategories.find((cat) =>
              task.category.includes(cat as MarkerCategoryEnum)
            ) ||
            task.category[0] ||
            MarkerCategoryEnum.Default
          : MarkerCategoryEnum.Default;
      return (
        <Marker
          key={`task-marker-${task.id}`}
          position={{ lat: task.lat, lng: task.lng }}
          icon={getMarkerIcon(
            (Object.values(MarkerCategoryEnum) as string[]).includes(
              categoryForIcon as string
            )
              ? (categoryForIcon as MarkerCategoryEnum)
              : MarkerCategoryEnum.Default,
            mapIcons
          )}
          eventHandlers={{
            click: () => {
              console.log('Task clicked:', task);
            },
          }}
        />
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
            <div className="text-sm text-foreground">
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

    const handleClick = () => {
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
    <Container className="mx-auto flex flex-col ">
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

            <LayersControl position="topright">
              {/* 🌐 Base Layers */}{' '}
              <LayersControl.BaseLayer name="Esri Satellite">
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution="Tiles © Esri"
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="OpenStreetMap">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer checked name="Google Maps (Standard)">
                <TileLayer
                  url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                  attribution="© Google"
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="CartoDB Positron (Retina)">
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & CartoDB'
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="CartoDB Dark Matter (Retina)">
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & CartoDB'
                />
              </LayersControl.BaseLayer>
              {/* 👤 User Location */}
              <LayerGroup>{renderUserLocation()}</LayerGroup>
              {/* 📍 Task Markers */}
              {renderTaskMarkers()}
              {/* 📌 Custom Pins */}
              <LayersControl.Overlay checked name="📌 Custom Markers">
                <LayerGroup>{renderCustomMarkers()}</LayerGroup>
              </LayersControl.Overlay>
            </LayersControl>

            {/* Passive overlays */}
            {userLocation && <UserLocation />}
            <MapClickHandler
              onClick={() => {}}
              allowClickToAddMarker
              setClickedCoords={setClickedCoords}
              setShowOptionsMenu={setShowOptionsMenu}
            />

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

            <CustomControlPanel />
          </MapContainer>
        </div>

        <div className="flex flex-col relative lg:absolute lg:flex lg:top-12 lg:left-32 lg:z-[500]">
          <ButtonOpenTasks
            onClick={() => toggleTaskList()}
            isOpen={taskListIsOpen}
            className="mx-auto mb-2 lg:mb-0 lg:absolute lg:z-[500] lg:top-18 lg:left-1/2 lg:translate-x-[-50%] lg:bg-card lg:w-16"
          />
          <FormSearch />
        </div>

        <AnimatedDrawler
          isVisible={!!activePanel}
          direction="vertical"
          className={`
            relative flex flex-col bg-card z-[1000]
            w-full h-[675px] lg:mt-0
            lg:absolute lg:top-36 lg:left-32 lg:w-[487px] lg:h-[722px] lg:rounded-md lg:shadow-xl overflow-y-hidden
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
