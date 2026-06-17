import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { DEFAULT_HERO_SLIDES, useHeroSlides } from "../lib/content";

const isOldBundledHeroAsset = (image?: string) => image?.startsWith("/assets/hero-") ?? false;

const getFallbackHeroImage = (index: number) =>
  DEFAULT_HERO_SLIDES[index % DEFAULT_HERO_SLIDES.length]?.image ?? DEFAULT_HERO_SLIDES[0].image;

export function HeroCarousel() {
  const { items: slides } = useHeroSlides();
  const [current, setCurrent] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  if (slides.length === 0) return <section className="h-[85vh] min-h-[500px] bg-brand-dark" />;
  const slide = slides[current];
  const imageKey = `${slide.id}-${slide.image}`;
  const image = !slide.image || isOldBundledHeroAsset(slide.image) || failedImages[imageKey]
    ? getFallbackHeroImage(current)
    : slide.image;
  const handleImageError = () => {
    setFailedImages((prev) => (prev[imageKey] ? prev : { ...prev, [imageKey]: true }));
  };

  return (
    <>
    {/* ============ MOBILE HERO (fresh, compact, fully responsive) ============ */}
    <section className="sm:hidden relative w-full overflow-hidden bg-brand-dark">
      <div className="relative w-full aspect-[4/5] max-h-[80vh]">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={image}
            alt=""
            onError={handleImageError}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>
        {/* readable gradient — lighter so image shows through */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/50 to-brand-dark/20" />

        {/* content */}
        <div className="absolute inset-x-0 bottom-0 px-4 pb-10 pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-sm bg-brand-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-red-foreground">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                {slide.subtitle}
              </span>
              <h1 className="mt-2.5 font-heading text-[1.6rem] font-extrabold leading-[1.15] text-brand-dark-foreground whitespace-pre-line">
                {slide.title}
              </h1>
              <p className="mt-2 text-[13px] leading-relaxed text-brand-dark-foreground/75 line-clamp-3">
                {slide.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to={slide.ctaLink} className="btn-primary !py-2.5 !px-4 !text-[13px]">
                  {slide.cta}
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </Link>
                <a href="tel:+919876543210" className="btn-white !py-2.5 !px-4 !text-[13px]">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  Call
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* dots */}
          <div className="mt-5 flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-brand-red" : "w-3 bg-brand-dark-foreground/30"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ============ DESKTOP HERO ============ */}
    <section className="hidden sm:block relative sm:h-[68vh] sm:min-h-[400px] md:h-[78vh] md:min-h-[460px] max-h-[800px] overflow-hidden bg-brand-dark">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-slide absolute inset-0"
        >
          <img src={image} alt="" onError={handleImageError} className="h-full w-full object-cover object-center" width={1920} height={800} />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-2 rounded-sm bg-brand-red px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-red-foreground">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                {slide.subtitle}
              </span>
              <h1 className="mt-4 font-heading text-5xl font-extrabold leading-[1.15] text-brand-dark-foreground md:text-6xl whitespace-pre-line">
                {slide.title}
              </h1>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-brand-dark-foreground/70 md:text-lg">
                {slide.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={slide.ctaLink} className="btn-primary !py-3.5 !px-8">
                  {slide.cta}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </Link>
                <a href="tel:+919876543210" className="btn-white !py-3.5 !px-8">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  Call Now
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-brand-red" : "w-4 bg-brand-dark-foreground/30"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
    </>
  );
}
