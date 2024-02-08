import React from 'react';
import {motion} from 'framer-motion';

interface Props {
  title: string;
  text: React.ReactNode;
  scale: number;
}

const PrincipleCard = ({title, text, scale}: Props) => {
  return (
    <motion.div className="principle-card" animate={{scale}} transition={{duration: 0.2, ease: 'easeOut'}}>
      <h3 className="text-gradient">{title}</h3>
      <p>
        {text}
      </p>
    </motion.div>
  );
};

export default PrincipleCard;
