/* console.log("Hola estoy aprendiendo a usar js"); */

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

const SERVICIOS = {
  visita: 5000,
  regulacion: 6000,
  ajustefreno: 7000,
  sangrado: 15000,
  alineacion: 7000,
  maza: 20000,
  horquilla: 32000,
  mantencionbasica: 35000,
  mantencionintermedia: 45000,
  mantencionfull: 55000,
};

let total = 0;

while (true) {
  let serviciosDisponibles = "";
  for (const servicio in SERVICIOS) {
    serviciosDisponibles += `- ${servicio}: ${SERVICIOS[servicio]} CLP\n`;
  }

  const servicioSeleccionado = prompt(
    `Ingresa el nombre del servicio que necesitas (o 'out' para salir):
    
  Servicios disponibles:\n${serviciosDisponibles}\ `
  );

  if (servicioSeleccionado === "out") {
    break;
  }

  if (SERVICIOS[servicioSeleccionado]) {
    total += SERVICIOS[servicioSeleccionado];
    console.log(
      `Has añadido el servicio de ${servicioSeleccionado}. El total actual es de ${total}.`
    );
  } else {
    alert(
      `El servicio de ${servicioSeleccionado} no existe. Por favor, introduce un servicio válido.`
    );
  }
}

console.log(`El total a pagar por los servicios solicitados es de ${total}.`);
