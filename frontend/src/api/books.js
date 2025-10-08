const API_URL = 'http://localhost:5000/api';

// Fetch all books
export async function fetchBooks() {
    const response = await fetch(`${API_URL}/books`);
    if (!response.ok) {
        throw new Error('Failed to fetch books');
    }
    return response.json();
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

