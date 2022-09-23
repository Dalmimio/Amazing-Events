console.log(data)
let contenidoCartaIndex = document.getElementById('contenido-index')



  data.eventos.forEach(evento => {
    let card = document.createElement('div')
    card.className="card card_tarjeta p-2 text-center"
    card.innerHTML=`<img src="${evento.image}" class="card-img-top img-card" alt="${evento.name}">
    <div class="card-body">
      <h5 class="card-title">${evento.name}</h5>
      <p class="card-text">${evento.description}</p>
      <div class="d-flex justify-content-between">
        <p>Price ##${evento.price}</p>
        <a href="assets/html/describe.html" class="btn text-white">more</a>
      </div>
    </div>`
    contenidoCartaIndex.appendChild(card)
   
  })
    



let categoriasContend = document.getElementById('categorias')

let categoriasFiltradas = filtrarCat()
console.log(categoriasFiltradas)



categoriasFiltradas.forEach(categoria => {
      let divContainer=document.createElement('div')
      divContainer.className='contenedor__check'
      divContainer.innerHTML=`<input type="checkbox" name="${categoria.replace(' ','-')}" id="${categoria.replace(' ','-')}" value="${categoria.split(' ')[0]}">
      <label for="${categoria.replace(' ','-')}">${categoria}</label>`
      categoriasContend.appendChild(divContainer)
})



//filtrando categorias

function filtrarCat(){
  let arrayCategorias = []
  data.eventos.forEach(evento=>{
    if(!arrayCategorias.includes(evento.category)){
      arrayCategorias.push(evento.category)
    }
  })
  return arrayCategorias
}

// let buscador=document.getElementById('buscador')

// buscador.addEventListener('click',()=>{

// })