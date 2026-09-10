import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
const backImg = "https://qclay.design/lovable/crypto/Ellipse%20403.png";
const backImg1 = "https://qclay.design/lovable/crypto/Ellipse%20401.png";
const backImg2 = "https://qclay.design/lovable/crypto/Ellipse%20400.png";
const backImg3 = "https://qclay.design/lovable/crypto/Ellipse%20398.png";
const backRight = "https://qclay.design/lovable/crypto/Ellipse%20399.png";
const backLeft = "https://qclay.design/lovable/crypto/Ellipse%20396.png";
const triangleLeft = "https://qclay.design/lovable/crypto/Polygon%203.png";
const triangleRight = "https://qclay.design/lovable/crypto/Polygon%204.png";
import { SIGNATURE_EASE } from "../common/motionConfig";
import styles from "./OrbitRings.module.css";

const CIRCLE_DURATION = 0.65;
const CIRCLE_STAGGER = 0.14;

/**
 * Single pre-composed backdrop (rings + triangles baked into one PNG/WebP
 * at the 1440px reference) behind the icon orbit and heading, scaled
 * fluidly to the section width.
 */
export function OrbitRings() {
  const rootRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rootRef, { once: true, amount: 0.1 });
  const reduceMotion = useReducedMotion();
  const [visibleOnMount, setVisibleOnMount] = useState(false);
  const active = isInView || visibleOnMount || !!reduceMotion;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const check = () => {
      const { top, bottom } = el.getBoundingClientRect();
      if (top < window.innerHeight && bottom > 0) {
        setVisibleOnMount(true);
      }
    };

    check();
    const frame = requestAnimationFrame(check);
    return () => cancelAnimationFrame(frame);
  }, []);

  const circleTransition = (index: number) => ({
    duration: reduceMotion ? 0 : CIRCLE_DURATION,
    ease: SIGNATURE_EASE,
    delay: reduceMotion ? 0 : index * CIRCLE_STAGGER,
  });

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${active ? styles.active : ""}`}
      aria-hidden="true"
    >
      <div>
        <motion.img
          src={backImg}
          alt=""
          className={styles.backdrop}
          initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
          animate={active ? { opacity: 1, scale: 1, x: "-50%", y: "-50%" } : { opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
          transition={circleTransition(0)}
        />
        <div>
          <motion.img
            src={backImg1}
            alt=""
            className={styles.backdrop1}
            initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
            animate={active ? { opacity: 1, scale: 1, x: "-50%", y: "-50%" } : { opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
            transition={circleTransition(1)}
          />
          <div>
            <motion.img
              src={backImg2}
              alt=""
              className={styles.backdrop2}
              initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
              animate={active ? { opacity: 1, scale: 1, x: "-50%", y: "-50%" } : { opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
              transition={circleTransition(2)}
            />
            <div>
              <motion.img
                src={backImg3}
                alt=""
                className={styles.backdrop3}
                initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
                animate={active ? { opacity: 1, scale: 1, x: "-50%", y: "-50%" } : { opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
                transition={circleTransition(3)}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <img src={backRight} alt="" className={styles.backdropRight} />
      </div>

      <div>
        <img src={triangleRight} alt="" className={styles.triangleRight} />
      </div>

      <div>
        <img src={backLeft} alt="" className={styles.backdropLeft} />
      </div>

      <div>
        <img src={triangleLeft} alt="" className={styles.triangleLeft} />
      </div>
    </div>
  );
}
