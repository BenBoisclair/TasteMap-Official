type Coordinates = {
  latitude: number;
  longitude: number;
};

export default function haversineDistance(
  coords1: Coordinates,
  coords2: Coordinates,
  isMiles?: boolean
): number {
  function toRad(x: number): number {
    return (x * Math.PI) / 180;
  }

  var lon1 = coords1.longitude;
  var lat1 = coords1.latitude;

  var lon2 = coords2.longitude;
  var lat2 = coords2.latitude;

  var R = 6371; // Radius of the Earth in km

  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  if (isMiles) d /= 1.60934; // Convert to miles if necessary

  return d;
}
