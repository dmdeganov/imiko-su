import React, {useContext, useEffect, useRef, useState} from 'react';
import {motion, useScroll, useTransform, useSpring} from 'framer-motion';
import {WindowSizeContext} from '@/app/WindowSizeContextProvider';
import {principlesTexts} from '@/components/principlesTexts';
import PrincipleCard from '@/components/PrincipleCard';

let timeoutId = 0;

const PrinciplesSlider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const {scrollXProgress} = useScroll({
    container: ref,
  });

  const {isMobileWidth} = useContext(WindowSizeContext);

  const scrollXSpringed = useSpring(scrollXProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  const [scaleCard, setScaleCard] = useState(1);

  scrollXProgress.on('change', () => {
    setScaleCard(0.97);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      setScaleCard(1);
      clearTimeout(timeoutId);
    }, 150);
  });

  const backgroundSize = useTransform(
    scrollXSpringed,
    [0, 0.5, 1],
    isMobileWidth ? ['0%', '50%', '100%'] : ['0%', '100%', '0%'],
  );
  const backgroundPosition = useTransform(
    scrollXProgress,
    [0, 0.499, 0.5, 1],
    isMobileWidth ? ['right', 'right', 'right', 'right'] : ['right', 'right', 'left', 'left'],
  );

  function eventWheel(e: WheelEvent) {
    if (!ref.current) return;
    const needToScrollUp = ref.current.scrollLeft === 0 && e.deltaY < 0;
    const needToScrollDown =
      ref.current.scrollLeft + ref.current.clientWidth >= ref.current.scrollWidth - 10 && e.deltaY > 0;

    if (needToScrollUp || needToScrollDown) {
      return;
    } else {
      e.stopPropagation();
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      if (Math.abs(delta) === 100) {
        const directionSign = (e.deltaY || e.deltaX) > 0 ? 1 : -1;
        ref.current.scrollBy({top: 0, left: directionSign * 500, behavior: 'smooth'});
        return;
      }

      ref.current.scrollBy(delta, 0);
    }
  }

  useEffect(() => {
    ref.current!.addEventListener('wheel', eventWheel);
  }, []);

  return (
    <div className="principles">
      <div className="principles__hero">
        <motion.h2 className="principles__hero-text" style={{backgroundSize, backgroundPosition}}>
          Принципы
        </motion.h2>
      </div>
      <div className="principles-slider" ref={ref}>
        <div className="principles-slider__slide" />
        <div className="principles-slider__slide principles-grid">
          {principlesTexts.map(({title, text}) => (
            <PrincipleCard title={title} text={text} scale={scaleCard} key={title} />
          ))}
        </div>
        <div className="principles-slider__slide" />
      </div>
    </div>
  );
};

export default PrinciplesSlider;
