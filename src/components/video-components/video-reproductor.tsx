"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface VideoProps {
  video: string;
  image?: string;
}

const VideoReproductor = ({ video, image }: VideoProps) => {
  const [videoEnded, setVideoEnded] = useState(false);

  const handleEnded = () => {
    setVideoEnded(true);
  };

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center">
      <video
        src={video}
        className="h-full w-full object-cover"
        width="100%"
        height="100%"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
      />

      <AnimatePresence>
        {image && videoEnded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute flex h-screen w-full items-center justify-center"
          >
            <Image src={image} fill alt="bg image" className="object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoReproductor;
