import { useLayoutEffect, type DependencyList, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Anima con GSAP + ScrollTrigger todos los descendientes de `ref` marcados con `data-reveal`:
 * aparecen con un desvanecido y un leve desplazamiento hacia arriba cuando entran en pantalla.
 * Los elementos que entran juntos se animan en cascada (stagger).
 * Se respeta `prefers-reduced-motion`: si el usuario lo activa no hay animación.
 *
 * `deps` vuelve a crear las animaciones cuando cambia el contenido (p. ej. al filtrar el catálogo).
 */
export function useScrollReveal(ref: RefObject<HTMLElement | null>, deps: DependencyList = []) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const items = gsap.utils.toArray<HTMLElement>('[data-reveal]', root);
      if (items.length === 0) return;

      gsap.set(items, { autoAlpha: 0, y: 28 });

      ScrollTrigger.batch(items, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.08,
            overwrite: true,
          }),
      });

      // Las imágenes cargan con `loading="lazy"` y cambian la altura del layout.
      ScrollTrigger.refresh();
    });

    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Parallax suave: el elemento se desplaza verticalmente (en porcentaje) ligado al scroll
 * mientras `trigger` atraviesa la pantalla.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  selector: string,
  yPercent = 14
) {
  useLayoutEffect(() => {
    const trigger = ref.current;
    if (!trigger) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const targets = gsap.utils.toArray<HTMLElement>(selector, trigger);
      if (targets.length === 0) return;

      gsap.fromTo(
        targets,
        { yPercent: -yPercent / 2, scale: 1.12 },
        {
          yPercent: yPercent / 2,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );
    });

    return () => mm.revert();
  }, [ref, selector, yPercent]);
}
