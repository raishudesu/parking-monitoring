"use client";
import React, { useEffect } from "react";

export default function Pwa() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", async function () {
        await navigator.serviceWorker.register("/worker/index.js");
      });
    }
  }, []);

  return <></>;
}
