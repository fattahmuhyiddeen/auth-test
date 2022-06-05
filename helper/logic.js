// TODO: checking admin or partner is purely from token, which maybe outdate if user is changing role without relogin
exports.isAdmin = u => u.level === 10;

exports.isPartner = u => u.UserRoles?.some(r => r.RoleId === 1 && r.verifiedAt);

exports.gpsThreshold = (lat, lng) => {
  const MAX_RADIUS_CHARGED = 20; // will take from DB later
  // for lat // 1 deg = 110.574 km
  // for lng // 1 deg = 111.320*Math.cos(lat) km

  const latThreshold = MAX_RADIUS_CHARGED * 0.009043717329571148;
  const lngThreshold = MAX_RADIUS_CHARGED * ((1 / 111.32) * Math.cos(lat));
  const lat1 = lat - latThreshold;
  const lat2 = lat + latThreshold;
  const lng1 = lng - lngThreshold;
  const lng2 = lng + lngThreshold;
  return {
    lowLat: lat1 < lat2 ? lat1 : lat2,
    highLat: lat1 > lat2 ? lat1 : lat2,
    lowLng: lng1 < lng2 ? lng1 : lng2,
    highLng: lng1 > lng2 ? lng1 : lng2,
  };
};
