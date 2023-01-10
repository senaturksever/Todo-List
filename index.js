/* Selectorler ile dokumanlarda istediğimiz classı bulduk */
const todoInput =document.querySelector(".input-todo");
const todoButton =document.querySelector(".button-todo");
const todoList = document.querySelector(".todo-list");


//alerts
const todoAlert = document.querySelector(".alert");

//events
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click" , deleteCheck);


//functions
function addTodo(e){
    e.preventDefault(); //ekleme butonuna tıkladıgımızda sayfanın yenilenmesini durdurdu.

    const isEmpty = str => !str.trim().length; //boşluk kontrolü

    if(isEmpty(todoInput.value)){
        //eğer input değeri boş ise başa dön 
        todoInput.value = "";
    }else{
        todoAlert.style.display = "block";
        setTimeout(() => {
            todoAlert.style.display = "none";
        }, 1500);

        saveLocalStorage(todoInput.value);


    //? todo div oluşturalım 
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
   

    //check complete button oluşturduk 
    const completeButton =  document.createElement("button");
    completeButton.innerHTML = "<i class='fa-solid fa-check'></i>";
    completeButton.classList.add("btn-comp");
    todoDiv.appendChild(completeButton);
    
    //todo item li kısmını oluşturalım
    /* todoInputun valuesuna yaz, todo-item classına al ve oluşturdugumuz todoDiv'e appendchild ile ekle */
    const todoItem = document.createElement("li");
    todoItem.innerText = todoInput.value;
    todoItem.classList.add("todo-item");
    todoDiv.appendChild(todoItem);

    //xmark button oluştrduk
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fa-solid fa-xmark'></i>";
    deleteButton.classList.add("btn-delete");   
    todoDiv.appendChild(deleteButton);

  

    //listeye ekle
    todoList.appendChild(todoDiv);

    //todo input değerlerini temizle yazdıktan sonra boş bırakmak için yaptık
    todoInput.value = "";

    }      
}

function deleteCheck(e){
    const item = e.target;
    
    //delete todo
    if(item.classList[0] === "btn-delete"){
        const todo = item.parentElement;
        removeLocalStorage(todo);
        todo.remove();
        console.log(todo)
    }

    //check todo
    if(item.classList[0] === "btn-comp"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        
    }
}


//local storage
function saveLocalStorage(todo){
    let todos;
    if(localStorage.getItem("todos") === null ){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null ){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach((todo) => {

        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
       
    
        //check complete button oluşturduk 
        const completeButton =  document.createElement("button");
        completeButton.innerHTML = "<i class='fa-solid fa-check'></i>";
        completeButton.classList.add("btn-comp");
        todoDiv.appendChild(completeButton);
        
        //todo item li kısmını oluşturalım
        /* todoInputun valuesuna yaz, todo-item classına al ve oluşturdugumuz todoDiv'e appendchild ile ekle */
        const todoItem = document.createElement("li");
        todoItem.innerText = todo;
        todoItem.classList.add("todo-item");
        todoDiv.appendChild(todoItem);
    
        //xmark button oluştrduk
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "<i class='fa-solid fa-xmark'></i>";
        deleteButton.classList.add("btn-delete");   
        todoDiv.appendChild(deleteButton);
    
      
    
        //listeye ekle
        todoList.appendChild(todoDiv);
        
    });
}

function removeLocalStorage(todo){
    let todos;
    if(localStorage.getItem("todos") === null ){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[1].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}