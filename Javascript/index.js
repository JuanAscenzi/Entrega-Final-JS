//Todas las constantes creadas para llamarlas con los getElementById.
const contenedorProductos = document.getElementById("cards");
const boton = document.getElementById("boton");
const inputAfter = document.getElementById("inputAfter");
const botonInput = document.getElementById("botonInput");
const botonVaciar = document.getElementById("botonVaciar");
const listaProductosComprados = document.getElementById("listaProductosComprados");



//Carrito vacio para pushearle objetos.
let carrito = [];


//Function nueva con objetos del array en "data.json".
function nuevaCanilla(id, nombre, precio, imagen){
    this.id = id,
    this.nombre =nombre,
    this.precio = precio,
    this.imagen = imagen
};


//Declaracion variable comprar y agregado de la funcion con arrow function. Operadores de 3 tipos para optimizar el codigo.
const comprar = (canilla) =>{        
    let productoComprado = carrito.find(item => {
                        return item.id === canilla.id
})
                productoComprado == undefined 
                ? carrito.push({ ...canilla, cantidad: 1 }) 
                : (productoComprado.precio = productoComprado.precio + canilla.precio,
                productoComprado.cantidad++);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                Swal.fire({
                  title: "Usted compro " +canilla.nombre,
                 confirmButtonText: "Aceptar",
               })};
             ;
;

//Variable canillas con fetch y then para traer el array desde data.json.
let canillas
fetch("./Json/data.json")
.then((response) => response.json())
  .then((data) => {
    data.forEach((nuevaCanilla) => {
      const { id, nombre, precio, imagen } = nuevaCanilla;
      const div = document.createElement("div");
      div.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${imagen}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-title">$${precio}</p>
            <button class= btn id=${id}>Comprar</button>
        </div>
    </div>`;
    contenedorProductos.appendChild(div);
    const boton = document.getElementById(id);
    boton.addEventListener("click", () => comprar(nuevaCanilla))
    canillas=data
  });
});


//Buscador de canillas funcional. Mi problema es que si no aclaro que sea la de 50 lts busca automaticamente la de 30, pero ambas se pueden econtrar.
const buscadorCanillas = (search) => {
	search = search.toLowerCase()
	let buscadorCanillas = canillas.find(canillas => canillas.nombre.toLowerCase().includes(search));
	alert(buscadorCanillas.nombre);
	inputAfter.value = ``
}

//Todos los addEventListener para los respectivos botones y sus funciones.
listaProductosComprados.addEventListener("click",() => console.log(carrito))
botonInput.addEventListener("click",() => buscadorCanillas(inputAfter.value));
botonVaciar.addEventListener("click", () => localStorage.clear(carrito))
botonVaciar.addEventListener("click", () => {
  Swal.fire({
     title: "Carrito vacío",
    confirmButtonText: "Aceptar",
  })});


  /*Profesor disculpe el horario de entrega, esto es lo mas lindo que lo pude dejar, funciona todo lo que me pide la consigna, ante cualquier duda obvio espero su respuesta,
  logre que por alert muestre los elementos buscados pero seguro usandolo vera el error de que si toca solo el buscador encuentra al de primer id y etc, pero con aclarar el 50 de los litros
  encuentra todos porque bueno funciona bien pero tiene ese detalle. Por SweeetAlert como libreria muestra el objeto comprado y tambien cuando el carrito se vacia, obviamente los botones funcionan
  pero hay que verlos por la inspeccion, en la consola y application. Tuve que crear hoy a las apuradas una carpeta con imagenes y editarlas porque las que tenia en uso las habia sacado de 
  Facebook y a usted no le iban a aprecer uno de los chicos del curso me comento por donde usted lo va a ver mi repositorio y tuve que agilizar con ese tema. Me gustaria haberlo dejado mas 
  prolijo pero este es el primer curso que hago, tendre que hacer el de desarrollo web como minimo de manera online porque me anote sin saber que era un requisito,
   las clases estuvieron muy buenas gracias a ustede y a todos los tutores se agradece muchisimo. Estoy a la espera de su devolucion desde ya muchas gracias y buena semana.*/