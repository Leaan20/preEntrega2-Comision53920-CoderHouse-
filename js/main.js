//Creamos una clase calzado que va a instanciar los objetos calzado
class Calzado {
    constructor(id, tipo, marca, nombre, precio, talle) {
        this.id = id;
        this.tipo = tipo;
        this.marca = marca;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.talle = talle;
    }
}

//deposito va a almacenar los objetos instaciados de la clase Calzado
const deposito = [
    new Calzado(1, "Zapatilla", "Jordan", "1 High grey", 120000, [38, 39, 40, 41, 42, 43, 44]),
    new Calzado(2, "Zapatilla", "Jordan", "1 Low red", 145000, [37, 38, 39, 40]),
    new Calzado(3, "Zapatilla", "Nike", "Sb Dunk Low purple", 160000, [40, 41, 42, 43]),
    new Calzado(4, "Zapatilla", "Adidas", "Rivalry white/blue", 153000, [38, 39, 42, 45]),
    new Calzado(5, "Zapatilla", "Adidas", "Forum Low white/black", 189000, [38, 40, 41, 42, 44]),
    new Calzado(6, "Zapatilla", "Nike", "Air Force 1 white", 200000, [40, 44, 46])
];

//Variable carrito que va a contener los productos elegidos
const carrito = [];
//constante envio que tiene un costo fijo, para luego ser calculado con un condicional
const envio = 3000;
//este va a contener el stock actualizado a partir de deposito.
const stockZapatillas = [];

//funcion que va a cargar el stock desde deposito.
function cargarStock(arr, productos) {
    for (let i = 0; i < productos.length; i++) {
        arr.push(productos[i]);
    }
}
//busqueda por nombre devuelve un array basado en la coincidencia que tenga ingreso.
function busquedaPorNombre(arr, ingreso) {
    return arr.filter((el) => el.nombre.toLowerCase().includes(ingreso.toLowerCase()));
}
//busqueda por marca
function busquedaPorMarca(arr, ingreso) {
    return arr.filter((el) => el.marca.toLowerCase().includes(ingreso.toLowerCase()));
}
//usamos una funcion con push para agregar al array carrito la zapatilla seleccionada.
function agregarProductosCarrito(arr, producto) {
    arr.push(producto);
}

function eliminarProductosCarrito(arr, eliminado) {
    if (eliminado === "1") {
        arr.shift();
    } else if (eliminado === "2") {
        arr.pop();
    }
}


function envioGratis(total) {
    if (total >= 155000) {
        alert("El monto de la compra supera los $155.000." + "\n" + "Tenes envio gratis");
    } else {
        alert(`El envío tiene un costo de $${envio}`);
        alert("El monto total de la compra es de  $" + (total + envio));
    }
}

//cargamos el stock de productos
cargarStock(stockZapatillas, deposito);

//Comienzo del simulador

//saludo de bienvenida
let bienvenida = alert("Bienvenido a Adike, nueva tienda online de zapatillas");

//variable ingreso que permite acceder al programa.
let ingreso = prompt("Elija entre las opciones disponibles:\n1- Busqueda por marca.\n2- Busqueda por nombre\n3- Comprar zapatilla\n4- Eliminar productos del carrito\n5- Finalizar compra\nPara salir presione x");

//Mientras el usuario no presione "x", seguira dentro del programa.
while (ingreso !== "x") {
    if (ingreso === "1") {
        let entrada = prompt("Ingrese la marca deseada:" + "\n" + "Adidas" + "\n" + "Nike" +  "\n" + "Jordan");

        let search = busquedaPorMarca(stockZapatillas, entrada);
        //usamos map para devolver un nuevo array. en caso de ser mas de un producto lo separamos uno debajo del otro con join y usando como conector el '\n' que hace un salto de linea.
        alert(search.map( (producto) => `${producto.nombre} - $${producto.precio}`).join('\n'));
    }
    else if (ingreso === "2") {
        let entrada = prompt("Ingrese el nombre del modelo para obtener mas informacion:" + "\n" + "1 High grey" + "\n" + "1 Low red" + "\n" + "Sb Dunk Low purple" + "\n" + "Rivalry white/blue" + "\n" + "Forum Low white/black" + "\n" + "Air Force 1 white");

        let search = busquedaPorNombre(stockZapatillas, entrada);

        if (search.length > 0) {
            //mostramos informacion de los productos consultados.
            alert(search.map((producto) => {
                return `marca: ${producto.marca} nombre: ${producto.nombre}, precio: $${producto.precio}, talles: ${producto.talle.join(', ')}`
            }).join('\n'));
        } else {
            alert("Producto no encontrado o no disponible en stock");
        }
    }
    else if (ingreso === "3") {
        let eleccion = prompt("De los modelos disponibles,  ¿Cuál queres comprar?" + "\n" + "1 High grey" + "\n" + "1 Low red" + "\n" + "Sb Dunk Low purple" + "\n" + "Rivalry white/blue" + "\n" + "Forum Low white/black" + "\n" + "Air Force 1 white");
        // para evitar que se ingrese un valor no valido
        if (eleccion !== null) {
            let elegido = busquedaPorNombre(stockZapatillas, eleccion);
            
            // intentamos verificar si se encontro el producto
            if (elegido.length > 0) {

                agregarProductosCarrito(carrito, elegido[0]);
                alert(`Se agrego ${elegido[0].nombre} al carrito.`);

            } else {
                alert("El producto no se encuentra en stock o no coincide con un modelo disponible. Por favor, inténtelo nuevamente.");
            }
        } else {
            alert("Operación cancelada.");
        }
    }
    else if (ingreso === "4") {
        let borrar = prompt("¿Qué producto queres eliminar?" + "\n" + "1- Primer producto del carrito" + "\n" + "2- Último producto del carrito");
        if(borrar != null){
            if(carrito.length != 0){
                eliminarProductosCarrito(carrito, borrar);
                alert("Producto eliminado del carrito.");
            } else {
                alert("No hay productos para borrar");
            }
            }
    }
    else if (ingreso === "5") {
        let totalCompra = carrito.reduce((total, producto) => total + producto.precio, 0);
        if(totalCompra != 0){
            alert(`El total de tu compra es: $${totalCompra}`);
    
            envioGratis(totalCompra);
            alert("Gracias por tu compra!");
        } else {
            alert("No hay productos en tu carrito");
        }
    }
    ingreso = prompt("Elija entre las opciones disponibles:\n1- Busqueda por marca.\n2- Busqueda por nombre\n3- Comprar zapatilla\n4- Eliminar productos del carrito\n5- Finalizar compra\nPara salir presione x");
}

let despedida = alert("Muchas gracias por utilizar nuestra página :D");