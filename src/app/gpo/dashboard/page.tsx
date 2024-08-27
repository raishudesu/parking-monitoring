import AvailableParkingSpaces from "./available-parking-spaces";
import Overview from "./overview";

const GpoDashboardPage = () => {
  return (
    <div className="w-full flex flex-col py-6 px-3 md:px-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">Parking Spaces</div>
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Welcome!
        </h1>
      </div>
      <div className="w-full flex flex-col mt-6">
        <AvailableParkingSpaces />
      </div>
    </div>
  );
};

export default GpoDashboardPage;
