"use client";

import VideoSequencePlayer from "@/components/video-components/video-sequence-player";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Page() {
  const [videoEnded, setVideoEnded] = useState(false);

  const handleEnded = () => {
    setVideoEnded(true);
  };
  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#6d7f91] via-[#303257] to-transparent">
      <div className="relative flex h-screen w-screen flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
          className="absolute flex h-screen w-full animate-fade-out items-center justify-center animate-delay-[2500ms]"
        >
          <video
            src={"/videos/barrio/an-vecindario-inicio.mp4"}
            className="h-full w-full object-cover"
            width="100%"
            height="100%"
            autoPlay
            muted
            playsInline
            onEnded={handleEnded}
          />
        </motion.div>

        {videoEnded && (
          <div className="absolute h-screen w-full">
            <VideoSequencePlayer />
          </div>
        )}
      </div>
    </div>
  );
}
