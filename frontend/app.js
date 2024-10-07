// frontend/app.js
const API_URL = 'http://localhost:5000/api';

document.getElementById('registration-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    alert(data.message);
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
    } else {
        alert(data.message);
    }
});

document.getElementById('petition-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('petition-title').value;
    const description = document.getElementById('petition-description').value;

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in to create a petition.');
        return;
    }

    const response = await fetch(`${API_URL}/petitions`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
    });

    const data = await response.json();
    alert(data.message);
});

document.getElementById('poll-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const question = document.getElementById('poll-question').value;
    const option1 = document.getElementById('poll-option1').value;
    const option2 = document.getElementById('poll-option2').value;

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in to create a poll.');
        return;
    }

    const response = await fetch(`${API_URL}/polls`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question, options: [option1, option2] })
    });

    const data = await response.json();
    alert(data.message);
});
