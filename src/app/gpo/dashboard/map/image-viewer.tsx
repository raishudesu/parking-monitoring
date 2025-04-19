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
import { useState } from "react";
import { ParkingSpaceImage } from "@prisma/client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import ReactPannellum, { PannellumConfig } from "react-pannellum";

const config: PannellumConfig = {
  autoRotate: -2,
};

const ImageViewerDialog = ({
  parkingName,
  images,
}: {
  parkingName: string;
  images: ParkingSpaceImage[] | undefined;
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
        <Button className="w-full">View Images</Button>
      </DialogTrigger>
      <DialogContent className="py-6 md:min-w-[64rem]">
        <DialogHeader>
          <DialogTitle>{parkingName} Images</DialogTitle>
        </DialogHeader>
        <div className="w-full min-h-[32rem] flex items-center">
          {images && images.length > 0 ? (
            <>
              {images[currentImageIndex].type === "DEFAULT" ? (
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={images[currentImageIndex].url}
                    alt={`Parking Image for ${parkingName}`}
                    fill
                    className="h-full w-full rounded-md object-cover"
                  />
                </AspectRatio>
              ) : (
                <ReactPannellum
                  key={currentImageIndex}
                  id="1"
                  sceneId="firstScene"
                  imageSource={images[currentImageIndex].url}
                  config={config}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
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

export default ImageViewerDialog;
