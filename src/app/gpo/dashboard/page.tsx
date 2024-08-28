import AvailableParkingSpaces from "./available-parking-spaces";
import CurrentSession from "./current-session";

const GpoDashboardPage = () => {
  return (
    <div className="w-full flex flex-col py-6 px-3 md:px-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">Dashboard</div>
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Welcome! 🎉
        </h1>
      </div>

      <div className="mt-6">
        <h2 className="text-muted-foreground scroll-m-20 font-semibold pb-2 text-2xl tracking-tight transition-colors first:mt-0">
          My Sessions
        </h2>
        <div className="grid lg:grid-cols-3 gap-4">
          <CurrentSession />
        </div>
      </div>
      <div className="w-full flex flex-col mt-6">
        <AvailableParkingSpaces />
      </div>
    </div>
  );
};

export default GpoDashboardPage;
