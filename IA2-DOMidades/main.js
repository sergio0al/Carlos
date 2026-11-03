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
    html = ""
    BD.forEach(linea =>{
        html += `
        <tr class="linea" data-estat="${linea.estat}" data-prioritat="${linea.prioritat}">
            <td>${linea.id}</td>
            <td>${linea.titol}</td>
            <td>${linea.descripcio}</td>
            <td>${linea.estat}</td>
            <td>${linea.prioritat}</td>
            <td>${linea.assignat}</td>
            <td>${linea.data}</td>
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

const addBtn = document.querySelector("#addBtn")
const sectionAdd = document.querySelector("#sectionAdd")
const formAdd = document.querySelector("#formAdd")
addBtn.addEventListener("click", () =>{
    sectionAdd.classList.toggle("hidden")
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
    BD.push({id: BD.length+1, titol: title.value, descripcio: description.value, estat: selectStatus.value, prioritat: selectPrioritat.value, assignat: assing.value, data: "29-08-2007"},)
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
    if(e.target.classList.contains("deleteBtn")){
        delete BD[e.target.dataset.id - 1]
        cargarTabla()
    }else if(e.target.classList.contains("editBtn")){
        sectionAdd.classList.remove("hidden")
        let id = e.target.dataset.id - 1
        title.value = BD[id].titol
        description.value = BD[id].descripcio
        selectStatus.value = BD[id].estat
        selectPriority.value = BD[id].prioritat
        assing.value = BD[id].assignat
        desaBtn.classList.add("hidden")
    }
})
