/* Obtener información del formulario */

/* Formulario */
var formulario = document.getElementById("formulariocontacto");

/* evento del formulario */
formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  var nombre = document.getElementById("nombre").value;
  var email = document.getElementById("email").value;
  var telefono = document.getElementById("telefono").value;
  var fechaLlegada = document.getElementById("fecha-llegada").value;
  var numBicicletas = document.getElementById("N° Bicicletas").value;
  var comentarios = document.getElementById("comentarios").value;

  /* Almacenar los valores en localStorage */
  localStorage.setItem("nombre", nombre);
  localStorage.setItem("email", email);
  localStorage.setItem("telefono", telefono);
  localStorage.setItem("fechaLlegada", fechaLlegada);
  localStorage.setItem("numBicicletas", numBicicletas);
  localStorage.setItem("comentarios", comentarios);

  /* Mostrar un mensaje */
  console.log("Datos almacenados");
});

/* Filtro para HTML */

/* Productos */
var productos = [
  {
    nombre: "Visita Tecnica",
    categoria: "Visita",
    Precio: "$5000",
    imagenURL:
      "https://thumbs.dreamstime.com/b/checklist-sheet-paper-flat-vector-cartoon-illustration-objects-isolated-white-background-check-list-icon-108257866.jpg",
  },
  {
    nombre: "Regulación Cambios",
    categoria: "Cuadro",
    Precio: "$4500",
    imagenURL:
      "https://media.wd40.es/app/uploads/2020/12/19151618/como-ajustar-cambios-bici.jpeg",
  },
  {
    nombre: "Ajuste de frenos",
    categoria: "Piezas",
    Precio: "$3500",
    imagenURL:
      "https://tuvalum.com/blog/wp-content/uploads/2021/04/Mecanico-reparando-frenos.jpg",
  },
  {
    nombre: "Servicio a Domicilio",
    categoria: "Visita",
    Precio: "$10000",
    imagenURL:
      "https://blog.montenbaik.com/wp-content/uploads/2022/02/004__Mobile_1280x1200_Delivery-501x469.jpg",
  },
  {
    nombre: "Sangrado Frenos",
    categoria: "Cuadro",
    Precio: "$15000",
    imagenURL:
      "https://www.sport.es/bicio/wp-content/uploads/2021/12/Portada-frenos.jpg",
  },
  {
    nombre: "Alineacion o Centrado de Ruedas",
    categoria: "Piezas",
    Precio: "$7000",
    imagenURL:
      "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61reUoOY7SL._AC_UF894,1000_QL80_.jpg",
  },
  {
    nombre: "Cambio de Maza o Piñon",
    categoria: "Piezas",
    Precio: "$25000",
    imagenURL:
      "https://challacycling.cl/wp-content/uploads/2020/11/sram-mullet.jpg",
  },
  {
    nombre: "Revisión de Horquillas",
    categoria: "Piezas",
    Precio: "$35000",
    imagenURL:
      "https://www.sport.es/bicio/wp-content/uploads/2018/11/horquilla-de-suspension-portada.jpg",
  },
  {
    nombre: "Mantencion Express",
    categoria: "Mantención",
    Precio: "$10000",
    imagenURL:
      "https://cdn.milenio.com/uploads/media/2018/10/26/pits-de-la-formula-reuters.jpg",
  },
  {
    nombre: "Mantencion Basica",
    categoria: "Mantención",
    Precio: "$35000",
    imagenURL:
      "https://solobici.es/wp-content/uploads/2019/01/mantenimiento_1.jpg",
  },
  {
    nombre: "Mantencion Intermedia",
    categoria: "Mantención",
    Precio: "$45000",
    imagenURL:
      "http://bicicletasmiguel.com/wp-content/uploads/2016/09/reparacion-bicicletas-miguel-avila.jpg",
  },
  {
    nombre: "Mantencion Full",
    categoria: "Mantención",
    Precio: "$55000",
    imagenURL:
      "https://www.mdzol.com/u/fotografias/m/2019/12/4/f638x638-3046_61213_5050.jpg",
  },
];

var carrito = [];

