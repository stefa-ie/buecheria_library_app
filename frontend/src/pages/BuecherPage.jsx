export default function BuecherPage() {
    return (
        <section className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-300">Bücher</h1>
            <p className="mt-4 text-gray-700">
                Eine kleine Auswahl unserer feministischen und queeren Literatur.
            </p>
            <ul className="mt-6 list-disc list-inside text-gray-600 space-y-2">
                <li>Neu im Regal: Essays, Graphic Novels, Lyrik</li>
                <li>Empfehlung des Monats: Community-Klassiker</li>
                <li>Schwerpunkt: Intersektionale Perspektiven</li>
            </ul>
        </section>
    );
}
