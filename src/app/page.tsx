'use client'

import { About } from "@/components/sections/About";
import { ProjectCarousel } from "@/components/sections/ProjectCarousel";
import { ZoomExperience } from "@/components/sections/ZoomExperience";
import React from "react";


export default function Home() {
  return (
    <div className="min-h-[300vh] bg-zinc-950">
      <ZoomExperience/>
      <ProjectCarousel/>
      <About/> 
    </div>
  );
}
