import { useEffect, useRef } from "react";
import { Instagram, ExternalLink } from "lucide-react";
import useTheme from "../hooks/useTheme";

const INSTAGRAM_URL = "https://www.instagram.com/buecheria_wilhelmsburg/?hl=en";

const STORMLIKES_KEY = "buecheria_wilhelmsburg";
const STORMLIKES_LIMIT = 12;
const STORMLIKES_TYPES = true;
const CONTAINER_ID = "stormlikes-instagram-feed";
const WIDGET_MOVE_DELAY_MS = 100;

const INSTAGRAM_EMBED_URL = import.meta.env.VITE_INSTAGRAM_EMBED_URL || "";

export default function UeberUnsPage() {
    const { theme } = useTheme();
    const stormlikesContainerRef = useRef(null);

    useEffect(() => {
        if (INSTAGRAM_EMBED_URL) return;
        const container = stormlikesContainerRef.current;
        if (!container) return;

        const script = document.createElement("script");
        script.src = `https://stormlikes.com/js/embed.min.js?key=${STORMLIKES_KEY}&limit=${STORMLIKES_LIMIT}&dark=${theme === "dark"}&types=${STORMLIKES_TYPES}`;
        script.async = true;
        script.crossOrigin = "anonymous";

        const moveWidgetIntoContainer = () => {
            if (!script.parentNode) return;
            const widgetEl = script.nextElementSibling;
            const styleEl = widgetEl?.nextElementSibling;
            if (widgetEl && !container.contains(widgetEl)) {
                container.appendChild(widgetEl);
                if (styleEl && styleEl.tagName === "STYLE") container.appendChild(styleEl);
            }
        };

        script.onload = () => {
            setTimeout(moveWidgetIntoContainer, WIDGET_MOVE_DELAY_MS);
        };
        document.body.appendChild(script);

        return () => {
            script.remove();
            container.innerHTML = "";
        };
    }, [theme]);

    return (
        <section className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-300">Über uns</h1>
            <p className="mt-4 text-gray-700 dark:text-slate-400">
                Bücheria ist eine Stadtteilbibliothek mit Fokus auf feministische
                und queere Perspektiven.
            </p>
            <p className="mt-4 text-gray-600 dark:text-slate-500">
                Die Bücheria wurde von Anna-Sophia Unterstab im Rahmen ihrer Masterarbeit 2022 ins Leben gerufen. 
                Im Reiherstiegviertel in Hamburg-Wilhelmsburg befindet sich heute der Begegnungsort und bietet Bücher 
                zu alltagsfeministischen Themen, die von Frauen und queeren Menschen geschrieben wurden, darunter Romane, 
                Gedichtbände, Comics, Biografien, Kinder- und Jugendbücher sowie Sachbücher.
            </p>
            <p className="mt-4 text-gray-600 dark:text-slate-500">
                Bücher sind Werkzeuge, die dabei helfen, den Alltag zu reflektieren, Zuflucht zu finden und andere Lebensentwürfe 
                aufzuzeigen. Die Bibliothek ist ein mit der Community selbst gestalteter Ort, an dem selbstorganisiert im 
                halb-öffentlichen Raum feministische Wissensproduktion und gesellschaftliche Veränderung praktiziert werden.
            </p>

            <div className="mt-12 pt-10 border-t border-gray-200 dark:border-slate-700">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-slate-300 flex items-center gap-2">
                    <Instagram className="size-6 text-[#E4405F]" aria-hidden />
                    Instagram
                </h2>
                <p className="mt-3 text-gray-600 dark:text-slate-500">
                    Folgt uns auf Instagram für Neuigkeiten, Lesetipps und Einblicke in die Bücheria Wilhelmsburg.
                </p>

                {/* Stormlikes widget or iframe embed directly underneath the text above */}
                {INSTAGRAM_EMBED_URL ? (
                    <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800/50">
                        <iframe
                            src={INSTAGRAM_EMBED_URL}
                            title="Instagram feed @buecheria_wilhelmsburg"
                            className="w-full h-[480px] min-h-[320px] border-0"
                            loading="lazy"
                        />
                    </div>
                ) : (
                    <div
                        ref={stormlikesContainerRef}
                        id={CONTAINER_ID}
                        className="mt-4 min-h-[200px] rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800/50 [&_a]:!text-[#E4405F]"
                        aria-label="Instagram feed"
                    />
                )}
            </div>
        </section>
    );
}
