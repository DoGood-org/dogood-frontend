'use client';
import baseLayerConfig from '@/components/main/map/config/baseLayerConfig';
import { CustomControlContent } from '@/components/main/map/CustomControlContent';
import { CustomControlZoom } from '@/components/main/map/CustomControlZoom';
import { MapClickHandler } from '@/components/main/map/MapClicks';
import { generateTasks } from '@/components/main/map/mockTasks';
import { MultiControlPanel } from '@/components/main/map/MultiControlPanel';
import { PopUpContent } from '@/components/main/map/PopUpContent';
import { StoreMapInstance } from '@/components/main/map/StoreMapInstance';
import { UserLocation } from '@/components/main/map/UserLocation';
import { getMarkerIcon, resolveTaskCategory } from '@/lib/mapUtils';
import { MarkerCategoryEnum } from '@/types/mapType';
import { useFilteredTasksSelector } from '@/zustand/selectors/filteredTasksSelectors';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { JSX, useEffect, useMemo } from 'react';

export const ProfileMap = (): JSX.Element => {
  const {
    initMap,
    leafletComponents,
    mapIcons,
    activeLayer,
    setClickedCoords,
    setShowOptionsMenu,
    setUserLocation,
    addMarker,
    customMarkers,
    userLocation,
    // selectedTask,
    // setCustomMarkers,
    closeOptionsMenu,
    clickedCoords,
    showOptionsMenu,
  } = useMapStore();

  const { choosenCategories, categories } = useFilterStore();
  const { setTasks } = useTaskStore();
  const { setCategories } = useFilterStore();

  useEffect(() => {
    initMap('user');
  }, []);

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
    Object.values(mapIcons).some((icon) => !icon)
  ) {
    return <div>Loading map...</div>;
  }
  const { MapContainer, TileLayer, Marker, Popup } = leafletComponents;

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

  const handleMarkerClick = (task: any): void => {
    console.log('Task marker clicked:', task);
    // Implement your marker click logic here
  };

  return (
    <div>
      <MapContainer
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        center={userLocation || { lat: 48.8566, lng: 2.3522 }} // Default to Paris
        zoomControl={false}
        attributionControl={false}
      >
        <StoreMapInstance mapKey="user" />
        <UserLocation />

        <TileLayer
          url={baseLayerConfig[activeLayer].url}
          maxZoom={18}
          minZoom={1}
        />
        <MultiControlPanel
          controls={[
            { position: 'bottomright', element: <CustomControlContent /> },
            { position: 'topright', element: <CustomControlZoom /> },
          ]}
        />
        <Marker
          position={{ lat: 48.8566, lng: 2.3522 }}
          icon={mapIcons.default!}
        >
          <Popup>Profile location</Popup>
        </Marker>
        {renderCustomMarkers()}
        <MapClickHandler
          allowClickToAddMarker
          onClick={(coords, clickType) => {
            if (clickType === 'right') {
              setClickedCoords(coords);
              setShowOptionsMenu(true);
            }
          }}
          clickOptions={{
            setMe: (coords) => setUserLocation(coords),
            setMyMarker: (coords) => addMarker(coords),
          }}
        />
        {noPaginatedTasks.map((task) => {
          const resolvedCategory = resolveTaskCategory(
            task.category,
            choosenCategories,
            categories
          );
          const icon =
            mapIcons[resolvedCategory as keyof typeof mapIcons] ??
            mapIcons.default;
          return (
            <Marker
              key={`task-marker-${task.id}`}
              position={{ lat: task.lat, lng: task.lng }}
              icon={icon === null ? undefined : icon}
              eventHandlers={{
                click: () => handleMarkerClick(task),
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
        })}

        {userLocation && mapIcons.myPosition && (
          <Marker
            position={userLocation}
            icon={mapIcons.myPosition}
            eventHandlers={{
              click: () => {
                console.log('User location marker clicked');
              },
            }}
          >
            <Popup>
              <div className="text-sm text-foreground">
                📍 You are here: <br />
                <strong>{userLocation.lat.toFixed(5)}</strong>,{' '}
                <strong>{userLocation.lng.toFixed(5)}</strong>
              </div>
            </Popup>
          </Marker>
        )}

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
      </MapContainer>
    </div>
  );
};
