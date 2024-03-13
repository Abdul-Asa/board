import { CANVAS_SIZE } from "@/lib/constants";
import { useViewportSize } from "@/lib/use-viewport";
import { useState } from "react";

export default function Canvas({ children }: { children?: React.ReactNode }) {
  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const { height, width } = useViewportSize();

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    setCamera((prev) => {
      let newX = prev.x - event.deltaX;
      let newY = prev.y - event.deltaY;

      const maxX = CANVAS_SIZE / 2 - width / 2;
      const maxY = CANVAS_SIZE / 2 - height / 2;
      const minX = -(CANVAS_SIZE / 2) + width / 2;
      const minY = -(CANVAS_SIZE / 2) + height / 2;

      newX = Math.min(Math.max(newX, minX), maxX);
      newY = Math.min(Math.max(newY, minY), maxY);

      return { x: newX, y: newY };
    });
  };
  return (
    <>
      <div
        onWheel={handleScroll}
        style={{
          translate: `${camera.x}px ${camera.y}px`,
          position: "absolute",
          height: CANVAS_SIZE,
          width: CANVAS_SIZE,
          backgroundColor: "#dadad2",
          backgroundImage:
            "radial-gradient(circle, #000000 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          border: "8px solid red",
        }}
      >
        {children}
      </div>
      <div className="bg-white p-2 fixed bottom-2 left-2">
        {camera.x}, {camera.y}
      </div>
    </>
  );
}
