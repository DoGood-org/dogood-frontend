import {
  PhotonFeature,
  formatLocation,
} from '@/components/tasks/createTaskPage/Form/LocationAutocomplete';

export interface ReverseLocationData {
  address: string;
  lat: number;
  lng: number;
}

export const getAddressByCoords = async (
  lat: number,
  lng: number,
  lang = 'en'
): Promise<ReverseLocationData> => {
  try {
    const params = new URLSearchParams({
      lat: String(lat),
      lon: String(lng),
      lang,
    });

    const res = await fetch(`https://photon.komoot.io/reverse?${params}`);
    if (!res.ok) throw new Error(`Photon reverse ${res.status}`);

    const data: { features: PhotonFeature[] } = await res.json();
    const firstFeature = data.features?.[0];

    const address = firstFeature
      ? formatLocation(firstFeature)
      : `${lat.toFixed(5)}, ${lng.toFixed(5)}`;

    return {
      address: address || `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
      lat,
      lng,
    };
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
    return {
      address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
      lat,
      lng,
    };
  }
};
