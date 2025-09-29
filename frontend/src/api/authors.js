const API_URL = 'http://localhost:8080';

// Fetch all authors
export async function fetchAuthors() {
    const response = await fetch(`${API_URL}/authors`);
    if (!response.ok) {
        throw new Error('Failed to fetch authors');
    }
    return response.json();
}

// Fetch author by ID
export async function fetchAuthorById(id) {
    const response = await fetch(`${API_URL}/authors/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch author');
    }
    return response.json();
}

