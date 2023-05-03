/* console.log("Hola estoy aprendiendo a usar js"); */

/* POP UP */

let kmRecorridos = prompt(
  "Hola, ¿Para poder asesorarte mejor cuántos kilómetros recorriste el año pasado?"
);

if (kmRecorridos < 1000) {
  console.log("Es posible que una mantención al año sea suficiente.");
} else if (kmRecorridos >= 1000 && kmRecorridos <= 5000) {
  console.log("Se recomienda realizar dos mantenciones al año.");
} else {
  console.log(
    "Puede ser necesario realizar hasta tres mantenciones al año para mantener tu bicicleta en buen estado."
  );
}

/* Variables */
let serviciosSeleccionados = [];
let total = 0;
let descuento = 0;
let carrito = 0;

/* Objetos */
const serviciosDisponibles = {
  mantencionBasica: {
    nombre: "Mantencion Basica",
    descripcion:
      "Lubricación de cadena y componentes móviles, ajuste de frenos, verificación de los tornillos y pernos, ajuste de la presión de los neumáticos, limpieza general y verificación de los radios de las ruedas",
    precio: 35000,
  },
  mantencionIntermedia: {
    nombre: "Mantencion Intermedia",
    descripcion:
      "Reemplazo de cables y fundas de frenos y cambios, ajuste de la tensión de los radios, ajuste de la caja de pedalier, reemplazo de pastillas de freno y/o discos, ajuste de la suspensión y limpieza y engrase de los componentes de la dirección",
    precio: 45000,
  },
  MantencionFull: {
    nombre: "Mantencion FULL",
    descripcion:
      "limpieza completa, reemplazo y ajuste de componentes como cables, frenos y transmisión, ajuste de caja de pedalier y rodamientos, inspección completa de frenos y cambios, ajuste y lubricación de suspensión y dirección, verificación de neumáticos y aplicación de protección.",
    precio: 55000,
  },
};

console.log(serviciosDisponibles)

/* Función para mostrar las opciones */
function mostrarOpciones(mensaje) {
  let opcionSeleccionada;

  do {
    opcionSeleccionada = prompt(`
      Por favor seleccione una opción:
      1. Mantencion Basica ($35000)
      2. Mantencion Intermedia ($45000)
      3. Mantencion Avanzada ($55000)
      4. Salir
    `);

    switch (opcionSeleccionada) {
      case "1":
        total += serviciosDisponibles.mantencionBasica.precio;
        agregarServicioAlCarrito("mantencionBasica");
        break;
      case "2":
        total += serviciosDisponibles.mantencionIntermedia.precio;
        agregarServicioAlCarrito("mantencionIntermedia");
        break;
      case "3":
        total += serviciosDisponibles.MantencionFull.precio;
        agregarServicioAlCarrito("MantencionFull");
        break;
      case "4":
        return;
      default:
        alert("Opcion No Valida");
    }
    alert(`El total a pagar es: $${total}`);

    if (total > 50000) {
      descuento = total * 0.15;
      alert(`¡Felicidades! Has ganado un descuento del 15%.`);
      alert(`El descuento es de $${descuento}.`);
      alert(`El total a pagar con descuento es de $${total - descuento}.`);
    }
  } while (true);
}

function agregarServicioAlCarrito(nombre) {
  serviciosSeleccionados.push(nombre);
  carrito += 1;
}

mostrarOpciones();
