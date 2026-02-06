const API_URL = 'https://buecheria-library-app.onrender.com/api';

// Fetch all loans
export async function fetchLoans() {
    try {
        console.log('Fetching loans from:', `${API_URL}/loans`);
        const response = await fetch(`${API_URL}/loans`);
        console.log('Response:', response);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response body:', errorText);
            throw new Error(`Failed to fetch loans: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Loans data:', data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}


// Fetch loan by ID
export async function fetchLoanById(id) {
    const response = await fetch(`${API_URL}/loans/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch loan');
    }
    return response.json();
}


// Create a new loan
export async function createLoan(loan) {
    console.log('Creating loan:', loan);
    const response = await fetch(`${API_URL}/loans`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loan),
    });
    if (!response.ok) {
        throw new Error('Failed to create loan');
    }
    return response.json();
}


// Update an existing loan
export async function updateLoan(id, loan) {
    const response = await fetch(`${API_URL}/loans/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loan),
    });
    if (!response.ok) {
        throw new Error('Failed to update loan');
    }
    return response.json();
}


// Delete a loan
export async function deleteLoan(id) {
    const response = await fetch(`${API_URL}/loans/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete loan');
    }
    return response.json();
}

