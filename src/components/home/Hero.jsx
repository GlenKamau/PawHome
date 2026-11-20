import { Link } from "react-router-dom";
import { motion, MotionConfig } from "motion/react";
import { ChevronsDown, PawPrint } from "lucide-react";


const photo = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&h=875&q=80`;

const PHOTOS = [
  { src: photo("1552053831-71594a27632d"), alt: "Milo, a golden retriever mix holding a tulip" },
  { src: photo("1514888286974-6c03e2ca1dba"), alt: "Luna, a black and white cat looking at the camera" },
  { src: photo("1589941013453-ec89f33b5e95"), alt: "Rocky, a German Shepherd" },
  { src: photo("1551717743-49959800b1f6"), alt: "Two happy dogs smiling at the camera" },
];

const scrollTo = (id) => (e) => {
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-teal-deep text-ivory">
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:gap-14 lg:py-16">
          {/* Text */}
          <div className="text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-5xl font-bold leading-[1.05] tracking-tight text-ivory md:text-6xl xl:text-7xl"
            >
              Every pet deserves
              <span className="block underline decoration-coral decoration-4 underline-offset-8">
                a loving home.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-8 max-w-xl text-lg leading-8 text-ivory/85 lg:mx-0"
            >
              PawHome connects families with the dogs, cats and other pets waiting at local shelters.
              Browse, apply online and bring your new friend home.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <Link
                to="/pets"
                className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-coral px-7 py-3 font-semibold text-ink transition-colors hover:bg-coral-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
              >
                <PawPrint size={20} aria-hidden="true" />
                Find a pet
              </Link>
              <a
                href="#how-it-works"
                onClick={scrollTo("how-it-works")}
                className="inline-flex min-h-12 items-center rounded-lg border border-ivory/40 bg-ivory/10 px-7 py-3 font-semibold text-ivory transition-colors hover:bg-ivory/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
              >
                How adoption works
              </a>
            </motion.div>
          </div>

          <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-4 lg:max-w-none">
            {PHOTOS.map((p, i) => (
              <div key={p.src} className={i % 2 === 1 ? "mt-10" : ""}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                  className="aspect-4/5 overflow-hidden rounded-2xl border-4 border-ivory/20 bg-teal-dark shadow-xl"
                >
                  <img src={p.src} alt={p.alt} className="h-full w-full object-cover object-center" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-4 hidden justify-center lg:flex">
          <motion.a
            href="#our-pets"
            onClick={scrollTo("our-pets")}
            aria-label="Scroll down to see our pets"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ opacity: { duration: 0.6, delay: 1 }, y: { duration: 1.5, repeat: Infinity, delay: 1 } }}
            className="text-ivory/80 hover:text-ivory"
          >
            <ChevronsDown size={28} aria-hidden="true" />
          </motion.a>
        </div>
      </section>
    </MotionConfig>
  );
}