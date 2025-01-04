"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserRoundPen } from "lucide-react";
import { z } from "zod";
import { collegeSchema } from "@/lib/zod";
import { Dispatch, SetStateAction, useState } from "react";
import ReactPannellum, { getConfig, PannellumConfig } from "react-pannellum";
import { ParkingSpaceImage } from "@prisma/client";

const config: PannellumConfig = {
  autoRotate: -2,
};

const PanellumViewerDialog = ({
  parkingName,
  images,
}: // open,
// setOpen,
{
  parkingName: string;
  images: ParkingSpaceImage[] | undefined;
  // open: boolean;
  // setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex: number) =>
      prevIndex === (images?.length ?? 0) - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex: number) =>
      prevIndex === 0 ? (images?.length ?? 0) - 1 : prevIndex - 1
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button className="hidden">View Image</Button> */}
        <Button className="w-full">View</Button>
      </DialogTrigger>
      <DialogContent className="py-6 md:min-w-[64rem]">
        <DialogHeader>
          <DialogTitle>{parkingName} Panoramic View</DialogTitle>
        </DialogHeader>
        <div className="w-full min-h-[32rem]">
          {images && images.length > 0 ? (
            <>
              <ReactPannellum
                key={currentImageIndex}
                id="1"
                sceneId="firstScene"
                imageSource={images[currentImageIndex].url}
                config={config}
                style={{ width: "100%", height: "100%" }}
              />
            </>
          ) : (
            <>No Parking Space image data.</>
          )}
        </div>
        <DialogFooter className="w-full flex mt-4">
          <div className="w-full flex justify-between">
            <Button onClick={handlePrevImage}>Prev</Button>
            <Button onClick={handleNextImage}>Next</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PanellumViewerDialog;
