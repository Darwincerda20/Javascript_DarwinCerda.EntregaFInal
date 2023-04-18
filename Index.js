/* console.log("Hola estoy aprendiendo a usar js");
 */

const horaActual = new Date().getHours(); // Obtiene la hora actual del sistema

if (horaActual >= 9 && horaActual < 18) {
  console.log("El negocio está abierto");
} else {
  console.log("El negocio está cerrado");
}

const nombre = prompt("Ingresa tu nombre");
let mensaje = "";

if (horaActual >= 0 && horaActual < 12) {
  mensaje = "Buenos días";
} else if (horaActual >= 12 && horaActual < 18) {
  mensaje = "Buenas tardes";
} else {
  mensaje = "Buenas noches";
}

console.log(
  mensaje + ", " + nombre +". ¡Llegaste al lugar indicado, en caso de que necesites ayuda contactanos!");

