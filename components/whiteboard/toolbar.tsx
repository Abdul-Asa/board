import { cn } from "@/lib/utils";
import { ArrowBigRight, ArrowBigLeft, MousePointer2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function Toolbar() {
  const [trigger, setTrigger] = useState(false);

  return (
    <div
      className={cn(
        trigger ? "translate-x-0" : "translate-x-full",
        "absolute right-0 top-10 p-4 transition-transform duration-300 items-center z-[1]",
        "lg:-translate-x-1/2 lg:right-auto flex lg:left-1/2 lg:flex-row",
        " bg-white  flex-col border-2 rounded gap-4"
      )}
    >
      <Button
        className="lg:hidden w-12 h-12 absolute top-4 border border-black left-0 -translate-x-full"
        onClick={() => setTrigger(!trigger)}
      >
        {trigger ? <ArrowBigRight /> : <ArrowBigLeft />}
      </Button>

      <p>Coming soon...</p>
    </div>
  );
}
