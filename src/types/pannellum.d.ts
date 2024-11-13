// pannellum.d.ts

declare module "react-pannellum" {
  import { Component } from "react";

  export interface PannellumConfig {
    autoRotate?: number;
    autoLoad?: boolean;
    autoRotateInactivityDelay?: number;
    autoRotateStopDelay?: number;
    preview?: string;
    showZoomCtrl?: boolean;
    showFullscreenCtrl?: boolean;
    showControls?: boolean;
    compass?: boolean;
    northOffset?: number;
    yaw?: number;
    pitch?: number;
    hfov?: number;
    minHfov?: number;
    maxHfov?: number;
    minPitch?: number;
    maxPitch?: number;
    minYaw?: number;
    maxYaw?: number;
    [key: string]: any; // for other config options
  }

  export interface ReactPannellumProps {
    id: string;
    sceneId: string;
    imageSource: string;
    config?: PannellumConfig;
    style?: React.CSSProperties;
    className?: string;
    onLoad?: () => void;
    onError?: (err: any) => void;
    onMousedown?: (evt: MouseEvent) => void;
    onMouseup?: (evt: MouseEvent) => void;
  }

  export default class ReactPannellum extends Component<ReactPannellumProps> {}

  // Helper functions exported by the package
  export function getConfig(): PannellumConfig;
  export function getPitch(): number;
  export function setPitch(pitch: number): void;
  export function getYaw(): number;
  export function setYaw(yaw: number): void;
  export function getHfov(): number;
  export function setHfov(hfov: number): void;
  export function toggleFullscreen(): void;
  export function loadScene(
    sceneId: string,
    targetPitch?: number,
    targetYaw?: number,
    targetHfov?: number
  ): void;
  export function isLoaded(): boolean;
}
