import { getAllParkingSpaces } from "@/data-access/parking-spaces";

export const getAvailableSpacesUseCase = async () => {
  const parkingSpaces = await getAllParkingSpaces();

  const availableSpaces = parkingSpaces.filter(
    (space) => space.currCapacity < space.maxCapacity
  );

  return availableSpaces;
};

export const getUnavailableSpacesUseCase = async () => {
  const parkingSpaces = await getAllParkingSpaces();

  const unavailableSpaces = parkingSpaces.filter(
    (space) => space.currCapacity === space.maxCapacity
  );

  return unavailableSpaces;
};
