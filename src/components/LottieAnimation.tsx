import { useEffect, useMemo, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

type LottieAnimationProps = {
  src?: string; // Remote JSON URL
  animationData?: object; // Inline JSON
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  onReady?: (ref: LottieRefCurrentProps | null) => void;
};

const LottieAnimation = ({ src, animationData, loop = true, autoplay = true, className, onReady }: LottieAnimationProps) => {
  const [data, setData] = useState<object | null>(animationData ?? null);
  const [error, setError] = useState<string | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    let active = true;
    if (!src) return;

    (async () => {
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error(`Failed to load Lottie JSON: ${res.status}`);
        const json = await res.json();
        if (active) setData(json);
      } catch (e: any) {
        console.error(e);
        if (active) setError(e?.message ?? "Failed to load animation");
      }
    })();

    return () => {
      active = false;
    };
  }, [src]);

  const content = useMemo(() => {
    if (error) return null;
    if (!data) return null;
    return (
      <Lottie
        animationData={data}
        loop={loop}
        autoplay={autoplay}
        className={className}
        lottieRef={lottieRef as any}
      />
    );
  }, [data, autoplay, className, error, loop, onReady]);

  useEffect(() => {
    if (data && lottieRef.current) {
      onReady?.(lottieRef.current);
    }
  }, [data, onReady]);

  return content;
};

export default LottieAnimation;
