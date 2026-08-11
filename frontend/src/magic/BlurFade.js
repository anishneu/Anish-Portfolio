import { motion, useReducedMotion } from 'framer-motion';
import './magic.css';

/** Magic UI–style blur + fade on enter (framer-motion port). */
export default function BlurFade({
  children,
  delay = 0,
  duration = 0.55,
  yOffset = 18,
  blur = 8,
  className = '',
  as: Component = 'div',
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[Component] || motion.div;

  if (prefersReducedMotion) {
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: yOffset, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
