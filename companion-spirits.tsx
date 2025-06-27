"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

type Spirit = {
  id: string
  name: string
  image: string
  lore: string
}

export default function CompanionSpirits() {
  const [activeSpirit, setActiveSpirit] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Spirit data
  const spirits: Spirit[] = [
    {
      id: "tiny",
      name: "Tiny",
      image: "/assets/spirit_tiny.png",
      lore: "The dreamer who connects worlds through imagination.",
    },
    {
      id: "isamu",
      name: "Isamu",
      image: "/assets/spirit_isamu.png",
      lore: "Guardian of ancient wisdom and keeper of forgotten memories.",
    },
    {
      id: "luseira",
      name: "Luseira",
      image: "/assets/spirit_luseira.png",
      lore: "Weaver of light who illuminates the darkest corners of dreams.",
    },
    {
      id: "luneira",
      name: "Luneira",
      image: "/assets/spirit_luneira.png",
      lore: "Twin spirit of moonlight who guides dreamers through the night.",
    },
    {
      id: "harvique",
      name: "Harvique",
      image: "/assets/spirit_harvique.png",
      lore: "Collector of dream fragments and lost memories.",
    },
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-black/70" />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-12 text-white drop-shadow-glow">
          Companion Spirits
        </h2>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 px-4">
          {spirits.map((spirit, index) => (
            <motion.div
              key={spirit.id}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: 0,
                x: mousePosition.x * 20 - 10,
                y: mousePosition.y * 20 - 10,
              }}
              transition={{
                delay: index * 0.2,
                duration: 0.8,
                ease: "easeOut",
                x: { duration: 1, ease: "easeOut" },
                y: { duration: 1, ease: "easeOut" },
              }}
              onHoverStart={() => setActiveSpirit(spirit.id)}
              onHoverEnd={() => setActiveSpirit(null)}
              onTapStart={() => setActiveSpirit(spirit.id === activeSpirit ? null : spirit.id)}
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
                <Image
                  src={spirit.image || "/placeholder.svg"}
                  alt={spirit.name}
                  fill
                  className="object-contain drop-shadow-glow"
                />
              </div>

              {activeSpirit === spirit.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-48 md:w-64 bg-black/70 backdrop-blur-sm p-3 rounded-lg text-center z-10"
                >
                  <h3 className="text-lg font-semibold text-white">{spirit.name}</h3>
                  <p className="text-sm text-white/80">{spirit.lore}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