/* Función para crear los productos en el HTML */
function mostrarProductos(productos) {
  var contenedorProductos = document.getElementById("productos");
  contenedorProductos.innerHTML = "";

  productos.forEach(function (producto) {
    var elementoProducto = document.createElement("div");
    elementoProducto.className = "card";

    var cardImg = document.createElement("img");
    cardImg.className = "card-img-top";
    cardImg.src = producto.imagenURL;
    cardImg.alt = producto.nombre;

    var cardBody = document.createElement("div");
    cardBody.className = "card-body";

    var cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = producto.nombre;

    var cardPrecio = document.createElement("p");
    cardPrecio.className = "card-precio";
    cardPrecio.textContent = "Precio: " + producto.Precio;

    var agregarBoton = document.createElement("button");
    agregarBoton.className = "btn btn-primary";
    agregarBoton.textContent = "Agregar al carrito";
    agregarBoton.addEventListener("click", function () {
      agregarAlCarrito(producto);
    });

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardPrecio);
    cardBody.appendChild(agregarBoton);
    elementoProducto.appendChild(cardImg);
    elementoProducto.appendChild(cardBody);
    contenedorProductos.appendChild(elementoProducto);
  });
}

/* Función para agregar un producto al carrito */
function agregarAlCarrito(producto) {
  var productoExistente = carrito.find(function (item) {
    return item.nombre === producto.nombre;
  });

  /* Para no agregar otra vez un producto */
  if (productoExistente) {
    console.log("El producto ya está en el carrito");
    return;
  }

  producto.cantidad = 1;
  carrito.push(producto);

  actualizarCarrito();
}

/* Función para actualizar el contenido del carrito en el HTML */
function actualizarCarrito() {
  var contenedorCarrito = document.getElementById("carrito");
  contenedorCarrito.innerHTML = "";

  var total = 0;

  carrito.forEach(function (producto) {
    var elementoProducto = document.createElement("div");
    elementoProducto.className = "producto-carrito";

    var nombreProducto = document.createElement("p");
    nombreProducto.textContent = producto.nombre;

    var precioProducto = document.createElement("p");
    precioProducto.textContent = "Precio: $" + producto.Precio;

    var cantidadProducto = document.createElement("input");
    cantidadProducto.type = "number";
    cantidadProducto.value = 1;
    cantidadProducto.min = 1;
    cantidadProducto.max = 4;
    cantidadProducto.addEventListener("input", function () {
      actualizarCantidad(producto, parseInt(cantidadProducto.value));
    });

    var botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", function () {
      eliminarDelCarrito(producto);
    });

    var subtotal = parseInt(producto.Precio.substring(1)) * producto.cantidad;
    producto.subtotal = subtotal;
    total += subtotal;

    elementoProducto.appendChild(nombreProducto);
    elementoProducto.appendChild(precioProducto);
    elementoProducto.appendChild(cantidadProducto);
    elementoProducto.appendChild(botonEliminar);
    contenedorCarrito.appendChild(elementoProducto);
  });

  var totalCarrito = document.createElement("p");
  totalCarrito.textContent = "Total: $" + total;
  contenedorCarrito.appendChild(totalCarrito);
}

/* Función para actualizar la cantidad de un producto en el carrito */
function aumentarCantidad(producto) {
  carrito.forEach(function (item) {
    if (item === producto) {
      item.cantidad++;
      item.total = item.precio * item.cantidad;
    }
  });

  actualizarCarrito();
}

/* Función para eliminar un producto del carrito */
function eliminarDelCarrito(producto) {
  var indice = carrito.indexOf(producto);
  if (indice !== -1) {
    carrito.splice(indice, 1);
  }

  actualizarCarrito();
}

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
  var fechaLlegada = document.getElementById("fecha-llegada").value;
  var numBicicletas = document.getElementById("N° Bicicletas").value;
  var comentarios = document.getElementById("comentarios").value;

  /* Almacenar los valores en localStorage */
  localStorage.setItem("nombre", nombre);
  localStorage.setItem("email", email);
  localStorage.setItem("telefono", telefono);
  localStorage.setItem("fechaLlegada", fechaLlegada);
  localStorage.setItem("numBicicletas", numBicicletas);
  localStorage.setItem("comentarios", comentarios);

  /* Mostrar Mensaje en el localstorage */
  console.log("Datos almacenados");
});

// Mostrar todos los productos al cargar la página
mostrarProductos(productos);

function aplicarFiltro() {
  var checkboxes = document.getElementsByName("categoria");
  var categoriasSeleccionadas = Array.from(checkboxes)
    .filter(function (checkbox) {
      return checkbox.checked;
    })
    .map(function (checkbox) {
      return checkbox.value;
    });

  var productosFiltrados;

  if (categoriasSeleccionadas.length === 0) {
    productosFiltrados = productos;
  } else {
    productosFiltrados = productos.filter(function (producto) {
      return categoriasSeleccionadas.includes(producto.categoria);
    });
  }

  mostrarProductos(productosFiltrados);
}
