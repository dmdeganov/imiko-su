'use client';
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import Header from '@/components/Header';
import PrinciplesSlider from '@/components/PrinciplesSlider';
import {useScroll, useMotionValueEvent, isMotionValue} from 'framer-motion';
import ContactUsForm from '@/components/ContactUsForm';
import SliderIndicator from '@/shared-ui/SliderIndicator';
import Heading from '@/components/Heading';
import Projects from '@/components/Projects';
import About from '@/components/About';
import {useThrottle} from '@/hooks/useThrottle';
import IphoneCanvas from '@/components/sequnces/iphone-sequence/IphoneCanvas';
import LaptopCanvas from '@/components/sequnces/laptop-sequence/LaptopCanvas';
import IphoneImage from '@/components/sequnces/iphone-sequence/IphoneImage';
import LaptopImage from '@/components/sequnces/laptop-sequence/LaptopImage';
import Contact from '@/components/Contact';
import {WindowSizeContext} from '@/app/WindowSizeContextProvider';

const threshold = 10;
const mobileFooterHeight = 160;
const sliderRowGap = 16;

const Page = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const {height, isMobileWidth} = useContext(WindowSizeContext);
  const sliderHeight = useMemo(() => height * 5 + 5 * sliderRowGap + mobileFooterHeight, [height]);

  const scrollMap = useMemo(
    () => ({
      0: 0,
      1: height + 16,
      2: 2 * (height + 16),
      3: 3 * (height + 16),
      4: 4 * (height + 16),
    }),
    [height],
  ) as {[k: number]: number};

  const {scrollY} = useScroll({container: sliderRef});
  const [currentSlide, setCurrentSlide] = useState(0);
  const prevScrollY = useRef<number>(0);

  const onScrollYChange = (scroll: number) => {
    console.log(Math.round(scroll), Math.round(prevScrollY.current));
    const direction = scroll > prevScrollY.current ? 'down' : 'up';
    if (direction === 'down') {
      if (scroll > scrollMap[currentSlide] + threshold) {
        setCurrentSlide(prev => {
          return Math.min(4, prev + 1);
        });
      }
    }
    if (direction === 'up') {
      if (scroll < scrollMap[currentSlide] - threshold) {
        setCurrentSlide(prev => Math.max(0, prev - 1));
      }
    }
    prevScrollY.current = scroll;
  };

  const onScrollYChangeThrottled = useThrottle(onScrollYChange, 32);
  useMotionValueEvent(scrollY, 'change', onScrollYChangeThrottled);

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY === 100) {
      sliderRef.current!.scrollBy(0, 100);
    }
    if (e.deltaY === -100) {
      sliderRef.current!.scrollBy(0, -100);
    }
  };

  const [isIphoneImgAnimationEnded, setIsIphoneImgAnimationEnded] = useState(false);
  const [areImagesForIphoneSequenceLoaded, setAreImagesForIphoneSequenceLoaded] = useState(false);
  const showIphoneSequence = isIphoneImgAnimationEnded && areImagesForIphoneSequenceLoaded;
  const [areImagesForLaptopSequenceLoaded, setAreImagesForLaptopSequenceLoaded] = useState(false);

  return (
    <>
      <Header currentSlide={currentSlide} sliderRef={sliderRef} />
      <SliderIndicator currentSlide={currentSlide} />
      <IphoneCanvas
        currentSlide={currentSlide}
        onAllImagesLoad={() => setAreImagesForIphoneSequenceLoaded(true)}
        visible={showIphoneSequence}
      />
      <div className="main-slider" ref={sliderRef} onWheel={onWheel}>
        <section className="main-slider__slide" id="about">
          <Heading isInView={currentSlide === 0} />
          <IphoneImage
            onAnimationCompleted={() => setIsIphoneImgAnimationEnded(true)}
            slide={0}
            hidden={showIphoneSequence}
          />
        </section>
        <section className="main-slider__slide">
          <About isInView={currentSlide === 1} />
          <IphoneImage slide={1} hidden={showIphoneSequence} />
        </section>
        <section className="main-slider__slide" id="principles">
          <PrinciplesSlider />
        </section>
        <section className="main-slider__slide" id="projects">
          <Projects isInView={currentSlide === 2} />
        </section>
        <section className="main-slider__slide" id="contact-us">
          <Contact />
          <LaptopImage hidden={areImagesForLaptopSequenceLoaded} />
        </section>
        <footer className="main-slider__footer">
          ООО <b>ИМИКО</b>
          <br />
          ИНН <b>7813670710</b>
          <br />
          197110, город Санкт-Петербург,
          <br /> ул Большая Зеленина,
          <br />
          д. 24 стр. 1, помещ. 193-н
        </footer>
      </div>
      <LaptopCanvas
        currentSlide={currentSlide}
        areImagesForIphoneSequenceLoaded={areImagesForIphoneSequenceLoaded}
        onAllImagesLoad={() => setAreImagesForLaptopSequenceLoaded(true)}
        visible={areImagesForLaptopSequenceLoaded}
      />
    </>
  );
};

export default Page;
