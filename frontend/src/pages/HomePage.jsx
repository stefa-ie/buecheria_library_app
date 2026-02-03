import backgroundImage from "../assets/buecheria_bg.jpeg";

export default function HomePage() {
    return (
        <section
            className="min-h-screen w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="max-w-7xl mx-auto px-6 py-16">
                <h1 className="text-6xl font-bold text-gray-900 dark:text-slate-300">Bücheria</h1>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-300">Feministische und queere Stadtteilbibliothek</h2>
                <p className="text-gray-600">🏠 Vogelhüttendeich 30, 21107 HH</p>
            </div>
        </section>
    );
}

