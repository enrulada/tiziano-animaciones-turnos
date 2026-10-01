import { useEffect } from "react";
import { motion } from "motion/react";
import "../css/confirmacion.css";

function BarberiaAnimation() {
  const reproducirSonido = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioContextClass) return;

      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";

      oscillator.frequency.setValueAtTime(
        420,
        audioContext.currentTime
      );

      oscillator.frequency.exponentialRampToValueAtTime(
        760,
        audioContext.currentTime + 0.22
      );

      gain.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.07,
        audioContext.currentTime + 0.03
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.35
      );

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.36);

      oscillator.addEventListener("ended", () => {
        void audioContext.close();
      });
    } catch (error) {
      console.log(
        "El navegador no permitió reproducir el sonido.",
        error
      );
    }
  };

  useEffect(() => {
    const sonido = window.setTimeout(() => {
      reproducirSonido();
    }, 2100);

    return () => {
      window.clearTimeout(sonido);
    };
  }, []);

  return (
    <div className="confirmacion-animation barberia-animation">
      <motion.div
        className="barber-pole-scene"
        initial={{
          opacity: 0,
          scale: 0.45,
          y: 30,
        }}
        animate={{
          opacity: 1,
          scale: [0.45, 1.1, 1],
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <motion.div
          className="barber-glow"
          animate={{
            opacity: [0.25, 0.7, 0.25],
            scale: [0.9, 1.12, 0.9],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <svg
          className="barber-pole-svg"
          viewBox="0 0 220 280"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="barberMetal"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#ffd9d1" />
              <stop offset="55%" stopColor="#8b5c65" />
              <stop offset="78%" stopColor="#f7c6cb" />
              <stop offset="100%" stopColor="#3b1f26" />
            </linearGradient>

            <linearGradient
              id="barberGlass"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor="#ffffff"
                stopOpacity="0.16"
              />
              <stop
                offset="35%"
                stopColor="#ffffff"
                stopOpacity="0.5"
              />
              <stop
                offset="65%"
                stopColor="#ffffff"
                stopOpacity="0.08"
              />
              <stop
                offset="100%"
                stopColor="#ffffff"
                stopOpacity="0.22"
              />
            </linearGradient>

            <clipPath id="poleClip">
              <rect
                x="72"
                y="58"
                width="76"
                height="164"
                rx="35"
              />
            </clipPath>

            <filter id="poleShadow">
              <feDropShadow
                dx="0"
                dy="8"
                stdDeviation="8"
                floodColor="#000000"
                floodOpacity="0.45"
              />
            </filter>
          </defs>

          <g filter="url(#poleShadow)">
            {/* Parte superior */}
            <ellipse
              cx="110"
              cy="45"
              rx="48"
              ry="17"
              fill="url(#barberMetal)"
              stroke="#f7c6cb"
              strokeWidth="2"
            />

            <rect
              x="69"
              y="44"
              width="82"
              height="20"
              rx="8"
              fill="url(#barberMetal)"
            />

            {/* Poste */}
            <rect
              x="72"
              y="58"
              width="76"
              height="164"
              rx="35"
              fill="#f8eeee"
              stroke="#c98b90"
              strokeWidth="4"
            />

            {/* Franjas animadas */}
            <g clipPath="url(#poleClip)">
              <motion.g
                animate={{
                  y: [-65, 0],
                }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[-120, -55, 10, 75, 140, 205].map(
                  (y, index) => (
                    <g key={y}>
                      <polygon
                        points={`45,${y} 85,${y} 175,${
                          y + 65
                        } 135,${y + 65}`}
                        fill={
                          index % 2 === 0
                            ? "#6d3a45"
                            : "#c98b90"
                        }
                      />

                      <polygon
                        points={`85,${y} 110,${y} 200,${
                          y + 65
                        } 175,${y + 65}`}
                        fill="#ffd9d1"
                      />
                    </g>
                  )
                )}
              </motion.g>

              <rect
                x="72"
                y="58"
                width="76"
                height="164"
                rx="35"
                fill="url(#barberGlass)"
              />
            </g>

            {/* Parte inferior */}
            <rect
              x="69"
              y="216"
              width="82"
              height="20"
              rx="8"
              fill="url(#barberMetal)"
            />

            <ellipse
              cx="110"
              cy="237"
              rx="48"
              ry="17"
              fill="url(#barberMetal)"
              stroke="#f7c6cb"
              strokeWidth="2"
            />

            {/* Brillo frontal */}
            <path
              d="M91 78 C82 110 82 165 91 197"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.35"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </motion.div>

      <div className="barberia-sparkles">
        <motion.span
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 1.3,
            repeat: Infinity,
          }}
        >
          ✦
        </motion.span>

        <motion.span
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.3, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.5,
          }}
        >
          ✧
        </motion.span>

        <motion.span
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: 0.9,
          }}
        >
          ✦
        </motion.span>
      </div>

      <motion.div
        className="confirmation-check"
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: [0, 1.3, 1],
        }}
        transition={{
          delay: 2.55,
          duration: 0.55,
        }}
      >
        ✓
      </motion.div>

      <motion.h2
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 2.75,
          duration: 0.55,
        }}
      >
        ¡Turno confirmado!
      </motion.h2>

      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 3,
          duration: 0.55,
        }}
      >
        Tu próxima visita a Tiziano II está reservada ✨
      </motion.p>
    </div>
  );
}

export default BarberiaAnimation;