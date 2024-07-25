function loadTodos() 
{
  // This function will load the todos from the browser
  
  const todos = JSON.parse(localStorage.getItem("todos")) || { todoList: [] };
  
  console.log(todos);
  
  return todos;

}



// Function to add todo to local storage
function addTodoToLocalStorage(todoText) 
{

    const todos = loadTodos();

    todos.todoList.push(todoText);

    localStorage.setItem("todos", JSON.stringify(todos));

}




function appendTodoInhtml(todoText) 
{

    const todoList  = document.getElementById("todoList")

    const todo = document.createElement("li");

    todo.textContent = todoText; // Add the todo text to the list item

    todoList.appendChild(todo);

}



document.addEventListener("DOMContentLoaded", () => {

  
    const todoInput = document.getElementById("todoInput");
  
    const submitButton = document.getElementById("addTodo");

    const todoList  = document.getElementById("todoList")


    

  
    submitButton.addEventListener("click", (event) => {

    
        const todoText = todoInput.value;
    
        if (todoText === "") 
        {
            alert("Please write something for the todo!");
        } 
        else 
        {
            addTodoToLocalStorage(todoText);

            appendTodoInhtml(todoText);
            
            todoInput.value = '';
            
        }

  });


  todoInput.addEventListener("change", (event) => {

    // This callback method is fired every time there is a change in the input tag
    
    const todoText = event.target.value;
    
    event.target.value = todoText.trim();
    
    console.log(event.target.value);

  });


  // Load and display todos when the page loads
  const todos = loadTodos();

  todos.todoList.forEach((todo) => 
  {
    const newTodoItem = document.createElement("li")
    
    newTodoItem.textContent = todo ; 

    todoList.appendChild(newTodoItem);

    
   });

});
