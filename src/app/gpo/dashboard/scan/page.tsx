import { ScanLine } from "lucide-react";
import ScanQrDrawer from "./scan-qr-drawer";

const ScanPage = () => {
  return (
    <div className="w-full h-full flex flex-col py-6 px-3 md:px-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">Scan</div>
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Start Parking Session
        </h1>
      </div>
      <div className="w-full h-full flex flex-col mt-6">
        <ScanQrDrawer />
      </div>
    </div>
  );
};

export default ScanPage;
