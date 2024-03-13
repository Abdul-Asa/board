"use client";
import Toolbar from "./toolbar";
import useDisableScrollBounce from "@/lib/use-disable-bounce";
import Canvas from "./canvas";

export default function Whiteboard() {
  useDisableScrollBounce();

  return (
    <div className="relative  h-screen flex items-center justify-center">
      <Toolbar />
      <Canvas></Canvas>
    </div>
  );
}
