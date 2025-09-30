import React from "react";
import { createAuthor } from "../api/authors";


// AuthorForm component to add a new author
export default function AuthorForm({ onAuthorCreated }) {
    const [lastName, setLastName] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [birthdate, setBirthdate] = React.useState("");

    // Construct new author object
    const newAuthor = {
        lastName,
        firstName,
        birthdate,
    };

    // 

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            createAuthor(newAuthor).then((createdAuthor) => {
                onAuthorCreated(createdAuthor);
                // Clear form fields
                setLastName("");
                setFirstName("");
                setBirthdate("");
            });
        } catch (error) {
            console.error("Error creating author:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
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

