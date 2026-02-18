import { useState, useEffect } from "react";
import buecheriaBg from "../assets/buecheria_bg.jpeg";
import carousel1 from "../assets/buecheria_carousel_1.jpeg";
import carousel2 from "../assets/buecheria_carousel_2.jpeg";

const SLIDES = [
    { src: buecheriaBg, alt: "Bücheria Hintergrund" },
    { src: carousel1, alt: "Bücheria Carousel 1" },
    { src: carousel2, alt: "Bücheria Carousel 2" },
];

const INTERVAL_MS = 5000;

export default function HomePage() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % SLIDES.length);
        }, INTERVAL_MS);
        return () => clearInterval(id);
    }, []);

    return (
        <>
            {/* Carousel fills viewport below header so footer is hidden until user scrolls */}
            <section
                className="relative w-full overflow-hidden min-h-[240px]"
                style={{
                    height: "calc(100vh - var(--header-height, 4rem))",
                    minHeight: "min(50vh, 320px)",
                }}
                aria-label="Startbilder"
            >
                {SLIDES.map((slide, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                        style={{
                            opacity: i === index ? 1 : 0,
                            zIndex: i === index ? 1 : 0,
                        }}
                        aria-hidden={i !== index}
                    >
                        <img
                            src={slide.src}
                            alt={slide.alt}
                            className="w-full h-full object-cover object-center"
                            loading={i === 0 ? "eager" : "lazy"}
                        />
                    </div>
                ))}

                {/* Overlay with title */}
                <div className="absolute inset-0 z-10 flex items-center justify-start bg-black/20 pointer-events-none">
                    <div className="max-w-7xl mx-auto px-6 w-full">
                        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-slate-300 drop-shadow-sm">
                            Bücheria
                        </h1>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-slate-300 drop-shadow-sm mt-2">
                            Feministische und queere Stadtteilbibliothek
                        </h2>
                        <p className="text-gray-800 dark:text-slate-200 mt-2 drop-shadow-sm">
                            🏠 Vogelhüttendeich 30, 21107 HH
                        </p>
                    </div>
                </div>

                {/* Dots */}
                <div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2"
                    role="tablist"
                    aria-label="Karussell-Steuerung"
                >
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            role="tab"
                            aria-selected={i === index}
                            aria-label={`Slide ${i + 1}`}
                            onClick={() => setIndex(i)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                i === index
                                    ? "w-8 bg-white shadow"
                                    : "w-2.5 bg-white/60 hover:bg-white/80"
                            }`}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}
