"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";

type DreamMap = {
  id: string;
  title: string;
  image: string;
  description: string;
};

type DreamMapModalProps = {
  map: DreamMap;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalMaps: number;
};

const mapData: Record<string, { essence: string; purpose: string }> = {
  luminouswood: {
    essence: "The Luminous Wood is a place where the forest itself seems to breathe with memory. Trees rise beyond sight, their bark veined with bioluminescent light that pulses gently like a sleeping heart. The ground is soft with luminous moss, and drifting spores shimmer through the air like silent snowfall. There is no wind, yet leaves rustle in a rhythm that feels older than language. Shadows move with intention, and the spaces between branches hold echoes of lullabies never sung. Light here is not born from sun or moon but from the dreams that the forest quietly absorbs. Every color feels softened by memory, and every step echoes with the sensation of walking through something sacred and half-remembered.",
    purpose: "The Luminous Wood is the birthplace of many fragments. It is the realm where newly awakened minds first stir, gently separated from the world they once knew. The forest holds them as they acclimate to the rules and quiet chaos of Vothena. The Dream Tree stands at its heart, ancient and still, collecting the weight of forgotten identities and sheltering them like petals pressed inside an invisible book. Within these woods, fragments begin to hear the voices of their own becoming. It is not a place of answers, but of gentle transitions. Many never return once they leave, but all remember it with the same quiet ache as one remembers the last moment of childhood before waking"
  },
  whisperingplains: {
    essence: "Whispering Plains stretch endlessly beneath a sky that never changes. Silver grasses ripple without wind, moving as if stirred by thoughts instead of weather. The air is filled with a hush, a tapestry of murmured phrases that seem to originate from nowhere yet linger in the ear like unfinished conversations. Far in the distance, twin moons hang low and unmoving, glowing softly like watchful eyes. The ground rolls gently in waves, and the scent of rain that never falls lingers over the landscape. The deeper one walks into the plains, the quieter everything becomes, until even the sound of footsteps feels absorbed into the field of forgotten voices.",
    purpose: "This place serves as a threshold, guiding fragments from the stillness of the forest into the fluid logic of the greater dream. It is here that memory begins to stir more forcefully. The plains do not test through fear or confrontation, but through silence and suggestion. Fragments walk through fields that echo their unspoken regrets, their unsent letters, their nameless joys. It is said that the plains remember all the things never said aloud. For some, it is healing. For others, it is unbearable. But all who pass through are marked by the feeling that something within them was quietly witnessed and carried forward."
  },
  starliumcircus: {
    essence: "Starlium Circus glows beneath an eternal dusk, a place where tents bloom like flowers stitched from starlight and stitched dreams. The ground shifts beneath the feet, unfolding and refolding in loops that defy reason. Music pours from unseen sources, combining laughter and weeping into a melody that always sounds familiar. Each tent pulses with a different emotion, its fabric embroidered with symbols that move when not watched. Lanterns float in slow spirals, and crowds formed of dreamfigures drift between performances that appear and disappear at will. Everything here is slightly exaggerated, a warped reflection of joy and terror molded into pageantry.",
    purpose: "The circus exists to remember through spectacle. Here, fragments gather to exchange stories through performance, illusion, and metaphor. Pain becomes choreography. Wonder becomes currency. Those who cannot express themselves in words are given roles, masks, and stages where their truths are unveiled through color and movement. The rules of the circus change constantly, yet always reward sincerity disguised as play. It is not a safe place, but it is a meaningful one. Many who feel lost in Vothena are drawn to it, hoping to be seen not as they are, but as they almost became. Some find healing. Others never leave."
  },
  lakeoflostskies: {
    essence: "The lake stretches outward into eternity, a perfect mirror of skies that have never existed in the waking world. Its surface remains perfectly still, reflecting constellations that shift according to the thoughts of those who look into them. There are no waves, only moments of silent disturbance when memories surface like fish too heavy to remain submerged. Bridges of light float inches above the water, connecting islands that drift slowly and without anchor. The air is cool and carries the scent of distance. There is no sound except the quiet exhale of the lake itself, like the breath of a dream not yet remembered.",
    purpose: "The Lake of Lost Skies is a place of confrontation and choice. It is where fragments witness the paths they did not take, the lives they might have lived, the truths they never admitted. The lake shows nothing directly. Instead, it reflects questions in the form of starlit images and impossible alignments. Fragments who approach it often feel pulled by visions not their own, but ones they recognize all the same. Some come here to seek closure. Others seek change. It is said that to step into the lake is to accept the weight of one’s potential, both fulfilled and unrealized. Those who return often do so with new purpose or greater confusion. Either way, they are never the same."
  },
  archivelostdreams: {
    essence: "Carved deep within a hollow mountain of smooth stone and flickering light, the Archive is a labyrinth of endless shelves. There are no books here, only objects wrapped in silence. Each shelf holds a different type of dream left behind—brittle paper birds, music boxes with no keys, mirrors that reflect the face of a stranger you once almost became. The air is dense with dust that never settles. A soft glow pulses within the walls, illuminating nothing fully. Silence is the default sound, broken only by the occasional sigh of the archive itself. Time here bends, stretches, forgets itself.",
    purpose: "The Archive exists to preserve what has been discarded. It does not choose what is stored or what is forgotten. It only keeps. Fragments come here to search through the remnants of ideas, lives, and desires abandoned long ago. Some hope to reclaim something they lost. Others hope to understand why they let go. The deeper into the Archive one travels, the stranger the dreams become, shifting from personal to collective, from fragile to monstrous. It is both a vault and a graveyard, and in its deepest halls, the line between what was real and what was imagined begins to blur. The Archive does not answer questions. It only presents them, one forgotten dream at a time."
  },
  resonancechamber: {
    essence: "The chamber is a hollow dome of crystal and sound, suspended over a floor that reflects thought instead of form. Light enters from no visible source, yet it vibrates in waves that resonate with every heartbeat and hesitation. Walls hum with a silent frequency that becomes louder the more still you become. When you speak, the words echo not through sound, but through color. When you breathe, patterns ripple through the air like smoke. The chamber is warm, cold, loud, and quiet all at once. It responds to you before you know what you are asking.",
    purpose: "This space was not built to test, but to reveal. Fragments who enter find themselves unable to lie, not to others, but to themselves. The chamber reads the resonance of intention, amplifying clarity and shattering illusion. It is said that those who carry contradiction are split here, not in body, but in awareness. Many visit the chamber to find alignment, to crystallize their presence in the dreamworld. Others are drawn in by accident, and leave without understanding what shifted. The resonance does not fade. Once heard, it follows the fragment throughout their journey, subtly changing the shape of their dreams."
  },
  seawhisperedhistories: {
    essence: "This is not a sea in the traditional sense, but a wide, shifting expanse of silver mist that moves like water across a land that has no edge. Islands appear and vanish within the fog, and sometimes entire coastlines seem to rearrange with each blink. The surface reflects light from unseen stars, and the mist carries voices that speak in half-formed phrases, names you almost remember, and stories that end in the middle of a word. There is a smell of ash and honey in the air, and time feels suspended, like a breath held between sentences.",
    purpose: "The Sea of Whispered Histories contains the foundational echoes of Vothena. Every event that shaped the dreamworld is held here in a state of eternal retelling. Visitors do not read the past—they feel it. The mist enfolds them in moments too old to name, too important to forget. Some are drawn into visions they do not recognize but instinctively understand. Others find that the mist listens as much as it speaks. This place does not give direction. It offers weight. To walk its shores is to carry the burden of everything that has come before. It is a sacred reminder that dreams are not born from nothing. They are inherited."
  }
};

