const {createApp} = Vue;

createApp({
  data(){
    
    return{
      urlAPI : 'https://mindhub-xj03.onrender.com/api/amazing',
      eventos : {
        all : [],
        up : [],
        past : []
      },                           // los voy a agrupar en un objeto y separarlos en all, up, past dentro del mismo
      finalEvents : [],
      categorias : {
        all : [],
        up : [],
        past : []
      },                      // lo mismo que arriba
      backUpEventos : [],   //guardo los eventos para que no se pierdan
      txtBuscado : '',    //
      catBuscadas : [], //categorias buscadas
      dateC : '',     //para traer la fecha actual
      evento : {},   //evento details
      stats:{ //objeto con todos los datos de stadisticasSS
        higAttendance : {}, //mayor asistencia
        lowAttendance :{},// menor assitencia
        capacity : {}, //evento con mayor capacidad
        up : [], //array con categorias, revenues y percentage past
        past : [] //array con categorias, revenues y percentage up
      }
    };
  },
  created(){
    this.traerDatos()
  },
  mounted() {
    
  },
  methods: {
    traerDatos(){
      fetch(this.urlAPI).then(response => response.json())
      .then( data => {
        this.dateC = data.currentDate;
        data.events.forEach(evento => {
         
          
        this.eventos.all.push(evento)
          if(document.title == "Home"){
            this.finalEvents.push(evento)
          }else if(document.title == "Upcomming Events"){
            if(evento.date>this.dateC){
              this.finalEvents.push(evento)
            }
          }else if(document.title == "Past Events"){
            if(evento.date<this.dateC){
              this.finalEvents.push(evento)
            }
          }
          


          //todas las categorias         
          if(!this.categorias.all.includes(evento.category)){
            this.categorias.all.push(evento.category)            
          }

          //categorias up
          if(evento.date>this.dateC){
            this.eventos.up.push(evento)

            if(!this.categorias.up.includes(evento.category))
            {this.categorias.up.push(evento.category)}
          }else{
            //categorias past
            this.eventos.past.push(evento)
            if(!this.categorias.past.includes(evento.category))
            {this.categorias.past.push(evento.category)}
          }
          
        });
        if(document.title == 'Stats'){
          
           // PRIMERA TABLA
        let porcentajeEvents = []
        this.eventos.past.map(evento => {
          porcentajeEvents.push({
            name: evento.name,
            percentage: (evento.assistance * 100 / evento.capacity).toFixed(2),
            id: evento._id
          })
        })

        this.stats.higAttendance = porcentajeEvents.sort((a,b)=> b.percentage - a.percentage)[0]
        this.stats.lowAttendance = porcentajeEvents.sort((a,b)=> a.percentage - b.percentage)[0]
        this.stats.capacity = this.eventos.all.filter(evento=>evento.capacity).sort((a,b) => b.capacity - a.capacity)[0]


        console.log(this.stats.capacity)
        console.log(this.stats.higAttendance)
        console.log(this.stats.lowAttendance)
        // this.statsEvest (categorias, eventos, guardo)
        this.statsEvents(this.categorias.up, this.eventos.up, this.stats.up)
        this.statsEvents(this.categorias.past, this.eventos.past, this.stats.past)

      }       
        
        
       if(document.title == 'Details'){
        
        let id = new URLSearchParams(location.search).get('id')
        console.log(id)
        this.evento = this.eventos.all.find(evento => evento._id == id)
        

       }
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
        

      })
    },
    statsEvents (categorias, eventos, guardo){ //necesito pasarle: categorias que usará y eventos además de donde los voy a almacenar
        let revAcumulador = 0 // revenues
        let perAcumulador = 0 //porcentaje
        let totEvents = 0

        categorias.map(category => {
          guardo.push({
            category: category,
            events : eventos.filter(evento => evento.category === category)
          })
        })

        guardo.map(elemento => {

            elemento.events.forEach(
              (evento) => (revAcumulador += evento.price * ((evento.date > this.dateC)?evento.estimate:evento.assistance))
            )

            elemento.revenues = revAcumulador;
            

            elemento.events.forEach((evento) => {
              perAcumulador += (((evento.date > this.dateC)?evento.estimate:evento.assistance)* 100) / evento.capacity;
              totEvents++;
            });

            elemento.percentage = (perAcumulador / totEvents).toFixed(2);
            revAcumulador = 0;
            perAcumulador = 0;
            totEvents = 0;
          
          

        })

    },
    
  },
  computed:{
    papaFiltro(){

      if(this.catBuscadas.length==0 && this.txtBuscado==''){
        this.finalEvents = this.backUpEventos
      }
      
      if(this.catBuscadas.length == 0 && this.txtBuscado!=''){
        this.finalEvents = this.backUpEventos.filter(evento => evento.name.toLowerCase().includes(this.txtBuscado.toLowerCase()))
      }
      if(this.catBuscadas.length > 0 && this.txtBuscado == ''){
        this.finalEvents = this.backUpEventos.filter(evento => this.catBuscadas.includes(evento.category))
      }
      if(this.catBuscadas.length > 0 && this.txtBuscado!=''){
        this.finalEvents = this.backUpEventos.filter(evento => evento.name.toLowerCase().includes(this.txtBuscado.toLowerCase())).filter(evento => this.catBuscadas.includes(evento.category))
      }

    },
    

  }
}).mount('#app')
