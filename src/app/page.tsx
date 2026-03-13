'use client'

import { ProjectCarousel } from "@/components/sections/ProjectCarousel";
import { ZoomExperience } from "@/components/sections/ZoomExperience";
import React from "react";


export default function Home() {
  return (
    <div className="min-h-[300vh] bg-zinc-950">
      <ZoomExperience/>
      <ProjectCarousel/>
       
       <section className="h-screen bg-zinc-950 flex items-center justify-center">
           <p className="text-white">Mais conteúdo em breve...</p>
        </section>
    </div>
  );
}
