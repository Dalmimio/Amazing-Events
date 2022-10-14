let contenedorAll = document.getElementById('all')
let contenedorPast = document.getElementById('past_stats')
let contenedorUp = document.getElementById('upcomming_stats')
let URL = "https://amazing-events.herokuapp.com/api/events"
let date
let percentageEvents = []
let categoriasUp = []
let categoriasPast = []
let categoriasAll = []
let eventsAll = []
let mayorAsistencia=[]
let capacity = []
let elementosUp = []
let elementosPast = []



traerDatos(URL)

function traerDatos(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        date = data.currentDate;
        data.events.forEach(evento =>{
            eventsAll.push(evento)
            if (!categoriasAll.includes(evento.category)) {
                categoriasAll.push(evento.category);
                
              }
            if (evento.date > date) {
                if (!categoriasUp.includes(evento.category)) {
                  categoriasUp.push(evento.category);
                }
                
            }

            if (evento.date < date) {
                if (!categoriasPast.includes(evento.category)) {
                  categoriasPast.push(evento.category);
                }
    
               
              }
              
            
        })
        
        


        // console.log(capacity)
        // console.table(percentageEvents);
        // console.log(categoriasAll);
        // console.log(categoriasUp);
        // console.log(categoriasPast);
        datosTabla1()
        datosTabla2()
        datosTabla3()
        mostrarStatsFiltrados()

        })
      .catch("Hubo un error");
  }
  



function datosTabla1(){
  let eventsPast = eventsAll.filter(evento => date > evento.date)

        eventsPast.map((evento) => {
          percentageEvents.push({
            name: evento.name,
            percentage: (evento.assistance * 100 / evento.capacity).toFixed(2),
            id: evento._id
          });
        });

        percentageEvents.sort((a,b)=> b.percentage - a.percentage)

        
        capacity = eventsAll.filter(evento=>evento.capacity).sort((a,b) => b.capacity - a.capacity)[0]
}



function datosTabla2() {
  let upEvent = eventsAll.filter(evento => evento.date > date);

  categoriasUp.map(category => {
    elementosUp.push({
      category: category,
      eventos: upEvent.filter(evento => evento.category === category),
    });
  });
  let RevAcumulador = 0
  let PerAcumulador = 0
  let totEvents = 0

  elementosUp.map(categoria => {
    categoria.eventos.forEach(evento => RevAcumulador += evento.price*evento.estimate)
    categoria.revenues=RevAcumulador
    RevAcumulador = 0

    categoria.eventos.forEach(evento => {
      PerAcumulador += evento.estimate*100/evento.capacity
      totEvents++
    })

    categoria.percentage=(PerAcumulador/totEvents).toFixed(2)
    PerAcumulador = 0
    totEvents = 0


  })

  // elementosUp.map(evento => console.log(evento.eventos.forEach(evento => console.log(evento.name))))

  console.log(elementosUp);
  console.log(categoriasUp);
}

function datosTabla3(){

  let pastEvent = eventsAll.filter(evento => evento.date < date);

  categoriasPast.map(category => {
    elementosPast.push({
      category: category,
      eventos: pastEvent.filter(evento => evento.category === category),
    });
  });

    let RevAcumulador = 0
    let PerAcumulador = 0
    let totEvents = 0


  elementosPast.map(elemento => {
    elemento.eventos.forEach(evento => RevAcumulador+=evento.price*evento.assistance
      )
    elemento.revenues=RevAcumulador
    RevAcumulador = 0

    elemento.eventos.forEach(evento => {
      PerAcumulador += (evento.assistance
        *100/evento.capacity)
      console.log(PerAcumulador)
      totEvents++
    })

    elemento.percentage=(PerAcumulador/totEvents).toFixed(2)
    PerAcumulador = 0
    totEvents = 0  
})
console.log(elementosPast);
console.log(categoriasPast);
}



function mostrarStatsFiltrados(){


    let estadisticaAll = document.createElement('tr')
    estadisticaAll.innerHTML= `<th>${percentageEvents[0].name}</th>
     <th>${percentageEvents[percentageEvents.length-1].name}</th>
     <th>${capacity.name}</th>`;
     
     contenedorAll.appendChild(estadisticaAll);
   

   
    elementosUp.forEach(elemento => {
       let estadisticaUp = document.createElement('tr')
       estadisticaUp.innerHTML= `<th>${elemento.category}</th>
        <th>$${elemento.revenues}</th>
        <th>${elemento.percentage}%</th>`;
        
        contenedorUp.appendChild(estadisticaUp);
      })

      elementosPast.forEach(elemento => {
        let estadisticaPast = document.createElement('tr')
        estadisticaPast.innerHTML= `<th>${elemento.category}</th>
         <th>$${elemento.revenues}</th>
         <th>${elemento.percentage}%</th>`;
         
         contenedorPast.appendChild(estadisticaPast);
       })

}