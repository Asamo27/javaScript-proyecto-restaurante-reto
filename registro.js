const baseURL = "http://localhost:3005";

async function registrarUsuario(usuario) {
    try {
        const response = await fetch(`${baseURL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        if (!response.ok) {
            throw new Error("Error al registrar el usuario. Código de estado: " + response.status);
        }

        const resultado = await response.json();
        console.log("Usuario registrado con éxito:", resultado);
        alert("Usuario registrado con éxito: " + resultado.name);
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        alert("Error al registrar el usuario: " + error.message);
    }
}

document.querySelector(".btn-guardar").addEventListener("click", function () {

    const user = document.getElementById("user").value;
    const name = document.getElementById("name").value;
    const rol = document.getElementById("rol").value;
    const password = document.getElementById("password").value;

    if (!user || !name || !rol || !password) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const nuevoUsuario = {
        user: user,
        name: name,
        rol: rol,
        password: password
    };

    registrarUsuario(nuevoUsuario);
});