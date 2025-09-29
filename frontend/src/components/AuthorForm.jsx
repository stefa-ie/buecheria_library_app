import React from "react";
import { createLoan } from "../api/authors";

// AuthorForm component to add a new author
export default function AuthorForm({ onAuthorCreated }) {
    const [name, setName] = React.useState("");
    const [birthdate, setBirthdate] = React.useState("");

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newAuthor = await createLoan({ name, birthdate });
            onAuthorCreated(newAuthor);
            setName("");
            setBirthdate("");
        } catch (error) {
            console.error("Error creating author:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Birthdate:</label>
                <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Author</button>
        </form>
    );
}

