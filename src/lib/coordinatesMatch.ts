// Helper function to compare two coordinates from local storage and geolocation
// *   @param {LatLngLiteral} a - The first set of coordinates.

import { LatLngLiteral } from "leaflet";

// *   @param {LatLngLiteral} b - The second set of coordinates.
const coordsMatch = (a: LatLngLiteral, b: LatLngLiteral): boolean =>
  Math.abs(a.lat - b.lat) < 0.0001 && Math.abs(a.lng - b.lng) < 0.0001;

export default coordsMatch;