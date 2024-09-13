import React from "react";
import "@/index.css";
import { Cover } from "@/components/ui/cover";
import { Spotlight } from "./ui/spotlight";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { Link } from "react-router-dom";
import { SparklesCore } from "./ui/sparkles";
import Nav from "./Nav";

const LandingPage = () => {
  return (
    <section>
      <Nav/>
      <div className="grid-background " />
      <div className="mt-28 sm:mt-20">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="rgb(30,42,97)"
        />
        <h1 className="font-inte text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Unlock the Secrets <br /> of Your <Cover>WhatsApp Chat</Cover>
        </h1>
      </div>
      <div>
        <h2 className="text-center text-slate-500 font-inte px-8">Transform Your WhatsApp Chats into Insights: Quick and Easy Analysis</h2>
      </div>
      
      <Link to="/get-starderd">
      <div className="m-10 flex justify-center text-cente">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-slate-900 bg-white text-black dark:text-white flex items-center space-x-2"
      >
        <span className="px-2">Get Started</span>
      </HoverBorderGradient>
    </div>
      </Link>
    </section>
  );
};

export default LandingPage;
