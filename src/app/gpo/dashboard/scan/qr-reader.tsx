"use client";

import { useEffect, useRef, useState, useCallback, Dispatch } from "react";
import QrScanner from "qr-scanner";
import QrFrame from "@/assets/qr-frame.svg";
import "@/styles/scanner.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const QrReader = ({
  setOpen,
}: {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrBoxRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [scannedResult, setScannedResult] = useState<string>("");
  const [cameraStatus, setCameraStatus] = useState<string>("Initializing...");
  const [cameras, setCameras] = useState<QrScanner.Camera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const router = useRouter();

  const onScanSuccess = useCallback(
    async (result: QrScanner.ScanResult) => {
      setScannedResult(result?.data || "");

      // Stop the scanner immediately after a successful scan
      if (scannerRef.current) {
        scannerRef.current.stop();
      }

      router.replace(`/gpo/dashboard/scan/${result.data}`);
    },
    [router]
  );

  const onScanFail = useCallback((error: string | Error) => {
    console.error("QR scan failed:", error);
  }, []);

  useEffect(() => {
    const initializeScanner = async () => {
      if (!videoRef.current) {
        console.log("Video ref not available");
        setCameraStatus("Video element not ready");
        return;
      }

      try {
        console.log("Initializing scanner...");
        setCameraStatus("Initializing...");

        if (scannerRef.current) {
          console.log("Destroying existing scanner");
          scannerRef.current.destroy();
        }

        scannerRef.current = new QrScanner(videoRef.current, onScanSuccess, {
          onDecodeError: onScanFail,
          preferredCamera: selectedCamera || "environment",
          highlightScanRegion: true,
          highlightCodeOutline: true,
          overlay: qrBoxRef.current || undefined,
          returnDetailedScanResult: true,
        });

        console.log("Scanner created, starting...");
        await scannerRef.current.start();
        console.log("Scanner started successfully");
        setCameraStatus("Camera ready");
      } catch (err) {
        console.error("Failed to initialize QR scanner:", err);
        setCameraStatus("Camera blocked or error occurred");
      }
    };

    initializeScanner();

    return () => {
      if (scannedResult) {
        setOpen(false);
        return;
      }

      if (scannerRef.current) {
        console.log("Cleaning up scanner");
        scannerRef.current.stop();
        scannerRef.current.destroy();
      }
    };
  }, [onScanSuccess, onScanFail, selectedCamera]);

  const handleCameraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Camera selection changed:", event.target.value);
    setSelectedCamera(event.target.value);
  };

  return (
    <div className="qr-reader max-h-[50vh] relative">
      <select onChange={handleCameraChange} value={selectedCamera}>
        <option value="">Select a camera</option>
        {cameras.map((camera) => (
          <option key={camera.id} value={camera.id}>
            {camera.label}
          </option>
        ))}
      </select>
      <video ref={videoRef} className="w-full h-full"></video>
      <div ref={qrBoxRef} className="qr-box">
        <Image
          src={QrFrame}
          alt="QR Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
      </div>
    </div>
  );
};

export default QrReader;
