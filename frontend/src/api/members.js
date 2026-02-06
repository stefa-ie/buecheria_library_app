const API_URL = import.meta.env.VITE_API_URL;

// Fetch all members
export async function fetchMembers() {
    try {
        const response = await fetch(`${API_URL}/members`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch members: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }; 
}


// Fetch member by ID
export async function fetchMemberById(id) {
    const response = await fetch(`${API_URL}/members/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch member');
    }
    return response.json();
}


// Create a new member
export async function createMember(member) {
    const response = await fetch(`${API_URL}/members`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(member),
    });
    if (!response.ok) {
        throw new Error('Failed to create member');
    }
    return response.json();
}


// Update an existing member
export async function updateMember(id, member) {
    const response = await fetch(`${API_URL}/members/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(member),
    });
    if (!response.ok) {
        throw new Error('Failed to update member');
    }
    return response.json();
}


// Delete a member
export async function deleteMember(id) {
    const response = await fetch(`${API_URL}/members/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete member');
    }
    return response.json();
}

