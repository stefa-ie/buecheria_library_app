const API_URL = import.meta.env.VITE_API_URL;

// Fetch all books
export async function fetchBooks() {
    try {
        console.log('Fetching from:', `${API_URL}/books`);
        const response = await fetch(`${API_URL}/books`);
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`Failed to fetch books: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched data:', data);
        return data;
    } catch (error) {
        console.error('Fetch error details:', error);
        throw error;
    }
}


// Fetch book by ID
export async function fetchBookById(id) {
    const response = await fetch(`${API_URL}/books/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch book');
    }
    return response.json();
}


// Create a new book
export async function createBook(book) {
    console.log('Creating book:', book);
    const response = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    });
    if (!response.ok) {
        throw new Error('Failed to create book');
    }
    return response.json();
}


// Update an existing book
export async function updateBook(id, book) {
    const response = await fetch(`${API_URL}/books/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    });
    if (!response.ok) {
        throw new Error('Failed to update book');
    }
    return response.json();
}


// Delete a book
export async function deleteBook(id) {
    const response = await fetch(`${API_URL}/books/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete book');
    }
    return response.json();
}

