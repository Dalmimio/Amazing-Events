let categoriasContend = document.getElementById("categorias");
let contenido = document.getElementById("contenido");
let txtInput = document.getElementById("buscador");
let form = document.querySelector("form");
let contenedor = document.getElementById("main__describe");
let buscadorText = ""; //variable para el buscador
let arrayChecks = []; //array de los checks
let arrayCartas = []; //array de las cartas
let URL = "https://amazing-events.herokuapp.com/api/events"; // URL de la API
let arrayCategorias = [];
let date; //current date

traerDatos(URL);

// ----------------------------------------------- T R A E R  D A T O S ----------------------------------------------
function traerDatos(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      date = data.currentDate;

      if (document.title == "Home") {
        data.events.forEach((evento) => {
          if (!arrayCategorias.includes(evento.category)) {
            arrayCategorias.push(evento.category);
          }
          arrayCartas.push(evento);
        });
        agregarChecks(arrayCategorias);
        buscador();
        combinacionDeFiltros();
      } else if (document.title == "Upcomming Events") {
        data.events.forEach((evento) => {
          if (evento.date > date) {
            if (!arrayCategorias.includes(evento.category)) {
              arrayCategorias.push(evento.category);
            }
            arrayCartas.push(evento);
          }
        });
        agregarChecks(arrayCategorias);
        buscador();
        combinacionDeFiltros();
      } else if (document.title == "Past Events") {
        data.events.forEach((evento) => {
          if (evento.date < date) {
            if (!arrayCategorias.includes(evento.category)) {
              arrayCategorias.push(evento.category);
            }

            arrayCartas.push(evento);
          }
        });
        agregarChecks(arrayCategorias);
        buscador();
        combinacionDeFiltros();
      } else if (document.title == "Details") {
        let cadenaParametrosUrl = location.search;
        let parametros = new URLSearchParams(cadenaParametrosUrl);

        let id = parametros.get("id");

        let eventosFiltrados = data.events.filter((evento) => {
          return evento;
        });

        let eventoEncontrado = eventosFiltrados.find(
          (evento) => evento._id == id
        );
        pintarEvento(eventoEncontrado);
      }
    })
    .catch("Hubo un error");

  console.log(arrayCategorias);
  console.log(arrayCartas);
}

// ----------------------------------------------- B U S C A D O R ----------------------------------------------

//para leer que escribo en el buscador

function buscador() {
  // Para detener el comportamiento por defecto del formulario
  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
  });

  txtInput.addEventListener("keyup", (evento) => {
    let dataInput = evento.target.value;
    buscadorText = dataInput.toLowerCase();
    combinacionDeFiltros();
  });
}

// ----------------------------------------------- C A T E G O R I A S ----------------------------------------------

function agregarChecks(array) {
  console.log(array);
  //muestra un array con los checkbox que estan checkeados
categoriasContend.addEventListener("change", () => {
  let checkboxes = document.querySelectorAll("input[type=checkbox]");

  arrayChecks = Array.from(checkboxes)
    .filter((check) => check.checked)
    .map((check) => check.value);

  combinacionDeFiltros();
});
  array.forEach((categoria) => {
    let divContainer = document.createElement("div");
    divContainer.className = "contenedor__check";

    divContainer.innerHTML = `<input type="checkbox" name="${categoria}" id="${
      categoria.split(" ")[0]
    }" value="${categoria}"><label for="${categoria.replace(
      " ",
      "-"
    )}">${categoria}</label>`;
      
    categoriasContend.appendChild(divContainer);
  });
}



// ----------------------------------------------- F I L T R O ----------------------------------------------

