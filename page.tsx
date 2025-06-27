"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Calendar, Star, Clock } from "lucide-react"

type Update = {
  id: string
  title: string
  description: string
  date: string
  type: "feature" | "improvement" | "content" | "event"
}

export default function StarliumCircusPage() {
  const [showUpdates, setShowUpdates] = useState(false)
  const [updates, setUpdates] = useState<Update[]>([])

  useEffect(() => {
    // Load updates data
    const updatesData: Update[] = [
      {
        id: "7",
        title: "Real-Time Dream Portal Enhancement",
        description: "Portal transition speed increased to 1.5 seconds for a more responsive dream entry experience.",
        date: "2024-01-17",
        type: "improvement",
      },
      {
        id: "8",
        title: "New Dreamy Soundtrack Added",
        description:
          "A new enchanting lullaby soundtrack has been added to enhance the dreamlike atmosphere throughout the world.",
        date: "2024-01-16",
        type: "feature",
      },
      {
        id: "1",
        title: "Fragment Gallery Interaction Updated",
        description: "Enhanced character cards with modal interactions and improved navigation between fragments.",
        date: "2024-01-15",
        type: "improvement",
      },
      {
        id: "2",
        title: "PDF Reader Upgraded",
        description: "Added zoom functionality and improved page navigation for the Dreams storybook reader.",
        date: "2024-01-14",
        type: "feature",
      },
      {
        id: "3",
        title: "Luminous Wood Map Replaced",
        description: "Updated the Luminous Wood dream map with enhanced magical forest visuals and glowing effects.",
        date: "2024-01-13",
        type: "content",
      },
      {
        id: "4",
        title: "Hero Portal Transition Improved",
        description: "Enhanced the homepage portal zoom effect with smoother animations and fixed loading indicator.",
        date: "2024-01-12",
        type: "improvement",
      },
      {
        id: "5",
        title: "New Fragment Characters Added",
        description: "Updated Tiny and Fisher character artwork with more detailed and expressive designs.",
        date: "2024-01-11",
        type: "content",
      },
      {
        id: "9",
        title: "Upcoming Dream Festival",
        description:
          "Join us for the first Dream Festival in the Starlium Circus on January 25th. Experience live dream performances and meet your favorite characters!",
        date: "2024-01-25",
        type: "event",
      },
      {
        id: "6",
        title: "Mobile Experience Enhanced",
        description: "Improved touch interactions and responsive design across all dream world locations.",
        date: "2024-01-10",
        type: "improvement",
      },
    ]
    setUpdates(updatesData)
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "feature":
        return <Star className="text-yellow-400" size={16} />
      case "improvement":
        return <Sparkles className="text-purple-400" size={16} />
      case "content":
        return <Calendar className="text-blue-400" size={16} />
      case "event":
        return <Clock className="text-green-400" size={16} />
      default:
        return <Sparkles className="text-purple-400" size={16} />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "feature":
        return "border-yellow-400/30 bg-yellow-400/10"
      case "improvement":
        return "border-purple-400/30 bg-purple-400/10"
      case "content":
        return "border-blue-400/30 bg-blue-400/10"
      case "event":
        return "border-green-400/30 bg-green-400/10"
      default:
        return "border-purple-400/30 bg-purple-400/10"
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background with particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black to-blue-900/50" />
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center max-w-3xl"
        >
          <div className="mb-8 flex justify-center">
            <Image
              src="/assets/map_starliumcircus.png"
              alt="Starlium Circus"
              width={600}
              height={338}
              className="rounded-lg shadow-2xl"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Starlium Circus
          </h1>

          <p className="text-xl mb-8 text-gray-700 dark:text-white/80">
            Where everyone talks about all the dreams in Vothena.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <button
              onClick={() => setShowUpdates(true)}
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg transition-colors"
            >
              <Sparkles size={20} />
              <span>Enter the Starlium Circus</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Updates Modal */}
      <AnimatePresence>
        {showUpdates && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowUpdates(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-black dark:bg-white/95 border border-purple-500/30 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white dark:text-black">Circus News & Updates</h2>
                  <button
                    onClick={() => setShowUpdates(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-white/60 dark:text-black/60 mt-2">
                  Latest improvements and additions to the dreamworld
                </p>
              </div>

              {/* Updates List */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-4">
                  {updates.map((update, index) => (
                    <motion.div
                      key={update.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border ${getTypeColor(update.type)}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getTypeIcon(update.type)}</div>
                        <div className="flex-grow">
                          <h3 className="font-semibold text-white dark:text-black mb-1">{update.title}</h3>
                          <p className="text-white/80 dark:text-black/80 text-sm mb-2">{update.description}</p>
                          <p className="text-white/60 dark:text-black/60 text-xs">{update.date}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
