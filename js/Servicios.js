/* console.log("Hola estoy aprendiendo a usar js"); */

const kmRecorridos = prompt("Para asesorarte mejor ingresa tus km recorridos");

let recomendacion = " ";

if (kmRecorridos < 500) {
  recomendacion =
    "Es recomendable llevar la bicicleta a un taller al menos una vez al año para asegurarse de que esté en buen estado y hacer cualquier reparación necesaria.";
} else if (kmRecorridos >= 500 && kmRecorridos < 2000) {
  recomendacion =
    "Es recomendable llevar la bicicleta a un taller al menos dos veces al año para asegurarse de que esté en buen estado y hacer cualquier reparación necesaria.";
} else if (kmRecorridos >= 2000 && kmRecorridos < 5000) {
  recomendacion =
    "Es recomendable llevar la bicicleta a un taller al menos tres veces al año para asegurarse de que esté en buen estado y hacer cualquier reparación necesaria.";
} else {
  recomendacion =
    "Es recomendable llevar la bicicleta a un taller al menos cuatro veces al año para asegurarse de que esté en buen estado y hacer cualquier reparación necesaria.";
}

console.log(`El total a pagar por los servicios solicitados es de ${total}.`);

// Valor para cada servicio
const servicios = {
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
  const servicio = prompt(
    "Introduce el nombre del servicio que necesitas (o 'out' para salir):"
  );

  if (servicio === "out") {
    break;
  }

  if (servicios[servicio]) {
    total += servicios[servicio];
    console.log(
      `Has añadido el servicio de ${servicio}. El total actual es de ${total}.`
    );
  } else {
    alert(
      `El servicio de ${servicio} no existe. Por favor, introduce un servicio válido.`
    );
  }
}

console.log(`El total a pagar por los servicios solicitados es de ${total}.`);
