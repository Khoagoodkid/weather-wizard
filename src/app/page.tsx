"use client"
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import useGeoLocation from "@/hooks/useGeoLocation";
import Typewriter from 'typewriter-effect';
export default function Home() {
  const location = useGeoLocation()
  return (
    <div className="absolute left-0 top-0 w-full h-full bg-home-bg bg-no-repeat bg-cover text-white">
      <div className="absolute left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[0]" />
      <div className="z-[1] w-full h-full flex items-center justify-center flex-col gap-10 px-[2em]">
        <h1 className="text-[4em] font-[700] z-[100] text-center">Weather Wizard</h1>
        <div className="z-[100] text-[2em] text-center">
          <Typewriter

            options={{
              strings: ['Welcome to Real-time Weather Tracker','The most accurate and reliable weather widget'],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <Link
          className="z-[100]"
          href={{
            pathname: "/weather_tracker",
            query: {
              lat: location.coordinates?.lat,
              lng: location.coordinates?.lng,
            }
          }}
        >
          <div className="w-[20em]">
            <SpotlightButton />
          </div>
        </Link>
      </div>
    </div>
  );
}





const SpotlightButton = () => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { width } = (e.target as HTMLElement)?.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;

      spanRef.current!.animate({ left }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      spanRef.current!.animate(
        { left: "50%" },
        { duration: 100, fill: "forwards" }
      );
    };

    btnRef?.current?.addEventListener("mousemove", handleMouseMove);
    btnRef?.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btnRef?.current?.removeEventListener("mousemove", handleMouseMove);
      btnRef?.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      ref={btnRef}
      className="relative w-full max-w-xs overflow-hidden rounded-lg bg-slate-950 px-4 py-3 text-lg font-medium text-white"
    >
      <span className="pointer-events-none relative z-10 mix-blend-difference">
        Track my location
      </span>
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-slate-100"
      />
    </motion.button>
  );
};


