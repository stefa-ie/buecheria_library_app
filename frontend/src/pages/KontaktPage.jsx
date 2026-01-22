import { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function KontaktPage() {
    const form = useRef(null);

    const sendEmail = (event) => {
        event.preventDefault();

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const adminTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const autoReplyTemplateId =
            import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        Promise.all([
            emailjs.sendForm(serviceId, adminTemplateId, form.current, {
                publicKey,
            }),
            emailjs.sendForm(serviceId, autoReplyTemplateId, form.current, {
                publicKey,
            }),
        ])
            .then(() => {
                window.alert("Danke! Deine Nachricht wurde gesendet.");
                form.current?.reset();
            })
            .catch((error) => {
                console.log("FAILED...", error.text);
            });
    };

    return (
        <section className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-gray-900">Kontakt</h1>
            <p className="mt-4 text-gray-700">
                Schreib uns gern oder komm vorbei.
            </p>
            <div className="mt-6 text-gray-600 space-y-2">
                <p>E-Mail: hallo@buecheria.example</p>
                <p>Adresse: Vogelhüttendeich 30, 21107 HH</p>
                <p>Öffnungszeiten: variieren</p>
            </div>

            <form
                ref={form}
                onSubmit={sendEmail}
                className="mt-8 space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
                <label className="block text-sm font-medium text-gray-700">
                    Name
                    <input
                        type="text"
                        name="user_name"
                        required
                        className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
                    />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                    Email
                    <input
                        type="email"
                        name="user_email"
                        required
                        className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
                    />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                    Title
                    <input
                        type="text"
                        name="message_title"
                        required
                        className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
                    />
                </label>
                
                <label className="block text-sm font-medium text-gray-700">
                    Message
                    <textarea
                        name="message"
                        rows="5"
                        required
                        className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
                    />
                </label>
                <input
                    type="submit"
                    value="Send"
                    className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
                />
            </form>
        </section>
    );
}
