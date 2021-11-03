const apiKey = "api_key=f3cb710ccf9761e78278185874899538";
const baseUrl = "https://api.themoviedb.org/3"
const apiUrl = baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey
const imagenUrl = 'https://image.tmdb.org/t/p/w1280'

const masValor = 'https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=f3cb710ccf9761e78278185874899538&page=1&vote_count.gte=1000&language=en-US';
const menosValor = 'https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.asc&api_key=f3cb710ccf9761e78278185874899538&page=1&vote_count.gte=1000&language=en-US';
const contenedor = document.getElementById("contenedor")
//const video = "https://api.themoviedb.org/3/movie/297762/videos?api_key=f3cb710ccf9761e78278185874899538&language=en-US"
let modal = document.getElementById("modal")


const obtenerDatos = async (url) => {
  const apiUrl = baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey
  const datosObtenidosApi = await fetch(apiUrl);
  const peliculas = await datosObtenidosApi.json()
  const { results } = peliculas;

  return results
}

//CONSTRUYENDO TARJETAS

const obtenerPeli = async () => {
  let data = await obtenerDatos()


  data.forEach(data => {
    //imagen slider
    const imagenSlider = imagenUrl + data.backdrop_path

    const div = document.getElementById("slider")
    div.innerHTML += `<div class="swiper-slide"><img src="${imagenSlider}"></div>`
    //inicio tarjetas

    const titulo = data.title;
    const imagen = imagenUrl + data.poster_path
    const descripcion = data.overview;
    const calificacion = data.vote_average;
    const id = data.id
    

    const contenedor = document.getElementById("contenedor")
    contenedor.innerHTML += `<div class="card movie" style="width: 18rem;">
        <img class="card-img-top" src="${imagen}" alt="Card image cap">
        <div class="card-body tarjeta">
          <h5 class="card-title">${titulo}</h5>
          <p class="card-text overview">${descripcion}</p>
          <a href="#" id="puntaje" class="btn btn-primary">${calificacion}</a>
          

    
          <!-- Button trigger modal -->
      <button type="button" id="id" data-id="${id}" class="btn btn-primary boton" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Descripción
      </button>
      
      `


  });
}
//CONSTRUCCION MODAL

contenedor.addEventListener("click", async (e) => {
  if (e.target.classList.contains('boton')) {

    let data = await obtenerDatos()
    console.log(data)
    const id1 = e.target.dataset.id


    let filtro = data.find(datos => datos.id == id1)
    let modal = document.getElementById("modal")
    const { title, overview, backdrop_path, id } = filtro
    let idModal = filtro.id
    console.log(idModal)
    modal.innerHTML = ` 
      <div class="modal-content">
      <div class="modal-header">
          <div class="modal-body">
              <img id="img1" src="${imagenUrl + backdrop_path}" alt="">
              <h1 id="h1">${title}</h1>
              <p>${overview}</p>
              <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button id="trailer" onclick="trailer('${idModal}')" type="button" class="btn btn-primary">Ver tráiler</button>
          </div>
          </div>
         
      </div>
  
  </div>

      `

  }
})

//TRAILER
const trailer = async (idModal) => {
  const url = `https://api.themoviedb.org/3/movie/${idModal}/videos?api_key=f3cb710ccf9761e78278185874899538&language=en-US`
  const datos = await fetch (url)
  const data = await datos.json()
  const video = data.results[0].key
  console.log(data)
  console.log(video)  
  modal.innerHTML=""
  modal.innerHTML = `
  <div class="modal-content">
  <div class="modal-header">
      <div class="modal-body">
          
      <iframe width="100%" height="300%"
   src="https://www.youtube.com/embed/${video}" title="YouTube video player" 
   frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
    gyroscope; picture-in-picture" allowfullscreen></iframe>

          <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
         
      </div>
      </div>
     
  </div>

</div>`
}





document.addEventListener('DOMContentLoaded', obtenerPeli);

//BUSQUEDA DE PALABRAS COINCIDENTES

let boton = document.getElementById("btnBuscar")
boton.addEventListener("click", async () => {
  buscarPelicula()
})

const buscarPelicula = async () => {
  let texto = document.getElementById("search").value
  let datos = await obtenerDatos()


  let buscar = datos.filter(datos => datos.title.toLowerCase() === texto.toLowerCase())



  contenedor.innerHTML = ""

  buscar.forEach(data => {

    //inicio tarjetas

    const titulo = data.title;
    const imagen = imagenUrl + data.poster_path
    const descripcion = data.overview;
    const calificacion = data.vote_average;

    const contenedor = document.getElementById("contenedor")
    contenedor.innerHTML += `<div class="card movie" style="width: 18rem;">
        <img class="card-img-top" src="${imagen}" alt="Card image cap">
        <div class="card-body tarjeta">
          <h5 class="card-title">${titulo}</h5>
          <p class="card-text overview">${descripcion}</p>
          <a href="#" class="btn btn-primary">${calificacion}</a>
        </div>
      </div>`


  });


}






//BOTONES SLIDER

var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//CONSTRUCCION MAS VALORADAS Y MENOS VALORADAS

//FILTRO MAS VALORADAS

let masVal = document.getElementById("masval")


masVal.addEventListener("click", async () => {
  const datos = await fetch(masValor)
  const data = await datos.json()
  console.log(data)
  const peliculas = data.results

  contenedor.innerHTML = ""

  peliculas.forEach(peliculas => {

    const { title, vote_average, backdrop_path, overview } = peliculas


    contenedor.innerHTML += `<div class="card movie" style="width: 18rem;">
       <img class="card-img-top" src="${imagenUrl + backdrop_path}" alt="Card image cap">
       <div class="card-body tarjeta">
         <h5 class="card-title">${title}</h5>
         <p class="card-text overview">${overview}</p>
         <a href="#" class="btn btn-primary">${vote_average}</a>
       </div>
     </div>`

  })
})

//MENOS VALORADAS

let menosVal = document.getElementById("menosval")


menosVal.addEventListener("click", async () => {
  const datos = await fetch(menosValor)
  const data = await datos.json()

  const peliculas = data.results

  contenedor.innerHTML = ""

  peliculas.forEach(peliculas => {

    const { title, vote_average, backdrop_path, overview } = peliculas


    contenedor.innerHTML +=
      `<div class="card movie" style="width: 18rem;">
       <img class="card-img-top" src="${imagenUrl + backdrop_path}" alt="Card image cap">
       <div class="card-body tarjeta">
         <h5 class="card-title">${title}</h5>
         <p class="card-text overview">${overview}</p>
         <a href="#" class="btn btn-primary">${vote_average}</a>
       </div>

     </div>`

  })
})
















