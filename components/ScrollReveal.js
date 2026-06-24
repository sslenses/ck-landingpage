'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    // Check if browser natively supports scroll-driven animations
    const supportsScrollTimeline = 
      typeof CSS !== 'undefined' && 
      CSS.supports && 
      CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

    if (!supportsScrollTimeline) {
      // If native support is missing, add classes and set up observer
      const revealElements = document.querySelectorAll('.scroll-reveal');
      const scaleElements = document.querySelectorAll('.scroll-reveal-scale');

      revealElements.forEach(el => {
        el.classList.add('scroll-reveal-fallback');
      });

      scaleElements.forEach(el => {
        el.classList.add('scroll-reveal-scale-fallback');
      });

      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Once visible, we can unobserve to avoid repeat triggers
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      revealElements.forEach((el) => observer.observe(el));
      scaleElements.forEach((el) => observer.observe(el));

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return null;
}
