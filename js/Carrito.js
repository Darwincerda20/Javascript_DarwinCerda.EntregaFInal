/************************PRODUCTOS DESDE ARCHIVO JSON*****************************/
const lista = document.querySelector("#listado");
const mostrarTodosCheckbox = document.getElementById("mostrarTodos");

fetch("../js/data.json")
  .then((r) => r.json())
  .then((data) => {
    mostrarProductos(data);
  });

/************************FILTRO PARA PRODUCTOS*****************************/
function aplicarFiltro() {
  const checkboxes = document.getElementsByName("categoria");
  const categoriasSeleccionadas = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  fetch("../js/data.json")
    .then((r) => r.json())
    .then((data) => {
      let productosFiltrados = data;

      if (!mostrarTodosCheckbox.checked && categoriasSeleccionadas.length > 0) {
        productosFiltrados = data.filter((producto) =>
          categoriasSeleccionadas.includes(producto.categoria)
        );
      }

      mostrarProductos(productosFiltrados);
    });
}

function mostrarProductos(productos) {
  lista.innerHTML = "";

  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <div class="card-body">
          <h4 class="card-title text-center">${producto.nombre}</h4>
          <p class="card-text text-center">$ ${producto.precio}</p>
          <img class="card-img-top img-producto" src="${producto.ImagenURL}" alt="Imagen Productos">
          <p class="card-text text-center">${producto.Descripcion}</p>
        </div>
        <div class="card-footer text-center">
          <a href="#" class="btn btn-primary">Agregar al Carrito</a>
        </div>
      `;
    lista.append(div);
  });
}

// Al cargar la página, mostrar todos los productos
window.addEventListener("load", function () {
  mostrarTodosCheckbox.checked = true;
  aplicarFiltro();
});

/************************AGREGAR AL CARRITO*****************************/




// /* Función para actualizar el contenido del carrito en el HTML */
// function actualizarCarrito() {
//   var contenedorCarrito = document.getElementById("carrito");
//   contenedorCarrito.innerHTML = "";

//   var total = 0;

//   carrito.forEach(function (producto) {
//     var elementoProducto = document.createElement("div");
//     elementoProducto.className = "producto-carrito";

//     var nombreProducto = document.createElement("p");
//     nombreProducto.textContent = producto.nombre;

//     var precioProducto = document.createElement("p");
//     precioProducto.textContent = "Precio: $" + producto.Precio;

//     var cantidadProducto = document.createElement("input");
//     cantidadProducto.type = "number";
//     cantidadProducto.value = 1;
//     cantidadProducto.min = 1;
//     cantidadProducto.max = 4;
//     cantidadProducto.addEventListener("input", function () {
//       actualizarCantidad(producto, parseInt(cantidadProducto.value));
//     });

//     var botonEliminar = document.createElement("button");
//     botonEliminar.textContent = "Eliminar";
//     botonEliminar.addEventListener("click", function () {
//       eliminarDelCarrito(producto);
//     });

//     var subtotal = parseInt(producto.Precio.substring(1)) * producto.cantidad;
//     producto.subtotal = subtotal;
//     total += subtotal;

//     elementoProducto.appendChild(nombreProducto);
//     elementoProducto.appendChild(precioProducto);
//     elementoProducto.appendChild(cantidadProducto);
//     elementoProducto.appendChild(botonEliminar);
//     contenedorCarrito.appendChild(elementoProducto);
//   });

//   var totalCarrito = document.createElement("p");
//   totalCarrito.textContent = "Total: $" + total;
//   contenedorCarrito.appendChild(totalCarrito);
// }

// /* Función para actualizar la cantidad de un producto en el carrito */
// function aumentarCantidad(producto) {
//   carrito.forEach(function (item) {
//     if (item === producto) {
//       item.cantidad++;
//       item.total = item.precio * item.cantidad;
//     }
//   });

//   actualizarCarrito();
// }

// /* Función para eliminar un producto del carrito */
// function eliminarDelCarrito(producto) {
//   var indice = carrito.indexOf(producto);
//   if (indice !== -1) {
//     carrito.splice(indice, 1);
//   }

//   actualizarCarrito();
// }

/***********************FORMULARIO***************************/

/* Informacion del formulario */
var totalCarrito = document.getElementById("TotalCarrito");
totalCarrito.textContent = "Total Carrito: $" + total;

/* Obtener información del formulario */
var formulario = document.getElementById("formulariocontacto");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  var nombre = document.getElementById("nombre").value;
  var email = document.getElementById("email").value;
  var telefono = document.getElementById("telefono").value;
  var comentarios = document.getElementById("comentarios").value;

  /* Almacenar los valores en localStorage */
  localStorage.setItem("nombre", nombre);
  localStorage.setItem("email", email);
  localStorage.setItem("telefono", telefono);
  localStorage.setItem("comentarios", comentarios);

  /* Mostrar Mensaje en el localstorage */
  console.log("Datos almacenados");
});
