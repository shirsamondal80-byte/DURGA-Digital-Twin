import { useEffect, useRef, useState } from "react";
import "./IntroAnimation.css";

const FRAME_COUNT = 240;
const FPS = 30;

function getFramePath(frameNumber) {
  return `/intro/ezgif-frame-${String(frameNumber).padStart(3, "0")}.png`;
}

export default function IntroAnimation({ onComplete }) {
  const [currentFrame, setCurrentFrame] = useState(1);

  const frameRef = useRef(1);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const frameDuration = 1000 / FPS;

    function play(currentTime) {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }

      const elapsed = currentTime - lastTimeRef.current;

      if (elapsed >= frameDuration) {
        lastTimeRef.current = currentTime;

        if (frameRef.current < FRAME_COUNT) {
          frameRef.current += 1;
          setCurrentFrame(frameRef.current);
        } else {
          if (onComplete) {
            onComplete();
          }

          return;
        }
      }

      animationFrameRef.current =
        requestAnimationFrame(play);
    }

    animationFrameRef.current =
      requestAnimationFrame(play);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [onComplete]);

  return (
    <div className="intro-animation">
      <img
        src={getFramePath(currentFrame)}
        alt=""
        draggable="false"
      />
    </div>
  );
}