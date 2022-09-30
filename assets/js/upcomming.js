let contenidoCartaUp = document.getElementById('contenido-upcomming')


for(let i=0; i<data.eventos.length; i++){
    let card = document.createElement('div')
    card.className="card card_tarjeta p-2 text-center"
    card.innerHTML=`<img src="${data.eventos[i].image}" class="img-card card-img-top" alt="${data.eventos[i].name}">
    <div class="card-body">
      <h5 class="card-title">${data.eventos[i].name}</h5>
      <p class="card-text">${data.eventos[i].description}</p>
      <div class="d-flex justify-content-between">
        <p>Price ##${data.eventos[i].price}</p>
        <a href="../html/describe.html" class="btn text-white">more</a>
      </div>
    </div>`
    if(data.fechaActual<data.eventos[i].date){
        contenidoCartaUp.appendChild(card)
    }
   
}