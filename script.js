
function loadTodos() 
{
  // This function will load the todos from the browser
  
  const todos = JSON.parse(localStorage.getItem("todos")) || { todoList: [] };
  
  console.log(todos);
  
  return todos;

}

function refreshTodos(todos)
{
    localStorage.setItem("todos" , JSON.stringify(todos) )
}



// Function to add todo to local storage
function addTodoToLocalStorage(todo) 
{

    const todos = loadTodos();

    todos.todoList.push({...todo });

    localStorage.setItem("todos", JSON.stringify(todos));

}



function executeFilterAction(event)
{
    const todoList = document.getElementById("todoList");
    const element = event.target ; 
    const value =  element.getAttribute("data-filter");
   
    todoList.innerHTML = '';
    const todos = loadTodos();



    if( value == 'all')
    {
        console.log(todoList);

        todos.todoList.forEach((todo) => {
            appendTodoInhtml(todo)
        });

        
    }
    else if(value == 'pending')
    {
        todos.todoList.forEach((todo) => {

            if(todo.isCompleted != true)
            {
                appendTodoInhtml(todo)
            }
        });

    }
    else
    {
        todos.todoList.forEach((todo) => {

            if(todo.isCompleted == true)
            {
                appendTodoInhtml(todo)
            }
        });
    }
}



function appendTodoInhtml(todo)
{

    const todoList  = document.getElementById("todoList")

    const todoItem = document.createElement("li");

    todoItem.setAttribute("data-id" , todo.id)

    const textDiv = document.createElement("div");

    if( todo.isCompleted)
    {
        textDiv.classList.add("completed")
    }


    textDiv.textContent = todo.text; 
    todoItem.classList.add("todoItem")


    const wrapper = document.createElement("div")
    wrapper.classList.add("todoButtons")


    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");
    editBtn.addEventListener("click" , editTodo );

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click",deleteTodo);

    const completedBtn = document.createElement("button");
    completedBtn.textContent = (todo.isCompleted) ? "Reset" : "Completed";
    completedBtn.classList.add("completedBtn");
    completedBtn.addEventListener("click" , toggleTodo);

    wrapper.appendChild(editBtn)
    wrapper.appendChild(deleteBtn)
    wrapper.appendChild(completedBtn)

    todoItem.appendChild(textDiv);
    todoItem.appendChild(wrapper);

    todoList.appendChild(todoItem);

}



function resetHtmlTodos(todos)
{
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = '';
    
    todos.todoList.forEach( todo => {
        appendTodoInhtml(todo);
    });

}

function toggleTodo(event)
{
    const todoItem = event.target.parentElement.parentElement ; 
    const todoId = todoItem.getAttribute("data-id");
    const todos = loadTodos();

    todos.todoList.forEach( todo => {
        if(todo.id == todoId )
        {
            todo.isCompleted = !todo.isCompleted ; 
        }
    });

    refreshTodos(todos);
    resetHtmlTodos(todos);
    
}


function deleteTodo(event)
{
    const todoItem = event.target.parentElement.parentElement ; 
    const todoId = todoItem.getAttribute("data-id");
    let todos = loadTodos();

    todos.todoList =  todos.todoList.filter( todo => todo.id != todoId );
    refreshTodos(todos);
    resetHtmlTodos(todos);

}


function editTodo(event)
{
    const todoItem = event.target.parentElement.parentElement ; 
    const todoId = todoItem.getAttribute("data-id");
    let todos = loadTodos();

    const response = prompt("What is the new todo value you want to set ? ");
    todos.todoList =  todos.todoList.filter( todo => {
        if( todo.id == todoId )
        {
            todo.text = response ; 
        }
    });
    refreshTodos(todos);
    resetHtmlTodos(todos);


}


document.addEventListener("DOMContentLoaded", () => {

  
    const todoInput = document.getElementById("todoInput");
  
    const submitButton = document.getElementById("addTodo");

    let todos = loadTodos();


    const todoList  = document.getElementById("todoList");



    const filterBtns = document.getElementsByClassName("filterBtn");

    for( const btn of filterBtns )
    {
        btn.addEventListener("click" , executeFilterAction);
    }



function addNewTodo()
{
     
    const todoText = todoInput.value;
    
    if (todoText === "") 
    {
        alert("Please write something for the todo!");
    } 
    else 
    {
        todos = loadTodos();
        const id = todos.todoList.length ; 
        addTodoToLocalStorage({text: todoText , isCompleted: false , id});

        appendTodoInhtml({text: todoText , isCompleted: false , id});
        
        todoInput.value = '';
        
    }
}



 submitButton.addEventListener("click", addNewTodo );


  todoInput.addEventListener("change", (event) => {

    // This callback method is fired every time there is a change in the input tag
    
    const todoText = event.target.value;
    
    event.target.value = todoText.trim();
    
    console.log(event.target.value);

  });


  // Load and display todos when the page loads
  todos.todoList.forEach((todo) => 
  {
    appendTodoInhtml(todo)
   });
  

   document.addEventListener("keypress" , (event) => {
        if(event.code === 'Enter')
        {
            addNewTodo();
        }
   })

});
