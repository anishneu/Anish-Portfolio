import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP ScrollTrigger reveal for descendants matching `selector`.
 * Returns a ref to attach to the section root.
 */
export default function useGsapReveal(selector = '[data-reveal]', options = {}) {
  const rootRef = useRef(null);
  const {
    y = 36,
    duration = 0.75,
    stagger = 0.1,
    start = 'top 82%',
    once = true,
  } = options;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const targets = root.querySelectorAll(selector);
    if (!targets.length) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root,
            start,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [selector, y, duration, stagger, start, once]);

  return rootRef;
}
