let contenidoCartaPast = document.getElementById('contenido-past')


data.eventos.forEach(evento =>{
  let card = document.createElement('div')
    card.className="card card_tarjeta p-2 text-center"
    card.innerHTML=`<img src="${evento.image}" class="img-card card-img-top" alt="${evento.name}">
    <div class="card-body">
      <h5 class="card-title">${evento.name}</h5>
      <p class="card-text">${evento.description}</p>
      <div class="d-flex justify-content-between">
        <p>Price ##${evento.price}</p>
        <a href="../html/describe.html" class="btn text-white">more</a>
      </div>
    </div>`   
    if(data.fechaActual>evento.date){
      contenidoCartaPast.appendChild(card)
  }
})


let categoriasContend=document.getElementById('categorias')
let categoriasFiltradas=filtrarCat();


categoriasFiltradas.forEach(categoria=>{
  let divContainer = document.createElement('div')

  divContainer.className='contenedor__check'
  divContainer.innerHTML=`<input type="checkbox" name="${categoria.replace(' ','-')}" id="${categoria.replace(' ','-')}" value="${categoria.split(' ')[0]}">
  <label for="${categoria.replace(' ','-')}">${categoria}</label>`
  categoriasContend.appendChild(divContainer)

})

/* <input type="checkbox" name="cat2" id="cat2" value="2">
<label for="cat2">Category</label> */


function filtrarCat(){
  let arrayCategorias = []

  data.eventos.forEach(evento => {
    if(!arrayCategorias.includes(evento.category)){
      arrayCategorias.push(evento.category)
    }
  })
  return arrayCategorias
}
    