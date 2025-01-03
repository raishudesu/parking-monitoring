import { Icon } from "leaflet";

export const parkingGreen = new Icon({
  iconUrl: "/map/parking-green.svg",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

export const userPin = new Icon({
  iconUrl: "/map/user-location.svg",
  iconSize: [40, 40],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});
