'use client';

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          grab: {
            distance: 250,
            links: {
              opacity: 0.8,
              color: "#D4AF37"
            }
          },
        },
      },
      particles: {
        color: {
          value: ["#D4AF37", "#C5A028", "#AA771C"], // Varied gold tones
        },
        links: {
          color: "#D4AF37",
          distance: 180,
          enable: true,
          opacity: 0.4,
          width: 2, // Thicker lines
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: 1.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 120, // More particles
        },
        opacity: {
          value: { min: 0.3, max: 0.8 }, // More opaque
          animation: {
            enable: true,
            speed: 1,
            sync: false,
          }
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 2, max: 5 }, // Larger particles
        },
        shadow: {
          enable: true,
          color: "#D4AF37",
          blur: 10,
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1, // Move slightly forward
        }}
      />
    );
  }

  return null;
}
