///definicion de constantes y variables
const STOCK = `database/stock.json`
const contenedorProductos = document.querySelector("#containerProductos")

const selectorProductos = document.querySelector("#selectorProductos")

let carrito = []

const itemsCarrito = document.getElementById('items')
const footerCarrito = document.getElementById('carritoFooter')
const templateFooter = document.getElementById('templateFooter').content
const fragment = document.createDocumentFragment()


//API
document.addEventListener('DOMContentLoaded', () => {
    obtenerContenido(STOCK)
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})
const obtenerContenido = (STOCK) => {
    //obtener productos
    fetch(STOCK)
        .then(res => res.json())
        .then(response => {
            pintarProductos(response)
            detectarBotones(response)
            //filtrar productos
            selectorProductos.addEventListener('change', () => {
                if (selectorProductos.value == 'all') {
                    pintarProductos(response)
                    detectarBotones(response)
                }
                else {
                    let productosFiltrados = response.filter(elemento => elemento.producto === selectorProductos.value)
                    pintarProductos(productosFiltrados)
                    detectarBotones(response)
                }
            })
        })
}

//pintar productos
const pintarProductos = (response) => {
    contenedorProductos.innerHTML = ""
    response.forEach(element => {
        contenedorProductos.innerHTML +=
            `<div class="col container-fluid">
            <div class="card productoCard" style="width: 18rem;">
                <div class="card-body text-center">
                    <img src=${element.img} class="card-img-top img-fluid" alt="...">
                    <h5 class="card-title text-center">${element.title}</h5>
                    <p clas s="card-text text-break text-center">${element.desc}</p>
                    <span>$USD</span><h6 class="card-text text-center fw-bold">${element.precio}</h6>
                    <button id="${element.id}" class="botonAgregar btn btn-outline-dark">Agregar al Carrito</button>
                </div>
            </div>
        </div>`
    });
}

//detectar boton de compra
const detectarBotones = (response) => {
    const botones = document.querySelectorAll('.botonAgregar')
    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = response.find(item => item.id === parseInt(btn.id))
            agregarProducto(producto)
        })
    })
}

const agregarProducto = (producto) => {
    const prodCantidad = document.querySelectorAll("#prodCantidad")
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === producto.id) {
            carrito[i].cantidad++
            pintarCarrito(carrito)
            return null;
        }
    }
    carrito.push(producto)
    pintarCarrito(producto)
}

const pintarCarrito = (producto) => {
    itemsCarrito.innerHTML = ""
    carrito.map(item => {
        if(item.cantidad > 0){
            const tr = document.createElement('tr')
            tr.classList.add('itemCarrito')
            const content = `                    
            <th scope="row" id="prodCantidad">${item.cantidad}</th>
            <td id="prodTitulo">${item.title}</td>
            <td>
            <button id="botonSumar" class="btn btn-outline-dark btn-sm" data-id="${item.id}">
                +
            </button>
            <button id="botonRestar" class="btn botonRestar btn-danger btn-sm" data-id="${item.id}">
                -
            </button>
            </td>
            <td>$USD <span id="precio">${item.precio * item.cantidad}</span></td>`
            tr.innerHTML = content
            itemsCarrito.appendChild(tr)
            accionBotones(item)
        }
    })
    pintarFooter()
    actualizarCarrito(carrito)
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
    footerCarrito.innerHTML = ''
    if (carrito.length === 0) {
        const carritoVacio = ()=>{
            footerCarrito.innerHTML =
            `<p class="text-danger">El carrito esta vacio!</p>
        <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Volver</button>`
        }
        carritoVacio()
        return
    }
    const precioFinal = carrito.reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)
    templateFooter.getElementById('precioTotal').textContent = precioFinal

    const agregarAlFooter = templateFooter.cloneNode(true)
    fragment.appendChild(agregarAlFooter)
    footerCarrito.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciarCarrito')
    btnVaciar.addEventListener('click', () => {
        carrito = []
        pintarCarrito()
    })
}

const accionBotones = (item) => {
    botonSumar = document.querySelectorAll("#items #botonSumar")
    botonRestar = document.querySelectorAll("#items #botonRestar")

    botonSumar.forEach(btn =>{
        btn.addEventListener('click', ()=>{
            if(btn.dataset.id == item.id){
                item.cantidad++
                pintarCarrito()
            }
        })
    })
    botonRestar.forEach(btn =>{
        btn.addEventListener('click', ()=>{
            if(btn.dataset.id == item.id){
                item.cantidad--
            }
            pintarCarrito(item)
        })
    })
}

const actualizarCarrito = (carrito) => {
    const totalProductos = carrito.reduce((acc, {cantidad})=> acc + cantidad,0)
    const contadorCarrito = document.getElementById("contadorCarrito").textContent = totalProductos
}