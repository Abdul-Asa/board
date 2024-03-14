import { CANVAS_SIZE } from "@/lib/constants";
import { useViewportSize } from "@/lib/use-viewport";
import { useEffect, useRef, useState } from "react";

export default function Canvas({ children }: { children?: React.ReactNode }) {
  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const { height, width } = useViewportSize();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const handleScroll = (event: React.WheelEvent) => {
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

  useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d");

      if (renderCtx) {
        setContext(renderCtx);
      }
    }
  }, [context]);

  const startDrawing = (event: React.MouseEvent) => {
    setDrawing(true);
    draw(event);
    console.log("start drawing");
  };

  const finishDrawing = () => {
    setDrawing(false);
    if (context) {
      context.beginPath();
    }
    console.log("finish drawing");
  };

  const draw = (event: React.MouseEvent) => {
    if (!drawing) return;
    if (context && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      context.lineWidth = 10;
      context.lineCap = "round";
      context.strokeStyle = "black";

      context.lineTo(x, y);
      context.stroke();
      context.beginPath();
      context.moveTo(x, y);
    }
  };

  const clearCanvas = () => {
    if (context) {
      context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
  };

  return (
    <canvas
      onWheel={handleScroll}
      onPointerDown={startDrawing}
      onPointerUp={finishDrawing}
      onPointerMove={draw}
      onContextMenu={(e) => {
        e.preventDefault();
        clearCanvas();
      }}
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      style={{
        translate: `${camera.x}px ${camera.y}px`,
        position: "absolute",
        backgroundColor: "#dadad2",
        backgroundImage:
          "radial-gradient(circle, #000000 1px, transparent 1px)",
        backgroundSize: "30px 30px",
        border: "8px solid red",
      }}
    >
      {children}
    </canvas>
  );
}
