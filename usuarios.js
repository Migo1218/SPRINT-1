let nombre = document.getElementById("btnNombre")
let telefono = document.getElementById("btnTelefono")
let correo = document.getElementById("btnCorreo")
let btnGuardar = document.getElementById("btnGuardar")
let btnActualizar = document.getElementById("btnActualizar")
let btnBuscar = document.getElementById("btnBuscar")
let borrar = document.getElementById("borrar")

const peticion = 'https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=f3cb710ccf9761e78278185874899538&page=1&vote_count.gte=1000&language=en-US';
const menosvalor = 'https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.asc&api_key=f3cb710ccf9761e78278185874899538&page=1&vote_count.gte=1000&language=en-US';

let url = "http://localhost:6001/usuarios/"

//BOTÓN GUARDAR

btnGuardar.addEventListener("click", async () => {

    let nombre = document.getElementById("btnNombre").value
    let telefono = document.getElementById("btnTelefono").value
    let correo = document.getElementById("btnCorreo").value


    if (nombre.length < 1 || telefono.length < 1 || correo.length < 1) {
        alert("Todos los campos son requeridos")
        return
    } else {


        const array = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                nombre,
                telefono,
                correo
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })


        console.log(array)
    }

})

//BOTÓN ACTUALIZAR

btnActualizar.addEventListener("click", async () => {

    let nombre = document.getElementById("btnNombre").value
    let telefono = document.getElementById("btnTelefono").value
    let correo = document.getElementById("btnCorreo").value
    let id = document.getElementById("id").value


    if (nombre.length < 1 || telefono.length < 1 || correo.length < 1) {
        alert("Todos los campos son requeridos")
        return
    }
    const actualizar = await fetch(url + id, {
        method: "PUT",
        body: JSON.stringify({
            nombre,
            telefono,
            correo,
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
})

//BOTÓN BUSCAR

btnBuscar.addEventListener("click", async () => {



    let email = document.getElementById("btnCorreo").value

    const datos = await fetch(url)
    const data = await datos.json()

    const busqueda = data.find(usuarios => usuarios.correo === email)
    console.log(busqueda)

    const { nombre, telefono, correo, id } = busqueda

    document.getElementById("btnNombre").value = nombre
    document.getElementById("btnTelefono").value = telefono
    document.getElementById("id").value = id


})

//BOTÓN BORRAR


borrar.addEventListener("click", () => {
    
    const identidicador = document.getElementById("id").value
    
    fetch(url + identidicador, {
        method: "DELETE"
    })

})