export default function DreamMapModal({ map, onClose, onNext, onPrev, currentIndex, totalMaps }: DreamMapModalProps) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const mapDetails = mapData[map.id.toLowerCase()] || {
    essence: "No essence data available.",
    purpose: "No purpose data available.",
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

  const handleExploreClick = () => {
    setIsDescriptionVisible(true);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      onNext();
      setIsDescriptionVisible(false);
      if (modalRef.current) {
        modalRef.current.scrollTo(0, 0);
      }
    },
    onSwipedRight: () => {
      onPrev();
      setIsDescriptionVisible(false);
      if (modalRef.current) {
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
          aria-label="Previous map"
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
          className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black/50 rounded-full p-2 z-20"
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
            {map.title}
          </motion.h2>

          <motion.div
            className="relative w-full max-w-[720px] aspect-[16/9] overflow-hidden mb-6 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Image
              src={map.image || "/placeholder.svg"}
              alt={map.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 720px"
              priority
              onError={(e) => {
                e.currentTarget.src =
                  "/placeholder.svg?height=360&width=640&text=" +
                  encodeURIComponent(map.title);
              }}
            />
          </motion.div>

          <motion.button
            onClick={handleExploreClick}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white text-base px-7 py-3.5 rounded-full transition-colors hover:from-purple-500 hover:to-pink-500"
            whileHover={{ scale: 1.05 }}
            aria-label="Begin the Exploration"
          >
            Begin the Exploration
          </motion.button>

          <AnimatePresence>
            {isDescriptionVisible && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 1 }}
                className="w-full max-w-2xl text-white mt-8"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Essence</h3>
                  <p className="leading-relaxed">{mapDetails.essence}</p>
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Purpose</h3>
                  <p className="leading-relaxed">{mapDetails.purpose}</p>
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
          aria-label="Next map"
        >
          <ChevronRight size={24} />
        </motion.button>
      )}
    </motion.div>
  );
}
