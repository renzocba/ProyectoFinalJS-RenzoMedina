"use strict"
bienvenida()
function bienvenida() {
  Swal.fire({
      title: "Bienvenido/a, Por favor gestioná tus pedidos",
      text: "A continuación podrás verlos, marcarlos y ordenarlos a medida que los vas realizando",
      confirmButtonText: "Genial!",
  })
}
//LOCALSTORAGE
document.getElementById("button-bienvenida").onclick = function () {
  const username = document.getElementById("nombre").value;
  localStorage.setItem("username", username);
  let variablegetstorage = localStorage.getItem("username");
  document.getElementById("bienvenida").innerHTML = "La magía comienza aquí" + " " + variablegetstorage;
};

// informacion de fecha
let dia = document.getElementById("dia");
let texto = document.getElementById("texto");
let mes = document.getElementById("mes");
let anio = document.getElementById("anio");

// CONTENEDOR DE PEDIDOS
let tasksContainer = document.getElementById("tasksContainer");

function Tarea(text, done) {
  this.text = text;
  this.done = done;
  this.click = function (event) {
    this.done = !this.done;
    event.target.classList.toggle("done");
  };
}

const arrayTareas = [];

let setDate = () => {
  let date = new Date();
  dia.textContent = date.toLocaleString("es", { day: "numeric" });
  texto.textContent = date.toLocaleString("es", { weekday: "long" });
  mes.textContent = date.toLocaleString("es", { month: "short" });
  anio.textContent = date.toLocaleString("es", { year: "numeric" });
};

//Agregar nueva tarea
let addNewTask = (event) => {
  event.preventDefault();

  let { value } = event.target.taskText;
  if (!value) return;
  let nuevaTarea = new Tarea(value, false);
  arrayTareas.push(nuevaTarea);

  let task = document.createElement("div");
  task.classList.add("task", "roundBorder");
  task.addEventListener("click", nuevaTarea.click);
  task.textContent = value;
  tasksContainer.prepend(task);
  event.target.reset();
};
//Ordenar
let order = () => {
  let done = [];
  let toDo = [];
  tasksContainer.childNodes.forEach((el) => {
    el.classList.contains("done") ? done.push(el) : toDo.push(el);
  });
  return [...toDo, ...done];
};
let renderOrderedTasks = () => {
  order().forEach((el) => tasksContainer.appendChild(el));
};

setDate();

//BOTONBUSCAR
let botonBuscar = document.querySelector("#buscar");
let filtrar = () => {
  tasksContainer.innerHTML = "";

  let textoIngresado = document.querySelector("#textoIngresado").value;
  if (textoIngresado == "") {
    for (const e of arrayTareas) {
      console.log(e.done);
      if (e.done == false) {
        let task = document.createElement("div");
        task.classList.add("task", "roundBorder");
        task.addEventListener("click", e.click);
        task.textContent = e.text;
        tasksContainer.prepend(task);
      } else {
        let task = document.createElement("div");
        task.classList.add("task", "roundBorder", "done");
        task.addEventListener("click", e.click);
        task.textContent = e.text;
        tasksContainer.prepend(task);
      }
    }
  } else {
    let busqueda = arrayTareas.find(
      (e) => e.text == textoIngresado.toLowerCase()
    );
    if (busqueda != undefined) {
      if (busqueda.done == false) {
        tasksContainer.innerHTML = "";
        let task = document.createElement("div");
        task.classList.add("task", "roundBorder");
        task.addEventListener("click", busqueda.click);
        task.textContent = busqueda.text;
        tasksContainer.prepend(task);
      } else {
        tasksContainer.innerHTML = "";
        let task = document.createElement("div");
        task.classList.add("task", "roundBorder", "done");
        task.addEventListener("click", busqueda.click);
        task.textContent = busqueda.text;
        tasksContainer.prepend(task);
      }
    }
  }
};
botonBuscar.addEventListener("click", filtrar);


//FETCH MANERA DE AUTOMATIZAR PEDIDOS, EN VEZ DE CARGAR PEDIDO POR PEDIDO SE CARGA EL FETCH
document.getElementById("Cargar").onclick=function(){
  fetch("./pedidos.json")
    .then(resp => resp.json())
    .then(data => {
        data.forEach(el => { 
          let nuevaTarea = new Tarea(el.pedido, el.realizado);
          arrayTareas.push(nuevaTarea);
        
          let task = document.createElement("div");
          task.classList.add("task", "roundBorder");
          task.addEventListener("click", nuevaTarea.click);
          task.textContent = el.pedido;
          tasksContainer.prepend(task);
        })

    })
}


