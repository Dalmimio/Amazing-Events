let cadenaParametrosUrl = location.search;
let parametros = new URLSearchParams(cadenaParametrosUrl);
let id = parametros.get("id");
let contenedor = document.getElementById("main__describe");


let eventosFiltrados = (data.events).filter((evento) => {
  return evento;
});

let eventoEncontrado = eventosFiltrados.find((evento) => evento._id == id);
pintarEvento(eventoEncontrado);



function pintarEvento(evento) {
  let eventVariable = assistanceOrEstimate() 
  
  function assistanceOrEstimate(){
    if(evento.date>data.currentDate){
    return `Estimate: ${evento.estimate}`
    }else{
      return `Assistance: ${evento.assistance}`
    }
  }

  contenedor.innerHTML = "";
    let div = document.createElement('div')
    div.className="d-flex  cart_detail justify-content-center align-items-center flex-wrap"
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
