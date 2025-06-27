"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { X, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import SwipeableViews from "react-swipeable-views";

type StoryModalProps = {
  onClose: () => void;
};

export default function StoryModal({ onClose }: StoryModalProps) {
  const { theme } = useTheme();
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]); // Refs for each page

  // Handle keyboard navigation (desktop only)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        console.log("Escape pressed, selectedStory:", selectedStory);
        if (selectedStory) {
          setSelectedStory(null); // Return to archive if a story is selected
          setCurrentPage(1); // Reset page
        } else {
          onClose(); // Close modal if on archive
        }
      }
      if (selectedStory === "prologue" && window.innerWidth >= 768) {
        if (e.key === "ArrowRight" && currentPage < 2) {
          console.log("ArrowRight pressed, currentPage:", currentPage);
          setCurrentPage(currentPage + 1);
        }
        if (e.key === "ArrowLeft" && currentPage > 1) {
          console.log("ArrowLeft pressed, currentPage:", currentPage);
          setCurrentPage(currentPage - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, selectedStory, currentPage]);

  // Scroll to top when page changes
  useEffect(() => {
    if (pageRefs.current[currentPage - 1]) {
      pageRefs.current[currentPage - 1]?.scrollTo(0, 0);
      console.log("Scrolled to top of page:", currentPage);
    }
  }, [currentPage]);

  // Dynamic styling based on theme
  const getModalClass = () => {
    if (selectedStory === null) {
      return theme === "light"
        ? "bg-gradient-to-br from-purple-900/50 via-black/80 to-blue-900/50 border-2 border-gray-100/50"
        : "bg-gradient-to-br from-purple-900/50 via-black/80 to-blue-900/50 border-2 border-gray-200/30";
    }
    return theme === "light" ? "bg-white border-purple-500/30" : "bg-black border-purple-500/30";
  };

  const getTextClass = () => {
    return theme === "light" ? "text-black" : "text-white";
  };

  const getSecondaryTextClass = () => {
    return theme === "light" ? "text-black/80" : "text-white/80";
  };

  const handleStorySelect = useCallback((story: string) => {
    console.log("Story selected:", story);
    setSelectedStory(story);
    setCurrentPage(1); // Reset to page 1 when selecting a story
  }, []);

  const handleBackToArchive = useCallback(() => {
    console.log("Back to archive clicked");
    setSelectedStory(null);
    setCurrentPage(1); // Reset page
  }, []);

  const handleNextPage = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation(); // Prevent click from bubbling to modal background
      if (currentPage < 2) {
        console.log("Next page triggered, currentPage:", currentPage);
        setCurrentPage(currentPage + 1);
      }
    },
    [currentPage]
  );

  const handlePrevPage = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation(); // Prevent click from bubbling to modal background
      if (currentPage > 1) {
        console.log("Previous page triggered, currentPage:", currentPage);
        setCurrentPage(currentPage - 1);
      }
    },
    [currentPage]
  );

  // Handle swipe change
  const handleSwipeChange = useCallback(
    (index: number) => {
      if (selectedStory === "prologue" && window.innerWidth < 768) {
        console.log("Swiped to page:", index + 1);
        setCurrentPage(index + 1);
      }
    },
    [selectedStory]
  );

  const prologuePages = [
    [
      "Tiny awoke with a gasp, heart pounding against fragile ribs. The nightmare clung like cobwebs, fragments of terror dissolving even as small hands clutched at them. Something about falling. Something about a sky shattering like glass. Something about being utterly, completely alone. But the details were already fading, leaving only the residue of fear. Tiny blinked, eyes adjusting to soft, ambient light. Above, a canopy of luminescent leaves swayed gently, casting rippling patterns across what appeared to be a massive trunk. Tiny was nestled in a hollow at the base of an enormous tree, cushioned by a bed of moss that seemed to pulse with gentle light in response to movement. \"Hello?\" The word emerged as a whisper, uncertain and small.",
      "No answer came except the soft rustling of leaves and a distant, melodic sound that might have been wind through branches or might have been something singing. Tiny sat up slowly, wincing at unexpected soreness. Looking down revealed a small body clad in simple garments that seemed woven from moonlight and shadow. No injuries were visible, yet everything ached as if from a great fall. \"Where am I?\" Tiny asked the empty air, voice a little stronger now. Again, no answer came from the strange, luminous forest. Standing proved difficult but manageable. The moss beneath bare feet felt cool and somehow supportive, as if it were consciously cushioning each step. Tiny moved cautiously to the edge of the hollow and peered out.",
      "A vast dreamscape stretched in all directions. The tree that had sheltered Tiny was just one of many colossal giants, their trunks wider than houses, their canopies lost in misty heights above. Between them flowed streams of what looked like liquid starlight, pooling in glowing ponds that reflected impossible constellations. Flowers that resembled crystal bells chimed softly in a breeze that carried scents of cinnamon and ozone. In the distance, floating islands drifted lazily through banks of luminous fog, trailing gardens that hung like the beards of sky-bound mountains. It was beautiful. It was terrifying. It was utterly unfamiliar. Tiny slumped back against the trunk of the great tree, suddenly overwhelmed."
    ],
    [
      "The questions came in a rush: Where was this place? How had Tiny arrived here? Why couldn't Tiny remember anything before the nightmare? Was there anyone else here? Anyone who might help? And beneath those questions, a deeper, more troubling one: Who was Tiny? There should be memories, a history, a sense of self beyond just existing in this moment. But trying to recall anything before awakening in the hollow yielded nothing but a sense of vertigo and echoes of that same nightmare. Falling. A shattering sky. Absolute solitude.",
      "A soft sound interrupted the spiral of questions. Something between a chime and a whisper, coming from further around the massive tree trunk. Tiny hesitated, then followed the sound, moving carefully around the circumference of the enormous tree. On the other side, nestled among roots that rose taller than Tiny's head, sat a small glass fishbowl containing a single goldfish. The fishbowl emitted a soft glow, and the goldfish inside swam in lazy circles, its scales catching the light with each movement. Each time the fish completed a circle, the bowl produced that chime-whisper sound. Tiny knelt beside it, heart racing with unexpected recognition. This fishbowl, this fish—they felt familiar in a way nothing else had since awakening."
    ]
  ];

  // Particle positions for transparent modal
  const particlePositions = useMemo(() => {
    return [...Array(7)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
  }, []);

  // Log current page and selected story for debugging
  useEffect(() => {
    console.log("Rendering StoryModal, selectedStory:", selectedStory, "currentPage:", currentPage);
  }, [selectedStory, currentPage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {window.innerWidth >= 768 && selectedStory === "prologue" && (
        <motion.button
          onClick={handlePrevPage}
          className={`absolute left-10 top-1/2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 text-white z-50 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          whileHover={{ scale: currentPage === 1 ? 1 : 1.1 }}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={24} />
        </motion.button>
      )}

      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className={`relative ${getModalClass()} rounded-lg max-w-3xl w-full h-[90vh] flex flex-col shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {selectedStory === null && (
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
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/80 hover:text-white bg-black/50 rounded-full p-2"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="flex flex-col h-full">
          {selectedStory === null ? (
            <div className="p-8 flex flex-col items-center overflow-y-auto">
              <h2
                className={`text-3xl sm:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600`}
              >
                Archive of Dreams
              </h2>
              <div className="space-y-4 w-full max-w-2xl">
                <div
                  className="border-t border-b border-purple-500/30 py-2 cursor-pointer hover:bg-purple-500/10"
                  onClick={() => handleStorySelect("prologue")}
                >
                  <p className={`text-xl ${getTextClass()} text-center`}>Prologue: Am I Dreaming?</p>
                </div>
                <div className="border-t border-b border-purple-500/30 py-2 cursor-pointer hover:bg-purple-500/10">
                  <p className={`text-xl ${getTextClass()} text-center`}>Chapter 1: The Silver Path</p>
                </div>
                <div className="border-t border-b border-purple-500/30 py-2 cursor-pointer hover:bg-purple-500/10">
                  <p className={`text-xl ${getTextClass()} text-center`}>Chapter 2: The Vigil</p>
                </div>
              </div>
            </div>
          ) : selectedStory === "prologue" ? (
            <>
              <div className="p-8 pb-4 flex items-center justify-between shrink-0">
                <button
                  onClick={handleBackToArchive}
                  className="flex items-center text-white/80 hover:text-white"
                  aria-label="Back to archive"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Back to Archive
                </button>
                <div className={`text-lg ${getTextClass()} font-medium`}>
                  Page {currentPage}/2
                </div>
                <div className="w-[120px]"></div> {/* Placeholder to balance layout */}
              </div>
              <h2 className={`px-8 text-3xl font-bold mb-6 text-center ${getTextClass()} shrink-0`}>
                Prologue: Am I Dreaming?
              </h2>
              <SwipeableViews
                index={currentPage - 1}
                onChangeIndex={handleSwipeChange}
                enableMouseEvents
                disabled={window.innerWidth >= 768} // Disable swipe on desktop
              >
                {prologuePages.map((page, pageIndex) => (
                  <div
                    key={pageIndex}
                    ref={(el) => {
                      pageRefs.current[pageIndex] = el;
                      console.log("Page container height:", el?.clientHeight);
                    }}
                    className="px-8 pb-8 max-w-2xl mx-auto max-h-none overflow-y-auto"
                  >
                    <div className={`space-y-4 ${getSecondaryTextClass()}`}>
                      {page.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </SwipeableViews>
            </>
          ) : (
            <div className="p-8 h-full overflow-y-auto">
              <button
                onClick={handleBackToArchive}
                className="flex items-center text-white/80 hover:text-white mb-4"
                aria-label="Back to archive"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Archive
              </button>
              <h2 className={`text-3xl font-bold mb-6 text-center ${getTextClass()}`}>
                {selectedStory === "chapter1" ? "Chapter 1: The Silver Path" : "Chapter 2: The Vigil"}
              </h2>
              <p className={`text-center ${getSecondaryTextClass()}`}>
                This chapter is not yet available.
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {window.innerWidth >= 768 && selectedStory === "prologue" && (
        <motion.button
          onClick={handleNextPage}
          className={`absolute right-10 top-1/2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 text-white z-50 ${currentPage === 2 ? "opacity-50 cursor-not-allowed" : ""}`}
          whileHover={{ scale: currentPage === 2 ? 1 : 1.1 }}
          disabled={currentPage === 2}
        >
          <ChevronRight size={24} />
        </motion.button>
      )}
    </motion.div>
  );
}
