import React, {useRef} from 'react';
import {motion} from 'framer-motion';

const About = ({isInView}: {isInView: boolean}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const container = {
    outsideView: {opacity: 0, transition: {duration: 0.1, when: 'beforeChildren'}},
    inView: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0,
      },
    },
  };

  const item = {
    outsideView: {opacity: 0, x: 80, height: 0, transition: {duration: 0.3}},
    inView: {
      opacity: 1,
      height: 'auto',
      x: 0,
      transition: {ease: 'easeOut', duration: 0.5, opacity: {duration: 0.8}},
    },
  };

  return (
    <div className="about">
      <motion.div
        className="about__details"
        ref={ref}
        variants={container}
        initial="inView"
        animate={isInView ? 'inView' : 'outsideView'}
      >
        <motion.span variants={item}>
          Маленькая <span className="text-gradient">студия</span>
        </motion.span>
        <motion.span variants={item}>
          <span className="text-gradient">c большими</span> идеями
        </motion.span>
        <motion.span variants={item}>и огромными</motion.span>
        <motion.span variants={item}>
          <span className="text-gradient">возможностями.</span>
        </motion.span>
        <motion.p className="about__goal" variants={item}>
          Наша цель –никогда <span className="text-primary">не останавливаться.</span>
        </motion.p>
        <motion.p className="about__bottom" variants={item}>
          <span>Быстро.&nbsp;&nbsp;Легко.&nbsp;&nbsp;Качественно.</span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default About;
