import { useEffect } from "react";
import { motion } from "motion/react";
import "../css/confirmacion.css";

function PeluqueriaAnimation() {
  // Genera un sonido corto tipo "snip"
  const reproducirCorte = () => {
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
      const filter = audioContext.createBiquadFilter();

      oscillator.type = "triangle";

      oscillator.frequency.setValueAtTime(
        1250,
        audioContext.currentTime
      );

      oscillator.frequency.exponentialRampToValueAtTime(
        450,
        audioContext.currentTime + 0.07
      );

      filter.type = "highpass";
      filter.frequency.value = 650;

      gain.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.12,
        audioContext.currentTime + 0.008
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.09
      );

      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);

      oscillator.addEventListener("ended", () => {
        void audioContext.close();
      });
    } catch (error) {
      console.log("El navegador no permitió reproducir el sonido.", error);
    }
  };

  useEffect(() => {
    /*
      Las tijeras empiezan a moverse aproximadamente
      450 ms después de aparecer.

      Disparamos dos sonidos para acompañar
      los dos cierres.
    */

    const primerCorte = window.setTimeout(() => {
      reproducirCorte();
    }, 780);

    const segundoCorte = window.setTimeout(() => {
      reproducirCorte();
    }, 1500);

    return () => {
      window.clearTimeout(primerCorte);
      window.clearTimeout(segundoCorte);
    };
  }, []);

  return (
    <div className="confirmacion-animation">

      {/* TIJERAS */}
      <motion.div
        className="scissors-svg-container"
        initial={{
          opacity: 0,
          scale: 0.4,
          y: 30,
        }}
        animate={{
          opacity: 1,
          scale: [0.4, 1.16, 1.08],
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <svg
          className="scissors-svg"
          viewBox="0 0 220 220"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* METAL */}
            <linearGradient
              id="metal"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#d7d7d7" />
              <stop offset="50%" stopColor="#8d8d8d" />
              <stop offset="72%" stopColor="#eeeeee" />
              <stop offset="100%" stopColor="#656565" />
            </linearGradient>

            {/* ROSA TIZIANO */}
            <linearGradient
              id="roseGold"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffd9d1" />
              <stop offset="45%" stopColor="#c98b90" />
              <stop offset="100%" stopColor="#6d3a45" />
            </linearGradient>

            {/* SOMBRA */}
            <filter id="scissorShadow">
              <feDropShadow
                dx="0"
                dy="7"
                stdDeviation="6"
                floodColor="#000000"
                floodOpacity="0.45"
              />
            </filter>
          </defs>

          <g filter="url(#scissorShadow)">

            {/* PARTE SUPERIOR */}
            <motion.g
              style={{
                transformOrigin: "110px 110px",
              }}
              animate={{
                rotate: [-18, 12, -18, 12, -18],
              }}
              transition={{
                duration: 1.7,
                delay: 0.45,
                ease: "easeInOut",
              }}
            >
              <path
                d="
                  M110 110
                  L194 49
                  C201 44 205 47 201 54
                  L126 124
                  Z
                "
                fill="url(#metal)"
                stroke="#5f5f5f"
                strokeWidth="3"
              />

              <circle
                cx="78"
                cy="142"
                r="27"
                fill="none"
                stroke="url(#roseGold)"
                strokeWidth="13"
              />
            </motion.g>

            {/* PARTE INFERIOR */}
            <motion.g
              style={{
                transformOrigin: "110px 110px",
              }}
              animate={{
                rotate: [18, -12, 18, -12, 18],
              }}
              transition={{
                duration: 1.7,
                delay: 0.45,
                ease: "easeInOut",
              }}
            >
              <path
                d="
                  M110 110
                  L194 171
                  C201 176 205 173 201 166
                  L126 96
                  Z
                "
                fill="url(#metal)"
                stroke="#5f5f5f"
                strokeWidth="3"
              />

              <circle
                cx="78"
                cy="78"
                r="27"
                fill="none"
                stroke="url(#roseGold)"
                strokeWidth="13"
              />
            </motion.g>

            {/* TORNILLO CENTRAL */}
            <circle
              cx="110"
              cy="110"
              r="12"
              fill="url(#roseGold)"
              stroke="#ffd9d1"
              strokeWidth="3"
            />

            <circle
              cx="110"
              cy="110"
              r="4"
              fill="#3b1f26"
            />

          </g>
        </svg>
      </motion.div>

      {/* DESTELLOS */}
      <div className="sparkles">

        <motion.span
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: 0.2,
          }}
        >
          ✦
        </motion.span>

        <motion.span
          animate={{
            scale: [0, 1.3, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: 0.55,
          }}
        >
          ✧
        </motion.span>

        <motion.span
          animate={{
            scale: [0, 1.6, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.3,
            repeat: Infinity,
            delay: 0.9,
          }}
        >
          ✦
        </motion.span>

      </div>

      {/* CONFIRMACIÓN */}
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
          delay: 2.15,
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
          delay: 2.35,
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
          delay: 2.6,
          duration: 0.55,
        }}
      >
        Te esperamos en Tiziano II ✨
      </motion.p>

    </div>
  );
}

export default PeluqueriaAnimation;