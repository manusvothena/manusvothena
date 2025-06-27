"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useSwipeable } from "react-swipeable";

type Fragment = {
  id: string;
  name: string;
  image: string;
  description: string;
  price?: "1 ETH" | "2 ETH";
};

type FragmentModalProps = {
  fragment: Fragment;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalFragments: number;
};

const fragmentData: Record<string, { title: string; appearance: string; traits: string; lore: string }> = {
  tiny: {
    title: "The Dream Vessel",
    appearance: "A small, ambiguous figure with straight, pure white hair and large, reflective silver eyes. Tiny wears a fluffy lamb-shaped onesie, soft and comforting. Always seen cradling a round glass bowl that holds a glowing golden fish, their most iconic companion. The fish swims with grace and intention, as if aware of more than it reveals.",
    traits: "Gentle, dreamlike, and innocent. Tiny moves with caution and wonder, as if the world is too fragile to rush. Their presence feels like a whisper in a warm dream-not fully formed, but impossibly vital.",
    lore: "No one remembers when Tiny first appeared beneath the Dream Tree-only that the starlight moss shimmered brighter that night. Born from a fracture in the longest dream, Tiny is neither whole nor broken, but a vessel-soft, silent, and waiting. They are not the dreamer, nor merely the dream. They are what’s left behind when the sky forgets how to hold its stars."
  },
  isamu: {
    title: "The Vigil Guardian",
    appearance: "A tall, strong man with long, flowing hair. Wears a dark blue kimono under black, light-absorbing armor. Carries two massive katanas etched with silver constellations. His presence is disciplined, his posture straight and still as stone.",
    traits: "Stern, protective, ancient in wisdom but youthful in form. Speaks with purpose and rarely wastes words. Radiates calm authority.",
    lore: "Isamu sits in eternal meditation beneath the starlit boughs of the Luminous Wood, where the Vigil never sleeps. Forged from discipline, memory, and moonlight folded into midnight armor, he waits for those who awaken naturally within Vothena. His twin katanas hum with ancient truths hidden in steel. Some say he once bled for a dreamer who never woke. Others say he never truly was."
  },
  luseira: {
    title: "The Flame of Understanding",
    appearance: "Golden, radiant skin and amber eyes full of warmth. Her hair flows in honey-gold waves. Wears a glowing gown that shifts from soft gold to rose-red. Often floats lightly while carrying trays of dream-cakes.",
    traits: "Cheerful, expressive, welcoming. She is warmth given form, unafraid of playfulness but grounded in insight.",
    lore: "Born from a dream of comfort on a cold night, Luseira offers warmth to the lost. Her golden skin calms, and her tea brewed from nostalgia anchors. She rearranges the furniture of the soul with a smile. She is not what you fear, but what you forgot to love. Her sanctuary glows brighter whenever someone finds their way to her door."
  },
  luneira: {
    title: "The Mirror of Silence",
    appearance: "Pale and ethereal, with long silver hair and eyes like mirrored moons. Draped in a dark, star-speckled robe of indigo and deep blue. Rides a silver horse, Starfall, who leaves trails of starlight.",
    traits: "Reserved, graceful, enigmatic. Her silence is not emptiness, but a reflection. When she looks at you, it feels like your soul is being remembered.",
    lore: "Luneira rides Starfall across the lavender plains, listening to the whispers of forgotten stars. Stillness made form, serenity woven from moon reflections. Some say she once reflected the end of the world and wept stardust. She did not deny it. She simply rode on."
  },
  harvique: {
    title: "The Trickster Herald",
    appearance: "A chaotic jester with a half-white, half-black smiling face. One golden eye, one silver. Wears a multicolored patchwork costume with jingling bells. Carries a color-shifting orb atop a whimsical staff.",
    traits: "Playful, theatrical, chaotic but insightful. Unpredictable and never truly malicious, Harvique dances along the line between riddle and truth.",
    lore: "Harvique arrived before time mattered, laughing as reality blinked. Painted paradox, they twirl through Vothena stirring patterns into beauty and discord alike. They don’t lie-they rearrange truth until it dances. To follow Harvique is to find yourself where you never meant to be-and realize that’s where you belonged."
  },
  galaras: {
    title: "The Story-Keeper of Forgotten Dreams",
    appearance: "A transparent humanoid made of aged paper, filled with gears and clockwork. A golden gear turns slowly in their chest. Above their head orbits a miniature solar system.",
    traits: "Wise, gentle, methodical. Every word chosen like the final piece in a puzzle. Feels old as time yet untouched by it.",
    lore: "Galaras drifts like parchment through Vothena, their body ticking softly with forgotten memories. Within the Archive of Lost Dreams, they tend to stories that sleep. Their presence feels like a forgotten bedtime tale rediscovered. They do not preserve history. They preserve meaning."
  },
  prisma: {
    title: "The Flavored Guardian",
    appearance: "A crystalline being of transparent facets and glowing rainbow pathways within. Lacks clothing-their entire body is radiant, prismatic, and shifting.",
    traits: "Serene, protective, radiant. Never speaks, yet never misunderstood. Their presence brings equilibrium.",
    lore: "Prisma exists where harmony is threatened. A guardian of resonance, born not of dreams but of emotional need. They are light given will, neither summoned nor constructed. Where Prisma stands, chaos stills."
  },
  spectrum: {
    title: "The Echo of Emotion",
    appearance: "Crystal-bodied but more complex than Prisma. Their shape is more humanoid, with soft facial features and constantly shifting pastel colors. Moves with fluid grace.",
    traits: "Hopeful, empathetic, expressive. Every motion speaks of connection. Reaches out with open hands.",
    lore: "Spectrum is a song that learned to walk. Where Prisma is balance, Spectrum is feeling-the echo of every shared smile, every unspoken sorrow. They reach toward others not to save them, but to feel with them. Some say when Spectrum touches you, your soul becomes visible."
  },
  ren: {
    title: "The Silent Cartographer",
    appearance: "A young traveler clad in a worn explorer’s coat. Carries a large satchel filled with journals, maps, and tools of a wanderer.",
    traits: "Quiet, observant, deeply perceptive. Speaks rarely, but records everything. The world whispers, and Ren listens.",
    lore: "Ren walks Vothena like a question in search of its phrasing. Their maps redraw the realms simply by existing. Some say they were a dreamer who refused to wake. Others say they walk ahead of time. Wherever they go, paths appear-because they were always meant to be followed."
  },
  fisher: {
    title: "The Memory Angler",
    appearance: "An elder fragment cloaked in deep ocean-blue robes. Carries a fishing rod made from memory-wood, baited with black starlight. Eyes gleam with ancient silver.",
    traits: "Patient, introspective, poetic. Rarely explains-only offers what is needed.",
    lore: "Fisher sits by the Sea of Whispered Histories, casting silence into depths no voice can reach. Their line retrieves not fish, but echoes of lives forgotten. To receive a catch is to remember something you never knew you lost. Fisher does not search. They wait."
  },
  theancientwatcher: {
    title: "The Eye Between Realities",
    appearance: "A colossal shadow in the sky, without a defined shape. Its only visible feature is a single, fluid, glowing eye.",
    traits: "Mysterious, silent, unknowable. Watches without interfering, remembers without judgment.",
    lore: "The Ancient Watcher sees all, remembers all, but speaks to none. A being too old for memory, too vast for form. It watches the threads between dreams and waking, waiting for one to fray. When the Watcher blinks, entire dreams end. But it hasn’t blinked-not yet."
  }
};

