//definiendo variables del formulario
const email = document.querySelector("#email")
const nombre = document.querySelector("#nombre")

const calle = document.querySelector("#calle")
const numDeCalle = document.querySelector("#numDeCalle")
const telefono = document.querySelector("#telefono")

const botonEnviar = document.getElementById("sumbit")


//guardar y recuperar datos enviados en el formulario
document.addEventListener('DOMContentLoaded', ()=>{
    recuperarDatos()
    swalCompra("")
})

submit.addEventListener('click', (datos)=>{
    datos.preventDefault
    datosGuardar()
    swalFinalizada("")
})


function datosGuardar(){
    const datosDelUsuario = {
        email: email.value,
        nombre: nombre.value,
        calle: calle.value,
        numDeCalle: numDeCalle.value,
        telefono: telefono.value
    }
    let datosJSON = JSON.stringify(datosDelUsuario)
    localStorage.setItem("datosDelUsuario", datosJSON )
}

function recuperarDatos(){
    if (localStorage.getItem("datosDelUsuario")){
        const datosDelUsuario = JSON.parse(localStorage.getItem("datosDelUsuario"))
        email.value = datosDelUsuario.email
        nombre.value = datosDelUsuario.nombre
        calle.value = datosDelUsuario.calle
        numDeCalle.value = datosDelUsuario.numDeCalle
        telefono.value = datosDelUsuario.telefono
    }
}

const swalCompra = ()=>{
    Swal.fire({
        title: 'Compra',
        text: 'Para efectuar su compra complete el formulario',
        icon: 'info',
        confirmButtonText: 'Entendido'
    })
}

const swalFinalizada = ()=>{
    Swal.fire({
        title: 'Compra',
        text: 'Gracias, Nos pondremos en contacto!',
        icon: 'success',
        confirmButtonText: 'Entendido'
    })
}