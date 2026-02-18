const TITLES = {
    impressum: "Impressum",
    datenschutz: "Datenschutzerklärung",
    "cookie-einstellungen": "Cookie‑Einstellungen",
    barrierefreiheit: "Barrierefreiheitserklärung",
};

export default function PlaceholderPage({ slug }) {
    const title = TITLES[slug] || slug;

    return (
        <section className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-300">{title}</h1>
            <p className="mt-4 text-gray-600 dark:text-slate-500">Inhalt folgt.</p>
        </section>
    );
}
