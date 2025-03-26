function obtenerPedidos() {
    fetch('http://localhost:3005/chef')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener pedidos.');
            }
        })
        .then(data => {
            mostrarPedidos(data);
        })
        .catch(error => console.error('Error:', error));
}

function mostrarPedidos(pedidos) {
    const tablaPorPreparar = document.querySelector('#Pizza tbody');
    const tablaPreparando = document.querySelector('#Pasta tbody');

    tablaPorPreparar.innerHTML = '';
    tablaPreparando.innerHTML = '';

    pedidos.forEach(pedido => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${pedido.platillo}</td>
            <td>${pedido.mesa}</td>
            <td>
                ${
                    pedido.estado === 'por preparar' 
                    ? `<button class="btn btn-primary btn-preparar" data-id="${pedido.id}">Preparar</button>` 
                    : `<button class="btn btn-success btn-listo" data-id="${pedido.id}">Listo</button>`
                }
            </td>
        `;

        if (pedido.estado === 'por preparar') {
            tablaPorPreparar.appendChild(fila);
        } else if (pedido.estado === 'preparando') {
            tablaPreparando.appendChild(fila);
        }
    });

    agregarEventosBotones();
}

function agregarEventosBotones() {
    const botonesPreparar = document.querySelectorAll('.btn-preparar');
    const botonesListo = document.querySelectorAll('.btn-listo');

    botonesPreparar.forEach(boton => {
        boton.addEventListener('click', () => actualizarEstadoPedido(boton.dataset.id, 'preparando'));
    });

    botonesListo.forEach(boton => {
        boton.addEventListener('click', () => actualizarEstadoPedido(boton.dataset.id, 'listo'));
    });
}

function actualizarEstadoPedido(id, nuevoEstado) {
    const url = nuevoEstado === 'preparando' ? 'http://localhost:3005/preparando' : 'http://localhost:3005/listo';

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: parseInt(id) })
    })
    .then(response => {
        if (response.ok) {
            alert(`Pedido actualizado a estado: ${nuevoEstado}`);
            obtenerPedidos();

            throw new Error('Error al actualizar el estado del pedido.');
        }
    })
    .catch(error => console.error('Error:', error));
}

obtenerPedidos();
