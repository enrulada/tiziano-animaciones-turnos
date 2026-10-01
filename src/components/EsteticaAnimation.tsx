import { useEffect } from "react";
import { motion } from "motion/react";
import "../css/confirmacion.css";

function EsteticaAnimation() {
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
        520,
        audioContext.currentTime
      );

      oscillator.frequency.exponentialRampToValueAtTime(
        980,
        audioContext.currentTime + 0.45
      );

      gain.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.055,
        audioContext.currentTime + 0.08
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.6
      );

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.62);

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
    }, 2300);

    return () => {
      window.clearTimeout(sonido);
    };
  }, []);

  return (
    <div className="confirmacion-animation estetica-animation">

      <motion.div
        className="estetica-scene"
        initial={{
          opacity: 0,
          scale: 0.45,
          y: 25,
        }}
        animate={{
          opacity: 1,
          scale: [0.45, 1.08, 1],
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >

        {/* HALO DETRÁS DEL LOTO */}
        <motion.div
          className="estetica-halo"
          animate={{
            opacity: [0.15, 0.6, 0.15],
            scale: [0.8, 1.15, 0.8],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <svg
          className="estetica-svg"
          viewBox="0 0 300 270"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="lotusPink"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#FFD9D1"
              />

              <stop
                offset="45%"
                stopColor="#F7C6CB"
              />

              <stop
                offset="100%"
                stopColor="#C98B90"
              />
            </linearGradient>

            <linearGradient
              id="lotusDark"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#C98B90"
              />

              <stop
                offset="100%"
                stopColor="#6D3A45"
              />
            </linearGradient>

            <radialGradient id="lotusCenter">
              <stop
                offset="0%"
                stopColor="#FFFFFF"
              />

              <stop
                offset="35%"
                stopColor="#FFD9D1"
              />

              <stop
                offset="100%"
                stopColor="#C98B90"
                stopOpacity="0"
              />
            </radialGradient>

            <filter id="lotusGlow">
              <feGaussianBlur
                stdDeviation="2"
                result="blur"
              />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* PÉTALO CENTRAL */}
          <motion.path
            d="
              M150 202
              C116 167 118 115 150 67
              C182 115 184 167 150 202
              Z
            "
            fill="url(#lotusPink)"
            stroke="#FFD9D1"
            strokeWidth="3"
            filter="url(#lotusGlow)"
            initial={{
              opacity: 0,
              scale: 0.2,
            }}
            animate={{
              opacity: 1,
              scale: [0.2, 1.08, 1],
            }}
            transition={{
              delay: 0.25,
              duration: 0.8,
            }}
            style={{
              transformOrigin: "150px 200px",
            }}
          />

          {/* PÉTALO IZQUIERDO INTERIOR */}
          <motion.path
            d="
              M145 204
              C105 191 83 153 88 111
              C126 125 148 161 145 204
              Z
            "
            fill="url(#lotusPink)"
            stroke="#F7C6CB"
            strokeWidth="3"
            initial={{
              opacity: 0,
              rotate: 28,
              scale: 0.4,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            transition={{
              delay: 0.65,
              duration: 0.75,
              ease: "easeOut",
            }}
            style={{
              transformOrigin: "145px 204px",
            }}
          />

          {/* PÉTALO DERECHO INTERIOR */}
          <motion.path
            d="
              M155 204
              C195 191 217 153 212 111
              C174 125 152 161 155 204
              Z
            "
            fill="url(#lotusPink)"
            stroke="#F7C6CB"
            strokeWidth="3"
            initial={{
              opacity: 0,
              rotate: -28,
              scale: 0.4,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            transition={{
              delay: 0.65,
              duration: 0.75,
              ease: "easeOut",
            }}
            style={{
              transformOrigin: "155px 204px",
            }}
          />

          {/* PÉTALO IZQUIERDO MEDIO */}
          <motion.path
            d="
              M139 207
              C93 210 58 181 45 142
              C88 141 124 163 139 207
              Z
            "
            fill="url(#lotusDark)"
            stroke="#C98B90"
            strokeWidth="3"
            initial={{
              opacity: 0,
              rotate: 38,
              scale: 0.35,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            transition={{
              delay: 1,
              duration: 0.8,
              ease: "easeOut",
            }}
            style={{
              transformOrigin: "139px 207px",
            }}
          />

          {/* PÉTALO DERECHO MEDIO */}
          <motion.path
            d="
              M161 207
              C207 210 242 181 255 142
              C212 141 176 163 161 207
              Z
            "
            fill="url(#lotusDark)"
            stroke="#C98B90"
            strokeWidth="3"
            initial={{
              opacity: 0,
              rotate: -38,
              scale: 0.35,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            transition={{
              delay: 1,
              duration: 0.8,
              ease: "easeOut",
            }}
            style={{
              transformOrigin: "161px 207px",
            }}
          />

          {/* PÉTALO EXTERIOR IZQUIERDO */}
          <motion.path
            d="
              M132 211
              C86 228 42 214 20 180
              C63 169 105 180 132 211
              Z
            "
            fill="#6D3A45"
            stroke="#C98B90"
            strokeWidth="3"
            initial={{
              opacity: 0,
              rotate: 45,
              scale: 0.3,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            transition={{
              delay: 1.3,
              duration: 0.8,
              ease: "easeOut",
            }}
            style={{
              transformOrigin: "132px 211px",
            }}
          />

          {/* PÉTALO EXTERIOR DERECHO */}
          <motion.path
            d="
              M168 211
              C214 228 258 214 280 180
              C237 169 195 180 168 211
              Z
            "
            fill="#6D3A45"
            stroke="#C98B90"
            strokeWidth="3"
            initial={{
              opacity: 0,
              rotate: -45,
              scale: 0.3,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            transition={{
              delay: 1.3,
              duration: 0.8,
              ease: "easeOut",
            }}
            style={{
              transformOrigin: "168px 211px",
            }}
          />

          {/* CENTRO LUMINOSO */}
          <motion.circle
            cx="150"
            cy="194"
            r="18"
            fill="url(#lotusCenter)"
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 1, 0.7],
              scale: [0, 1.8, 1],
            }}
            transition={{
              delay: 1.75,
              duration: 0.7,
            }}
          />

          {/* PULSO DE LUZ */}
          <motion.circle
            cx="150"
            cy="194"
            r="30"
            fill="none"
            stroke="#FFD9D1"
            strokeWidth="3"
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.3, 2, 2.8],
            }}
            transition={{
              delay: 1.9,
              duration: 1,
            }}
          />

          {/* PARTÍCULAS ASCENDENTES */}
          <motion.circle
            cx="110"
            cy="175"
            r="4"
            fill="#FFD9D1"
            animate={{
              cy: [175, 105, 65],
              opacity: [0, 1, 0],
              scale: [0.5, 1.3, 0.4],
            }}
            transition={{
              delay: 1.8,
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.8,
            }}
          />

          <motion.circle
            cx="150"
            cy="165"
            r="5"
            fill="#FFFFFF"
            animate={{
              cy: [165, 95, 45],
              opacity: [0, 1, 0],
              scale: [0.4, 1.4, 0.3],
            }}
            transition={{
              delay: 2,
              duration: 1.6,
              repeat: Infinity,
              repeatDelay: 0.7,
            }}
          />

          <motion.circle
            cx="190"
            cy="175"
            r="4"
            fill="#F7C6CB"
            animate={{
              cy: [175, 115, 70],
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.3],
            }}
            transition={{
              delay: 2.15,
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.9,
            }}
          />
        </svg>
      </motion.div>

      {/* DESTELLOS */}
      <div className="estetica-sparkles">
        <motion.span
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 1.4,
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
            duration: 1.6,
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
            duration: 1.5,
            repeat: Infinity,
            delay: 0.9,
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
          delay: 2.8,
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
          delay: 3,
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
          delay: 3.25,
          duration: 0.55,
        }}
      >
        Tu momento de bienestar te espera en Tiziano II ✨
      </motion.p>
    </div>
  );
}

export default EsteticaAnimation;