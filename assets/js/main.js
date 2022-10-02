let categoriasContend = document.getElementById("categorias");
let contenidoCartaIndex = document.getElementById("contenido-index");
let buscadorText = ""; //variable para el buscador
let arrayChecks = [""]; //array de los checks
let arrayCartas = data.events; //array de las cartas



mostrasDatos();

// ----------------------------------------------- M O S T R A R  D A T O S ----------------------------------------------
function mostrasDatos() {
  agregarChecks();
  buscador();
  chekeds();
  combinacionDeFiltros();
}

// ----------------------------------------------- B U S C A D O R ----------------------------------------------

//para leer que escribo en el buscador

function buscador() {
  let form = document.querySelector("form");
  // Para detener el comportamiento por defecto del formulario
  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
  });
  
  let buscador = document.getElementById("buscador");
  buscador.addEventListener("keyup", (evento) => {
    let dataInput = evento.target.value;
    buscadorText = dataInput.toLowerCase();
    combinacionDeFiltros();
  });
  return buscadorText;
}


// ----------------------------------------------- C A T E G O R I A S ----------------------------------------------
//primero busca categorias y despues las muestra
function agregarChecks() {
  let arrayCategorias = [];
  data.events.forEach((evento) => {
    if (!arrayCategorias.includes(evento.category)) {
      arrayCategorias.push(evento.category);
    }
  });
  arrayCategorias.forEach((categoria) => {
    let divContainer = document.createElement("div");
    divContainer.className = "contenedor__check";
    divContainer.innerHTML = `<input type="checkbox" name="${categoria}" id="${
      categoria.split(" ")[0]
    }" value="${categoria}">
      <label for="${categoria.replace(" ", "-")}">${categoria}</label>`;
    categoriasContend.appendChild(divContainer);
  });
}

// muestra por consola si esta checkeado algo
categoriasContend.addEventListener("change", () => {
  chekeds();
  console.log("algo cambio");
});

//muestra un array con los checkbox que estan checkeados
function chekeds() {
  let checkboxes = document.querySelectorAll("input[type=checkbox]");
  arrayChecks = Array.from(checkboxes).filter((check) => check.checked).map((check) => check.value);


  combinacionDeFiltros();
  return arrayChecks;
}

// ----------------------------------------------- F I L T R O ----------------------------------------------

function combinacionDeFiltros() {
  arrayEventFilter = [];
   //por defecto, que muestre todas las cartas
  if (arrayChecks.length == 0 && buscadorText == "") {
    arrayEventFilter = arrayCartas;

    
          //si hay algo en el buscador y en los checks
  } 
   if (arrayChecks.length > 0 && buscadorText !== "") {
    arrayChecks.forEach((categoria) => {
      arrayEventFilter.push(arrayCartas.filter((evento) =>evento.name.toLowerCase().includes(buscadorText.trim()) && evento.category == categoria));
    });


          //si hay algo en los checks y no en el buscador
  } 
   if (arrayChecks.length > 0 && buscadorText == "") {
    
    arrayChecks.forEach((categoria) => {
      arrayEventFilter.push(arrayCartas.filter((evento) => evento.category == categoria));
    });

          //si hay algo en el buscador y no en los checks
  } 
   if (arrayChecks.length == 0 && buscadorText !== "") {
    arrayEventFilter.push(arrayCartas.filter((evento) =>evento.name.toLowerCase().includes(buscadorText.trim())));
  }

  mostrarCartasFiltradas(arrayEventFilter.flat());
  
  console.log(arrayEventFilter);
}

//para mostrar en pantalla las cartas
function mostrarCartasFiltradas(arrayCart) {
  let ponerCarta = "";

  if (arrayCart.length > 0) {
    arrayCart.forEach((evento) => {
      ponerCarta+= `
    <div class="card card_tarjeta text-center">
        <img src=${evento.image} class="card-img-top img-card" alt="${evento.name}">
        <div class="card-body">
          <h5 class="card-title">${evento.name}</h5>
          <p class="card-text">${evento.description}</p>
          <div class="d-flex justify-content-between">
            <p>Price ##${evento.price}</p>
            <a href="assets/html/describe.html?id=${evento._id}" class="btn_m"><img class="btn_more" src="assets/img/btn.png" alt="btn"></a>
          </div>
        </div>
    </div>`;

      contenidoCartaIndex.innerHTML = ponerCarta;

    });
  } else {
    contenidoCartaIndex.innerHTML = `<div class="container__error"><img src="assets/img/404 Error with a cute animal-amico.svg" alt="img_error"> <br>
    <h2>Try again with another search 😿</h2></div>`;

  }
}


// ----------------------------------------------- BOTONCITO PARA IR ARRIBA ----------------------------------------------

window.onscroll = function(){
  if(document.documentElement.scrollTop>100){
    document.querySelector('.go-top-container').classList.add('show')
  }else{
    document.querySelector('.go-top-container').classList.remove('show')
  }
}

document.querySelector('.go-top-container').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

