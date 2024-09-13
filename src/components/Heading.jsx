import React from "react";
import { SparklesCore } from "./ui/sparkles";

export function SparklesPreview({heading}) {
  return (
    (<div
      className="mt-24 w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1
        className="md:text-6xl text-3xl lg:text-8xl font-bold text-center text-white relative z-20">
        {heading}
      </h1>
      <div className="w-[40rem] h-3 relative">
        {/* Gradients */}
        <div
          className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div
          className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div
          className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div
          className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
      </div>
    </div>)
  );
}
