'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

export const CustomCursor = () => {

  const cursorRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {

    if (window.innerWidth < 768) return

    document.body.style.cursor = 'none'

    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.18,
      ease: "power2.out"
    })

    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.18,
      ease: "power2.out"
    })

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    window.addEventListener("mousemove", moveCursor)

    const buttonEnter = () => {
      gsap.to(cursorRef.current,{
        scale:1.8,
        duration:0.2
      })
    }

    const buttonLeave = () => {
      gsap.to(cursorRef.current,{
        scale:1,
        duration:0.2
      })
    }

    const cardEnter = () => {

      gsap.to(cursorRef.current,{
        scale:2,
        mixBlendMode:"normal",
        backgroundColor:"white",
        duration:0.25
      })

      gsap.to(textRef.current,{
        opacity:1,
        y:-24,
        duration:0.2
      })

    }

    const cardLeave = () => {

      gsap.to(cursorRef.current,{
        scale:1,
        mixBlendMode:"difference",
        backgroundColor:"white",
        duration:0.25
      })

      gsap.to(textRef.current,{
        opacity:0,
        y:0,
        duration:0.2
      })

    }

    const buttons = document.querySelectorAll('button, a, input, [role="button"]')
    const cards = document.querySelectorAll('.project-card')

    buttons.forEach(el=>{
      el.addEventListener("mouseenter",buttonEnter)
      el.addEventListener("mouseleave",buttonLeave)
    })

    cards.forEach(el=>{
      el.addEventListener("mouseenter",cardEnter)
      el.addEventListener("mouseleave",cardLeave)
    })

    return () => {

      window.removeEventListener("mousemove", moveCursor)

      buttons.forEach(el=>{
        el.removeEventListener("mouseenter",buttonEnter)
        el.removeEventListener("mouseleave",buttonLeave)
      })

      cards.forEach(el=>{
        el.removeEventListener("mouseenter",cardEnter)
        el.removeEventListener("mouseleave",cardLeave)
      })

      document.body.style.cursor = "auto"
    }

  }, { scope: cursorRef })

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 will-change-transform hidden md:block"
      />

      <span
        ref={textRef}
        className="fixed pointer-events-none text-white text-xs font-bold uppercase tracking-widest opacity-0 z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        Ver projeto
      </span>
    </>
  )
}
