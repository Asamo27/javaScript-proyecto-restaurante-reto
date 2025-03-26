const loginButton = document.querySelector('.btn-iniciar');

loginButton.addEventListener('click', () => {
  
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    if (!user || !password) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const loginData = {
        user: user,
        password: password
    };

    fetch('http://localhost:3005/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Usuario o contraseña incorrectos.');
        }
    })
    .then(data => {
        alert('Inicio de sesión exitoso.');
        console.log('Respuesta del servidor:', data);

    })
    .catch(error => {
        alert(error.message);
        console.error('Error:', error);
    });
});