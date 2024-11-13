"use client";

import ReactPannellum, { getConfig, PannellumConfig } from "react-pannellum";

const config: PannellumConfig = {
  autoRotate: -2,
};

const PanoramaView = () => {
  const handleClick = () => {
    console.log(getConfig());
  };

  return (
    <div>
      <ReactPannellum
        id="1"
        sceneId="firstScene"
        imageSource="https://cloudflare1.360gigapixels.com/pano/carlos-chegado/00147726_Conforto-dos-Avos-Parking-Lot-jpg/equirect_crop_3_1/6.jpg"
        config={config}
      />
      <div onClick={handleClick}>Click me</div>
    </div>
  );
};

export default PanoramaView;
