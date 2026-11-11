const tabla = [
    {id: 1, titol: "Sergio title", descripcio: "", estat: "Obert", prioritat: "Alta", assignat: "sergop alonso", data: "29-08-2007"},
    {id: 2, titol: "dawdad", descripcio: "dawdawd", estat: "Tancat", prioritat: "Alta", assignat: "sergop alonso", data: "29-08-2007"},
]



let BD = JSON.parse(localStorage.getItem("tabla")) ?? JSON.parse(JSON.stringify(tabla))
function guardarLocalStorage(){
    localStorage.setItem("tabla", JSON.stringify(BD))
}
guardarLocalStorage()


// Cargar Tabla
const tbody = document.querySelector("#tbody")
let html = ""
function cargarTabla(){
    console.log(BD)
    html = ""
    BD.forEach(linea =>{
        html += `
        <tr class="linea" data-estat="${linea.estat}" data-prioritat="${linea.prioritat}">
            <td class="id">${linea.id}</td>
            <td class="titol">${linea.titol}</td>
            <td class="descripcion">${linea.descripcio}</td>
            <td class="estat"><span class="${linea.estat}">${linea.estat}</span></td>
            <td class="prioritat"><span class="${linea.prioritat}">${linea.prioritat}</span></td>
            <td class="assignat">${linea.assignat}</td>
            <td class="data">${linea.data}</td>
            <td><button data-id="${linea.id}" class="editBtn">Editar</button><button data-id="${linea.id}" class="deleteBtn">Eliminar</button></td>
        </tr>`  
    })
    tbody.innerHTML = html
}
cargarTabla()





// Filtrar
const form = document.querySelector("#form")
const selectEstat = document.querySelector("#selectEstat")
const selectPrioritat = document.querySelector("#selectPrioritat")
form.addEventListener("change", filtrar)
function filtrar(){
    let lineas = document.querySelectorAll(".linea")
    lineas.forEach(linea =>{
        if(selectEstat.value.includes(linea.dataset.estat) && selectPrioritat.value.includes(linea.dataset.prioritat)){
            linea.style.display = ""
        }else{
            linea.style.display = "none"
        }
    })
}







// Añadir 
let editando = false

const addBtn = document.querySelector("#addBtn")
const sectionAdd = document.querySelector("#sectionAdd")
const formAdd = document.querySelector("#formAdd")
addBtn.addEventListener("click", () =>{
    sectionAdd.classList.toggle("hidden")
    title.value = ""
    description.value = ""
    selectStatus.value = ""
    selectPriority.value = ""
    assing.value = ""
    guardarLocalStorage()
})



const title = document.querySelector("#title")
const description = document.querySelector("#description")
const selectStatus = document.querySelector("#selectStatus")
const selectPriority = document.querySelector("#selectPriority")
const assing = document.querySelector("#assing")

const desaBtn = document.querySelector("#desaBtn")
    desaBtn.addEventListener("click", (e) =>{
        e.preventDefault()
        if(editando){
            let tarea = BD.find(t => t.id === editando)
            tarea.titol = title.value
            tarea.descripcio = description.value
            tarea.estat = selectStatus.value
            tarea.prioritat = selectPriority.value
            tarea.assignat = assing.value
            editando = false
        }else{
            BD.push({id: BD.length+1, titol: title.value, descripcio: description.value, estat: selectStatus.value, prioritat: selectPriority.value, assignat: assing.value, data: "29-08-2007"},)
        }
        cargarTabla()
        sectionAdd.classList.toggle("hidden")
        guardarLocalStorage()
    })



let tancarBtn = document.querySelector("#tancarBtn")
tancarBtn.addEventListener("click", (e) =>{
    e.preventDefault()
    sectionAdd.classList.toggle("hidden")
})





// Editar Eliminar 
let table = document.querySelector("#table")
table.addEventListener("click", (e) =>{
    if (e.target.classList.contains("deleteBtn")) {
        BD = BD.filter(l => l.id !== Number(e.target.dataset.id))
        guardarLocalStorage()
        cargarTabla()
    }else if (e.target.classList.contains("editBtn")) {
        const linea = BD.find(l => l.id === Number(e.target.dataset.id))

        sectionAdd.classList.toggle("hidden")
        title.value = linea.titol
        description.value = linea.descripcio
        selectStatus.value = linea.estat
        selectPriority.value = linea.prioritat
        assing.value = linea.assignat
        editando = Number(e.target.dataset.id) 

    }
})