import { useEffect } from "react";
import { motion } from "motion/react";
import "../css/confirmacion.css";

function ManicuriaAnimation() {
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
        620,
        audioContext.currentTime
      );

      oscillator.frequency.exponentialRampToValueAtTime(
        980,
        audioContext.currentTime + 0.18
      );

      gain.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.08,
        audioContext.currentTime + 0.03
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.3
      );

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.32);

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
    }, 1850);

    return () => {
      window.clearTimeout(sonido);
    };
  }, []);

  return (
    <div className="confirmacion-animation manicuria-animation">

      {/* FRASCO DE ESMALTE */}
      <motion.div
        className="nail-polish-scene"
        initial={{
          opacity: 0,
          scale: 0.5,
          y: 30,
        }}
        animate={{
          opacity: 1,
          scale: [0.5, 1.08, 1],
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <svg
          className="nail-polish-svg"
          viewBox="0 0 260 250"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="bottleGlass"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#ffd9d1"
                stopOpacity="0.95"
              />

              <stop
                offset="45%"
                stopColor="#c98b90"
                stopOpacity="0.92"
              />

              <stop
                offset="100%"
                stopColor="#6d3a45"
                stopOpacity="0.98"
              />
            </linearGradient>

            <linearGradient
              id="capMetal"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f5d6d9" />
              <stop offset="30%" stopColor="#8b5c65" />
              <stop offset="55%" stopColor="#f2b8bd" />
              <stop offset="100%" stopColor="#3b1f26" />
            </linearGradient>

            <linearGradient
              id="polishPaint"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#6d3a45" />
              <stop offset="50%" stopColor="#c98b90" />
              <stop offset="100%" stopColor="#ffd9d1" />
            </linearGradient>

            <filter id="bottleShadow">
              <feDropShadow
                dx="0"
                dy="8"
                stdDeviation="7"
                floodColor="#000000"
                floodOpacity="0.45"
              />
            </filter>
          </defs>

          {/* FRASCO */}
          <motion.g
            filter="url(#bottleShadow)"
            initial={{
              y: 15,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <rect
              x="65"
              y="105"
              width="95"
              height="100"
              rx="24"
              fill="url(#bottleGlass)"
              stroke="#f7c6cb"
              strokeWidth="3"
            />

            {/* REFLEJO DEL VIDRIO */}
            <path
              d="M82 125 C75 145 76 170 84 184"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.38"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* CUELLO */}
            <rect
              x="91"
              y="87"
              width="43"
              height="25"
              rx="8"
              fill="#6d3a45"
            />
          </motion.g>

          {/* TAPA + PINCEL */}
          <motion.g
            initial={{
              y: 0,
            }}
            animate={{
              y: [0, -58, -58, -5],
              x: [0, 0, 42, 70],
              rotate: [0, 0, 12, 18],
            }}
            transition={{
              duration: 2,
              delay: 0.55,
              ease: "easeInOut",
              times: [0, 0.35, 0.65, 1],
            }}
            style={{
              transformOrigin: "112px 90px",
            }}
          >
            {/* TAPA */}
            <rect
              x="87"
              y="45"
              width="52"
              height="48"
              rx="12"
              fill="url(#capMetal)"
              stroke="#f7c6cb"
              strokeWidth="2"
            />

            {/* PINCEL */}
            <rect
              x="108"
              y="90"
              width="10"
              height="67"
              rx="5"
              fill="#e6c6c9"
            />

            {/* CERDAS */}
            <path
              d="
                M104 152
                L122 152
                L118 180
                Q113 188 108 180
                Z
              "
              fill="#c98b90"
            />
          </motion.g>

          {/* PINCELADA */}
          <motion.path
            d="
              M158 190
              C178 183 202 183 226 190
            "
            fill="none"
            stroke="url(#polishPaint)"
            strokeWidth="16"
            strokeLinecap="round"
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            animate={{
              pathLength: 1,
              opacity: 1,
            }}
            transition={{
              delay: 1.55,
              duration: 0.7,
              ease: "easeOut",
            }}
          />

          {/* BRILLO SOBRE LA PINCELADA */}
          <motion.circle
            cx="212"
            cy="185"
            r="5"
            fill="#ffffff"
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              delay: 2,
              duration: 0.65,
            }}
          />

        </svg>
      </motion.div>

      {/* DESTELLOS */}
      <div className="manicuria-sparkles">
        <motion.span
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            rotate: [0, 45, 90],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: 0.2,
          }}
        >
          ✦
        </motion.span>

        <motion.span
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            delay: 0.7,
          }}
        >
          ✧
        </motion.span>

        <motion.span
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.4, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 1,
          }}
        >
          ✦
        </motion.span>
      </div>

      {/* CHECK */}
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
          delay: 2.65,
          duration: 0.55,
        }}
      >
        ✓
      </motion.div>

      {/* MENSAJE */}
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
          delay: 2.85,
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
          delay: 3.1,
          duration: 0.55,
        }}
      >
        Tus uñas ya tienen cita en Tiziano II ✨
      </motion.p>

    </div>
  );
}

export default ManicuriaAnimation;