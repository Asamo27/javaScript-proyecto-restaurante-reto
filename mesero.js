function obtenerPedidos() {
  fetch('http://localhost:3005/mesero')
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
  const tablaPorEntregar = document.querySelector('#Pizza tbody');
  const tablaEntregado = document.querySelector('#Pasta tbody');

  tablaPorEntregar.innerHTML = '';
  tablaEntregado.innerHTML = '';

  pedidos.forEach(pedido => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
          <td>${pedido.platillo}</td>
          <td>${pedido.mesa}</td>
          <td>
              ${
                  pedido.estado === 'por entregar'
                  ? `<button class="btn btn-primary btn-entregar" data-id="${pedido.id}">Entregar</button>`
                  : '<span class="badge bg-success">Entregado</span>'
              }
          </td>
      `;

      if (pedido.estado === 'por entregar') {
          tablaPorEntregar.appendChild(fila);
      } else if (pedido.estado === 'entregado') {
          tablaEntregado.appendChild(fila);
      }
  });

  agregarEventosBotones();
}

function agregarEventosBotones() {
  const botonesEntregar = document.querySelectorAll('.btn-entregar');

  botonesEntregar.forEach(boton => {
      boton.addEventListener('click', () => actualizarEstadoPedido(boton.dataset.id));
  });
}

function actualizarEstadoPedido(id) {
  fetch('http://localhost:3005/entregado', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: parseInt(id) })
  })
  .then(response => {
      if (response.ok) {
          alert('El pedido ha sido marcado como entregado.');
          obtenerPedidos();
      } else {
          throw new Error('Error al actualizar el estado del pedido.');
      }
  })
  .catch(error => console.error('Error:', error));
}

obtenerPedidos();