const baseURL = "http://localhost:3005";

async function obtenerPedidos() {
    try {
        const response = await fetch(`${baseURL}/pedidos`, {
            method: "GET"
        });
        const pedidos = await response.json();
        console.log("Pedidos obtenidos:", pedidos);
    } catch (error) {
        console.error("Error al obtener los pedidos:", error);
    }
}

async function crearPedido(pedido) {
    try {
        const response = await fetch(`${baseURL}/pedido`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pedido)
        });
        const resultado = await response.json();
        console.log("Pedido creado:", resultado);
    } catch (error) {
        console.error("Error al crear el pedido:", error);
    }
}

async function actualizarPedido(id, datosActualizados) {
    try {
        const response = await fetch(`${baseURL}/pedido`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, ...datosActualizados })
        });
        const resultado = await response.json();
        console.log("Pedido actualizado:", resultado);
    } catch (error) {
        console.error("Error al actualizar el pedido:", error);
    }
}

async function eliminarPedido(id) {
    try {
        const response = await fetch(`${baseURL}/pedido`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        });
        const resultado = await response.json();
        console.log("Pedido eliminado:", resultado);
    } catch (error) {
        console.error("Error al eliminar el pedido:", error);
    }
}

obtenerPedidos();

const nuevoPedido = {
    platillo: "pizza calzoni",
    precio: 35000,
    mesa: 1,
    cantidad: 1,
    observaciones: "arto queso",
    cliente: "Rascael Alberto",
    fecha: "2025-11-16T20:00"
};
crearPedido(nuevoPedido);

const datosActualizados = {
    platillo: "Sopa de pollo",
    precio: 20000,
    mesa: 2,
    cantidad: 2,
    observaciones: "sin cebolla y tomate",
    cliente: "Rosa Melo",
    fecha: "2025-11-16T20:00",
    estado: "por preparar"
};
actualizarPedido(1, datosActualizados);

eliminarPedido(18);
