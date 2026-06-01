import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/** Wraps content and applies fade-in/fade-out based on scroll position. */
export default function SectionScrollFade({ children, ...props }) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { amount: 0.15, margin: '-5% 0px -5% 0px' });

  if (prefersReducedMotion) {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0.92 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
