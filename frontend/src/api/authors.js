const API_URL = 'https://buecheria-library-app.onrender.com/api';

// Fetch all authors
export async function fetchAuthors() {
    try {
        console.log('Fetching authors from:', `${API_URL}/authors`);
        const response = await fetch(`${API_URL}/authors`);
        console.log('Response:', response);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response body:', errorText);
            throw new Error(`Failed to fetch authors: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Authors data:', data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}


// Fetch author by ID
export async function fetchAuthorById(id) {
    const response = await fetch(`${API_URL}/authors/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch author');
    }
    return response.json();
}


// Create a new author
export async function createAuthor(author) {
    console.log('Creating author:', author);
    const response = await fetch(`${API_URL}/authors`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(author),
    });
    if (!response.ok) {
        let errorMessage = 'Failed to create author';
        try {
            const errorData = await response.json();
            errorMessage = errorData.detail || errorMessage;
        } catch (e) {
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
    }
    return response.json();
}


// Update an existing author
export async function updateAuthor(id, author) {
    const response = await fetch(`${API_URL}/authors/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(author),
    });
    if (!response.ok) {
        throw new Error('Failed to update author');
    }
    return response.json();
}


// Delete an author
export async function deleteAuthor(id) {
    const response = await fetch(`${API_URL}/authors/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete author');
    }
    return response.json();
}