function combinacionDeFiltros() {
  arrayEventFilter = [];
  //por defecto, que muestre todas las cartas
  if (arrayChecks.length == 0 && buscadorText.length == 0) {
    arrayEventFilter = arrayCartas;
  } //si hay algo en el buscador y en los checks
  if (arrayChecks.length > 0 && buscadorText !== "") {
    arrayChecks.forEach((categoria) => {
      arrayEventFilter.push(
        arrayCartas.filter(
          (evento) =>
            evento.name.toLowerCase().includes(buscadorText.trim()) &&
            evento.category == categoria
        )
      );
    });
  } //si hay algo en los checks y no en el buscador
  if (arrayChecks.length > 0 && buscadorText == "") {
    arrayChecks.forEach((categoria) => {
      arrayEventFilter.push(
        arrayCartas.filter((evento) => evento.category == categoria)
      );
    });
  } //si hay algo en el buscador y no en los checks
  if (arrayChecks.length == 0 && buscadorText !== "") {
    arrayEventFilter.push(
      arrayCartas.filter((evento) =>
        evento.name.toLowerCase().includes(buscadorText.trim())
      )
    );
  }

  mostrarCartasFiltradas(arrayEventFilter.flat());

  console.log(arrayEventFilter);
}

// ----------------------------------------------- P I N T A R  C A R T A S ----------------------------------------------

//para mostrar en pantalla las cartas
function mostrarCartasFiltradas(arrayCart) {
  let ponerCarta = "";

  if (arrayCart.length > 0) {
    arrayCart.forEach((evento) => {
      ponerCarta += `
    <div class="card card_tarjeta text-center">
        <img src=${evento.image} class="card-img-top img-card" alt="${
        evento.name
      }">
        <div class="card-body">
          <h5 class="card-title">${evento.name}</h5>
          <p class="card-text">${evento.description}</p>
          <div class="d-flex justify-content-between">
            <p>Price ##${evento.price}</p>
            <a href="${
              document.title == "Home"
                ? `assets/html/describe.html?id=${evento._id}`
                : `../html/describe.html?id=${evento._id}`
            }" class="btn_m"><img class="btn_more" src=${
        document.title == "Home" ? "assets/img/btn.png" : "../img/btn.png"
      } alt="btn"></a>
          </div>
        </div>
    </div>`;

      contenido.innerHTML = ponerCarta;
    });
  } else {
    contenido.innerHTML = `<div class="container__error"><img src=${
      document.title == "Home"
        ? `assets/img/404-error.svg`
        : `../img/404-error.svg`
    } alt="img_error"> <br>
    <h2>Try again with another search 😿</h2></div>`;
  }
}

function pintarEvento(evento) {
  let eventVariable = assistanceOrEstimate();

  function assistanceOrEstimate() {
    if (evento.date > date) {
      return `Estimate: ${evento.estimate}`;
    } else {
      return `Assistance: ${evento.assistance}`;
    }
  }

  contenedor.innerHTML = "";
  let div = document.createElement("div");
  div.className =
    "d-flex  cart_detail justify-content-center align-items-center flex-wrap";
  div.innerHTML = `
  <div class="img_details__c">
    <img src="${evento.image}" class="img-detail" alt="${evento.category}">
  </div>
  <div class="d-flex flex-column align-self-center texto_details">
    <h4 class="card-title text-center">${evento.name}</h4>
    
    <p class="detailsDesc text-justify">${evento.description}</p>
    <div class="d-flex details_content">
    <p class="text-justify">Date ${evento.date}</p>
    <p class="text-justify">Place: ${evento.place}</p>
    </div>
    <div class="d-flex details_content">
    <p class="text-justify ">Capacity: ${evento.capacity}</p>
    <p class="text-justify ">${eventVariable}</p>
    </div>
    <div class="d-flex details_content">
    <p class="text-justify ">Category: ${evento.category}</p>
    <p class="text-justify ">Price: ${evento.price}</p>
    </div>
    

  </div>
`;

  contenedor.appendChild(div);
}

//----------------------------------------------- BOTONCITO PARA IR ARRIBA ----------------------------------------------

window.onscroll = function () {
  document.querySelector(".go-top-container").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  if (document.documentElement.scrollTop > 100) {~
    document.querySelector(".go-top-container").classList.add("show");
  } else {
    document.querySelector(".go-top-container").classList.remove("show");
  }
};


