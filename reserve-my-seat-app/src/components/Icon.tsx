import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function ReserveSeatCTA() {
  const controls = useAnimation();

  useEffect(() => {
    const runSequence = async () => {
      while (true) {
        // Step 1: Curtains open and text appear simultaneously
        await controls.start("openCurtains");

        await controls.start("showText");

        // Step 3: Flicker for 4 seconds
        await controls.start("flicker");

        // Step 4: Curtains close and text disappear simultaneously
        await Promise.all([
          controls.start("closeCurtains"),
          controls.start("hideText"),
        ]);

        // Pause before repeating
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    runSequence();
  }, [controls]);

  return (
    <div className="flex justify-center items-center h-[50px]">
      <svg viewBox="0 0 400 150" className="w-[140px] cursor-pointer">
        {/* SCREEN */}
        <motion.rect
          x="10"
          y="10"
          width="380"
          height="130"
          rx="20"
          fill="#000000"
          variants={{
            flicker: {
              opacity: [1, 0.6, 1, 0.6, 1, 0.6, 1],
              transition: {
                duration: 4,
                ease: "easeInOut",
              },
            },
          }}
          initial={{ opacity: 1 }}
          animate={controls}
        />

        {/* LEFT CURTAIN */}
        <motion.g
          variants={{
            openCurtains: {
              x: -220,
              transition: { duration: 1, ease: "easeInOut" },
            },
            closeCurtains: {
              x: 0,
              transition: { duration: 1, ease: "easeInOut" },
            },
          }}
          initial={{ x: 0 }}
          animate={controls}
        >
          {/* Base curtain */}
          <rect x="-20" y="10" width="220" height="140" fill="#7f1d1d" />
          {/* Vertical patches for texture */}
          <rect
            x="-20"
            y="10"
            width="20"
            height="140"
            fill="#000000"
            opacity="0.3"
          />
          <rect
            x="20"
            y="10"
            width="15"
            height="140"
            fill="#000000"
            opacity="0.2"
          />
          <rect
            x="50"
            y="10"
            width="18"
            height="140"
            fill="#000000"
            opacity="0.35"
          />
          <rect
            x="80"
            y="10"
            width="16"
            height="140"
            fill="#000000"
            opacity="0.25"
          />
          <rect
            x="110"
            y="10"
            width="19"
            height="140"
            fill="#000000"
            opacity="0.3"
          />
          <rect
            x="140"
            y="10"
            width="17"
            height="140"
            fill="#000000"
            opacity="0.2"
          />
          <rect
            x="170"
            y="10"
            width="20"
            height="140"
            fill="#000000"
            opacity="0.32"
          />
        </motion.g>

        {/* RIGHT CURTAIN */}
        <motion.g
          variants={{
            openCurtains: {
              x: 120,
              transition: { duration: 1, ease: "easeInOut" },
            },
            closeCurtains: {
              x: -100,
              transition: { duration: 1, ease: "easeInOut" },
            },
          }}
          initial={{ x: 0 }}
          animate={controls}
        >
          {/* Base curtain */}
          <rect x="320" y="10" width="180" height="140" fill="#7f1d1d" />
          {/* Vertical patches for texture */}
          <rect
            x="320"
            y="10"
            width="18"
            height="140"
            fill="#000000"
            opacity="0.3"
          />
          <rect
            x="345"
            y="10"
            width="16"
            height="140"
            fill="#000000"
            opacity="0.25"
          />
          <rect
            x="370"
            y="10"
            width="19"
            height="140"
            fill="#000000"
            opacity="0.32"
          />
          <rect
            x="398"
            y="10"
            width="17"
            height="140"
            fill="#000000"
            opacity="0.2"
          />
          <rect
            x="425"
            y="10"
            width="20"
            height="140"
            fill="#000000"
            opacity="0.35"
          />
          <rect
            x="455"
            y="10"
            width="15"
            height="140"
            fill="#000000"
            opacity="0.28"
          />
          <rect
            x="482"
            y="10"
            width="18"
            height="140"
            fill="#000000"
            opacity="0.23"
          />
        </motion.g>

        {/* TEXT */}
        <motion.text
          x="200"
          y="85"
          textAnchor="middle"
          fill="#ffffff"
          className="text-[35px] font-[600]"
          variants={{
            showText: {
              opacity: 1,
              transition: { duration: 0.6 },
            },
            hideText: {
              opacity: 0,
              transition: { duration: 0.6 },
            },
          }}
          initial={{ opacity: 0 }}
          animate={controls}
        >
          🎬 Reserve My Seat
        </motion.text>
      </svg>
    </div>
  );
}
