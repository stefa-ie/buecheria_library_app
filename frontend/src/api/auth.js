const API_URL = '/api';

// Login function
export async function login(username, password) {
    try {
        console.log('Attempting login to:', `${API_URL}/login`);
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        console.log('Login response status:', response.status);
        console.log('Login response ok:', response.ok);

        if (!response.ok) {
            let errorMessage = 'Login failed';
            try {
                const errorData = await response.json();
                errorMessage = errorData.detail || errorMessage;
            } catch (e) {
                // If response is not JSON, try to get text
                try {
                    const errorText = await response.text();
                    errorMessage = errorText || errorMessage;
                } catch (e2) {
                    errorMessage = `Server error: ${response.status} ${response.statusText}`;
                }
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('Login successful, received data:', data);
        return data;
    } catch (error) {
        console.error('Login error:', error);
        // Handle network errors
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error('Cannot connect to server. Please make sure the backend is running on http://localhost:8000');
        }
        throw error;
    }
}

// Get stored token
export function getToken() {
    return localStorage.getItem('access_token');
}

// Store token and user info
export function setToken(token, username, role) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
}

// Remove token (logout)
export function removeToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
}

// Check if user is authenticated
export function isAuthenticated() {
    return !!getToken();
}

// Make authenticated request
export async function authenticatedFetch(url, options = {}) {
    const token = getToken();
    
    if (!token) {
        throw new Error('No authentication token found');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        // Token expired or invalid
        removeToken();
        throw new Error('Authentication failed. Please login again.');
    }

    return response;
}

// Test protected route
export async function testProtectedRoute() {
    try {
        const response = await authenticatedFetch(`${API_URL}/protected`);
        if (!response.ok) {
            throw new Error('Failed to access protected route');
        }
        return await response.json();
    } catch (error) {
        console.error('Protected route error:', error);
        throw error;
    }
}

// Test admin-only route
export async function testAdminRoute() {
    try {
        const response = await authenticatedFetch(`${API_URL}/adminonly`);
        if (!response.ok) {
            throw new Error('Failed to access admin route');
        }
        return await response.json();
    } catch (error) {
        console.error('Admin route error:', error);
        throw error;
    }
}

