/************************************************ CONSTANTES **********************************************/
const cards = document.getElementById("cards");
const listado = document.getElementById("listado");
const templateCard = document.getElementById("template-card").content;
const footer = document.getElementById("footer");
const templateCarrito = document.getElementById("template-carrito").content;
const templateFooter = document.getElementById("template-footer").content;
const fragment = document.createDocumentFragment();
let carrito = {};

/*************************************************** EVENTOS **********************************************/
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

cards.addEventListener("click", (e) => {
  traerAlCarrito(e);
});

listado.addEventListener("click", (e) => {
  agregarDisminuir(e);
});

/***************************************** TRAER INFO DEL ARCHIVO JSON ************************************/
const fetchData = async () => {
  try {
    const res = await fetch("../js/data.json");
    const data = await res.json();
    traerProductosJson(data);
    /* console.log(data) */
  } catch (error) {
    console.log(error);
  }
};

/***************************************** MOSTRAR PRODUCTOS TRAIDOS DEL JSON *******************************/
const traerProductosJson = (data) => {
  data.forEach((producto) => {
    templateCard.querySelector("h5").textContent = producto.nombre;
    templateCard.querySelector("p").textContent = producto.precio;
    templateCard.querySelector("img").setAttribute("src", producto.ImagenURL);
    templateCard.querySelector(".btn-primary").dataset.id = producto.id;

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

/******************************************** FILTRO DE PRODUCTOS  *******************************************/
const filtroBtns = document.querySelectorAll(".button-value");
filtroBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filtroBtns.forEach((btn) => btn.classList.remove("active"));

    // Agregar la clase 'active' al botón seleccionado
    btn.classList.add("active");

    const categoria = btn.dataset.categoria;
    filtrarProducto(categoria);
  });
});

//mostrar todos los productos al abrir la pagina
window.onload = () => {
  filtrarProducto("all");
};

/******************************************** TRAER AL CARRITO Y AGREGAR ************************************************/
const traerAlCarrito = (e) => {
  if (e.target.classList.contains("btn-primary")) {
    agregarProducto(e.target.parentElement);
  }
  e.stopPropagation();
};

const agregarProducto = (objeto) => {
  const producto = {
    id: objeto.querySelector(".btn-primary").dataset.id,
    nombre: objeto.querySelector("h5").textContent,
    precio: objeto.querySelector("p").textContent,
    cantidad: 1,
  };

  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }

  carrito[producto.id] = { ...producto };
  mostrarInfo();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: `<i class="fas fa-shopping-cart"></i> ${producto.nombre} ${producto.precio}
     Agregado al carrito`,
    showConfirmButton: false,
    timer: 2000,
  });
};

const mostrarInfo = () => {
  console.log(carrito);

  listado.innerHTML = "";
  Object.values(carrito).forEach((producto) => {
    templateCarrito.querySelector("th").textContent = producto.id;
    templateCarrito.querySelectorAll("td")[0].textContent = producto.nombre;
    templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;
    templateCarrito.querySelector(".btn-info").dataset.id = producto.id;
    templateCarrito.querySelector(".btn-danger").dataset.id = producto.id;
    templateCarrito.querySelector("span").textContent =
      producto.cantidad * producto.precio;
    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });

  listado.appendChild(fragment);

  pintarFooter();
};

/********************************* SUMAR, RESTAR Y AGREGAR MAS PRODUCTOS AL CARRITO *********************************/

const pintarFooter = () => {
  footer.innerHTML = "";
  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = '<th scope="row" colspan="5">Carrito vacío</th>';
    return;
  }

  // sumar cantidad y sumar totales
  const cantidadProductos = Object.values(carrito).reduce(
    (acumular, { cantidad }) => acumular + cantidad,
    0
  );
  const precioTotal = Object.values(carrito).reduce(
    (acumular, { cantidad, precio }) => acumular + cantidad * precio,
    0
  );
  // console.log(precioTotal)

  templateFooter.querySelectorAll("td")[0].textContent = cantidadProductos;
  templateFooter.querySelector("span").textContent = precioTotal;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);

  footer.appendChild(fragment);

  // Agregar evento al botón "Comprar Carrito"
  const comprarCarritoBtn = document.getElementById("comprar-Carrito");
  comprarCarritoBtn.addEventListener("click", comprarCarrito);

  // Función para comprar el carrito
  function comprarCarrito() {
    // Verificar si el carrito está vacío
    if (Object.keys(carrito).length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Carrito vacío",
        text: "Agrega productos al carrito antes de comprar",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
  }

  const boton = document.querySelector("#vaciar-carrito");
  boton.addEventListener("click", () => {
    carrito = {};
    mostrarInfo();

    Swal.fire({
      title: "Estas Seguro?",
      text: "Necesitas ayuda?, puedes contactarnos!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        carrito[producto.id] = { ...producto };
        mostrarInfo();

        Swal.fire({
          icon: "Eliminado!",
          title: "Carrito Vacio.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  });
};

const agregarDisminuir = (e) => {
  if (e.target.classList.contains("btn-info")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad++;
    carrito[e.target.dataset.id] = { ...producto };
    mostrarInfo();
  }

  if (e.target.classList.contains("btn-danger")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad--;
    if (producto.cantidad === 0) {
      delete carrito[e.target.dataset.id];
    } else {
      carrito[e.target.dataset.id] = { ...producto };
    }
    mostrarInfo();
  }
  e.stopPropagation();
};

/********************************************* OBTENER INFORMACION DEL FORMULARIO ***********************************/

var formulario = document.getElementById("formulariocontacto");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  var nombre = document.getElementById("nombre").value;
  var email = document.getElementById("email").value;
  var telefono = document.getElementById("telefono").value;
  var comentarios = document.getElementById("comentarios").value;

  // Verificar si todos los campos están completos antes de almacenar los valores
  if (nombre && email && telefono && comentarios) {
    /* Almacenar los valores en localStorage */
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("email", email);
    localStorage.setItem("telefono", telefono);
    localStorage.setItem("comentarios", comentarios);

    /* Mostrar mensaje de éxito en el localStorage */
    console.log("Datos almacenados correctamente");
  } else {
    /* Mostrar mensaje de error en el localStorage si faltan campos */
    console.log("Por favor, complete todos los campos");
  }
});