export default function FragmentModal({ fragment, onClose, onNext, onPrev, currentIndex, totalFragments }: FragmentModalProps) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const fragmentDetails = fragmentData[fragment.id] || {
    title: "Unknown",
    appearance: "No appearance data available.",
    traits: "No traits data available.",
    lore: "No lore data available.",
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && window.innerWidth >= 768) {
        onNext();
        setIsDescriptionVisible(false);
        if (modalRef.current) {
          modalRef.current.scrollTo(0, 0);
        }
      }
      if (e.key === "ArrowLeft" && window.innerWidth >= 768) {
        onPrev();
        setIsDescriptionVisible(false);
        if (modalRef.current) {
          modalRef.current.scrollTo(0, 0);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  const handleUnveilClick = () => {
    setIsDescriptionVisible(true);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      onNext();
      setIsDescriptionVisible(false);
      if (modalRef.current && window.innerWidth >= 768) {
        modalRef.current.scrollTo(0, 0);
      }
    },
    onSwipedRight: () => {
      onPrev();
      setIsDescriptionVisible(false);
      if (modalRef.current && window.innerWidth >= 768) {
        modalRef.current.scrollTo(0, 0);
      }
    },
    delta: 10,
    trackMouse: false,
  });

  const particlePositions = useMemo(() => {
    return [...Array(7)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm pt-20"
    >
      {window.innerWidth >= 768 && (
        <motion.button
          onClick={() => {
            onPrev();
            setIsDescriptionVisible(false);
            if (modalRef.current) {
              modalRef.current.scrollTo(0, 0);
            }
          }}
          className="absolute left-10 top-1/2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 text-white z-50"
          whileHover={{ scale: 1.1 }}
          style={{ position: "fixed" }}
        >
          <ChevronLeft size={24} />
        </motion.button>
      )}

      <motion.div
        ref={modalRef}
        {...(window.innerWidth < 768 ? swipeHandlers : {})}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: isDescriptionVisible ? 1.05 : 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20, duration: 0.6 }}
        className="relative bg-gradient-to-br from-purple-900/50 via-black/80 to-blue-900/50 rounded-2xl overflow-y-auto max-w-5xl w-full max-h-[85vh] flex flex-col shadow-2xl border-2 border-gray-100/50 dark:border-gray-200/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          {particlePositions.map((position, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ left: position.left, top: position.top }}
              initial={{ opacity: 0.2, scale: 0.5 }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.5, 1, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>

        <motion.button
          onClick={() => {
            onClose();
            setIsDescriptionVisible(false);
          }}
          className="absolute top-4 right-4 z-20 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
          whileHover={{ scale: 1.2 }}
          aria-label="Close modal"
        >
          <X size={20} />
        </motion.button>

        <div className="w-full p-8 flex flex-col items-center relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 text-white text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {fragment.name} — {fragmentDetails.title}
          </motion.h2>

          <motion.div
            className="relative w-full max-w-[300px] md:max-w-sm aspect-square overflow-hidden mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Image
              src={fragment.image || "/placeholder.svg"}
              alt={fragment.name}
              fill
              className="object-contain p-4"
            />
          </motion.div>

          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <motion.button
              onClick={handleUnveilClick}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white text-base px-7 py-3.5 rounded-full transition-colors hover:from-purple-500 hover:to-pink-500"
              whileHover={{ scale: 1.05 }}
              aria-label="Unveil the Fragment"
            >
              Unveil the Fragment
            </motion.button>
            <Link
              href={`https://opensea.io/${fragment.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-base px-7 py-3.5 rounded-full transition-colors hover:from-purple-600 hover:to-blue-600"
            >
              <span>Meet {fragment.name}</span>
              <ExternalLink size={16} />
            </Link>
          </div>

          <AnimatePresence>
            {isDescriptionVisible && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 1 }}
                className="w-full max-w-2xl text-white"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Appearance</h3>
                  <p className="leading-relaxed">{fragmentDetails.appearance}</p>
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Traits</h3>
                  <p className="leading-relaxed">{fragmentDetails.traits}</p>
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Lore</h3>
                  <p className="leading-relaxed">{fragmentDetails.lore}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {window.innerWidth >= 768 && (
        <motion.button
          onClick={() => {
            onNext();
            setIsDescriptionVisible(false);
            if (modalRef.current) {
              modalRef.current.scrollTo(0, 0);
            }
          }}
          className="absolute right-10 top-1/2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 text-white z-50"
          whileHover={{ scale: 1.1 }}
          style={{ position: "fixed" }}
        >
          <ChevronRight size={24} />
        </motion.button>
      )}
    </motion.div>
  );
}
