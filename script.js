// Función constructora "Usuario" con parámetros nombre y clave
function Usuario(nombre, clave) {
    this.nombre = nombre;
    this.clave = clave;

    // Método "validarDatos" -> compara usuario y clave con los almacenados en "Usuario"
    this.validarDatos = function (usuario, clave) {
        return usuario === this.nombre && clave === this.clave;
    };
}

// Array que tiene tres usuarios válidos con sus respectivas claves (instancias de la función construcora "Usuario")
const usuariosValidos = [
    new Usuario("usuario1", "clave1"),
    new Usuario("usuario2", "clave2"),
    new Usuario("usuario3", "clave3")
];

// Comprobamos que los campos no estén vacíos
const validarCampos = (usuario, clave) => usuario !== "" && clave !== "";

// Se solicita al usuario que ingrese nombre de usuario y clave con un prompt
const ingresarDatos = () => {
    let usuario = prompt("Ingrese su nombre de usuario.");
    let clave = prompt("Ingrese su clave.");

    return { usuario, clave }; // Se devuelven como un objeto
};

const mostrarMensaje = mensaje => alert(mensaje);

// Función "validarDatos" con parámetros usuario, clave y usuariosValidos.
function validarDatos(usuario, clave, usuariosValidos) {
    return usuariosValidos.find(u => u.validarDatos(usuario, clave)) !== undefined;
    // Recorre cada elemento del array y devuelve el primer elemento que cumple con la condición
    // Utilizo el parámetro "u" como una abreviatura de "usuario" (así como i es de index)
    // Utilizo operador de negación y desigualdad estricta (para verificar que el resultado de find no sea undefined)
}

function validarFormulario() {
    // Llama a la función ingresarDatos para obtener los datos de usuario y clave
    let datos = ingresarDatos();
    let { usuario, clave } = datos;

    // Verifica si los campos están completos
    while (!validarCampos(usuario, clave)) {
        mostrarMensaje("Por favor, complete todos los campos."); // Si no están completos
        datos = ingresarDatos(); // Llama a la función "ingresarDatos" (se repite hasta que se cumpla una condición, porque es un while)
        usuario = datos.usuario;
        clave = datos.clave;
    }

    // Llama a la función "validarDatos" para verificar los datos
    if (validarDatos(usuario, clave, usuariosValidos)) {
        mostrarMensaje("¡Ingresó correctamente!"); // Si los datos son correctos
        console.log("El usuario ingresó al sitio.")
        return true;
    } else {
        mostrarMensaje("Usuario o clave incorrectos."); // Si los datos son incorrectos
        return false;
    }
}

let intentos = []; // Array que almacena resultados de los intentos (true or false)
let validacion = false;

while (intentos.length < 3 && validacion === false) { // Utilizamos la propiedad .length para verificar la longitud del array "intentos". Si el número de intentos es menor que 3 (y la validación sea false) continúa con el ciclo while
    validacion = validarFormulario();
    intentos.push(validacion);

    if (intentos.length < 3 && validacion === false) {
        mostrarMensaje("Le quedan " + (3 - intentos.length) + " intento(s). Por favor, inténtelo nuevamente."); // Utilizamos .length para calcular la cantidad de intentos restantes (3 - la cantidad de intentos registrados)
    }
}

if (validacion === false) {
    mostrarMensaje("Ha agotado el número máximo de intentos. Por favor, inténtelo más tarde.");
    console.log("El usuario agotó el número máximo de intentos para ingresar al sitio.")
}