//Creo todas las constantes  para llamarlas con los getElementById
const contenedorProductos = document.getElementById("cards");
const boton = document.getElementById("boton");
const inputAfter = document.getElementById("inputAfter");
const botonInput = document.getElementById("botonInput");
const botonVaciar = document.getElementById("botonVaciar");
const listaProductosComprados = document.getElementById("listaProductosComprados");

let carrito = [];

function nuevaCanilla(id, nombre, precio, imagen){
    this.id = id,
    this.nombre =nombre,
    this.precio = precio,
    this.imagen = imagen
};

//Aca con un arrow function establecemos que el productoComprado sea el item seleccionado y con operadores simplifique el if y el else
// decidiendo que segun la condicion se ejecute, tambien el ...canillas y el productoComprado.cantidad++ son operadores para simplificar
/*const comprar = (canilla) => {
    let productoComprado = carrito.find((item) => item.id === canillas.id);
        if (productoComprado === undefined) {
            carrito.push({
            id: canillas.id,
            nombre: canillas.nombre,
            precio: canillas.precio,
            imagen: canillas.imagen,
            cantidad: 1,
        });
        } else {
            productoComprado.precio = productoComprado.precio + canillas.precio;
            productoComprado.cantidad = productoComprado.cantidad + 1;
        }
    };*/
    
const comprar = (canilla) =>{
    Toastify({
        text: "Agregado al carrito",
        gravity: "bottom",
        className: "info",
        style: {
                background: "8758FF",
        }
        }).showToast();           
    let productoComprado = carrito.find(item => {
                        return item.id === canilla.id
})
                productoComprado == undefined 
                ? carrito.push({ ...canilla, cantidad: 1 }) 
                : (productoComprado.precio = productoComprado.precio + canilla.precio,
                productoComprado.cantidad++);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                console.log(canilla);
};




//renderizador con forEach pude poner ahora un const con id,imagen,etc para luego unicamente llamrlo por su nombre creo que se puede hacer mas lindo agregandole cosas pero no se casi nada de css
let canillas
fetch("../data.json")
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

const actualizarCarrito = () => {
    carrito.length = 0
    actualizarCarrito()
}

//Creo un buscador de canillas con un arrow function
const buscadorCanillas = (search) => {
	search = search.toLowerCase()
	let buscadorCanillas = canillas.find(canillas => canillas.nombre.toLowerCase().includes(search));
	console.log(buscadorCanillas.nombre);
	inputAfter.value = ``
}

listaProductosComprados.addEventListener("click",() => console.log(carrito))
botonInput.addEventListener("click",() => buscadorCanillas(inputAfter.value));
botonVaciar.addEventListener("click", () => localStorage.clear(carrito))
botonVaciar.addEventListener("click", () => {carrito.length = 0 && Swal.fire({
        title: 'Seguro que desea vaciar el carrito?',
        showDenyButton: true,
        confirmButtonText: 'Vaciar',
        denyButtonText: `Cancelar`,
        }).then((result) => {
        if (result.isDenied) {
        } else if (result.isConfirmed) {
                Swal.fire('Carrito vaciado')
        }
        })})
        
/*botonVaciar.addEventListener("click" , () => {
        carrito.length = 0
        actualizarCarrito(
)
})*/ 