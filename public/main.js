
const body = document.querySelector('body')
const container = document.querySelector('#todosContainer')
const singleTodoContainer = document.querySelector('#singleTodoContainer')

getTodos()

async function getTodos() {
    try {
        const data = await fetch('http://localhost:3001/todos')
        const todos = await data.json()
        displayTodos(todos)
    } catch (error) {
        console.error(error.message)
    }
}

function displayTodos(todos) {
    
    todos.map((todo) => {
        
        const card = createTodoCard(todo)
        
        
        appendCardToContainer(card)
        showContainer()
        
    })
}

function showContainer() {
    container.style.display = 'block'
}

function appendCardToContainer(card) {
    container.appendChild(card)
}

function createTodoCard(todo) {
    const card = document.createElement('div')
    card.className = 'card'
    card.id = todo.id
    addListenerToCard(card)
    const todoBody = document.createElement('h1')
    todoBody.textContent = todo.todo_body
    const todoId = document.createElement('p')
    todoId.textContent = todo.id
    card.appendChild(todoBody)
    card.appendChild(todoId)
    return card
}

function addListenerToCard(card) {
    card.addEventListener('click', async function(e) {
        const id = parseInt(e.target.parentNode.id) 
        console.log(typeof id)

        try {
            const res = await fetch(`http://localhost:3001/todos/${id}`)
            const todo = await res.json()
            hideContainer()
            showSingleTodoContainer(todo)
        } catch (error) {
            console.log(error.message)
        }
    })
}

function hideContainer() {
    container.style.display = "none";
}

function showSingleTodoContainer(todo) {
    const card = document.createElement('div')
    card.id = todo.id
    const h1 = document.createElement('h1')
    h1.textContent = todo.todo_body
    const p = document.createElement('p')
    p.textContent = todo.id
    card.className = 'card'
    card.appendChild(h1)
    card.appendChild(p)
    appendEditButton(card)
    appendDeleteButton(card)
    singleTodoContainer.appendChild(card)
    singleTodoContainer.style.display = 'block'
}

function hideSingleTodoContainer() {
    singleTodoContainer.innerHTML = ''
    singleTodoContainer.style.display = 'none'
}

function appendDeleteButton(card) {
    const btn = document.createElement('button')
    btn.textContent = 'Delete'
    btn.className = 'btn'
    btn.addEventListener('click', function() {
        handleDeleteRequest(card)
    })
    card.appendChild(btn)
}

async function handleDeleteRequest(card) {
    const id = card.id

    try {
        const res = await fetch(`http://localhost:3001/todos/${id}`, {
            method: 'DELETE'
        })

        const data = await res.json()
        console.log(data)
        deleteTodo(data, id)
    } catch (error) {
        console.error(error.message)
    }

}

function deleteTodo(data, id) {
    hideSingleTodoContainer()
    console.log(id)

    container.innerHTML = ''

    data.forEach((elem) => {
        const card = createTodoCard(elem)
        appendCardToContainer(card)
    })

    container.style.display = 'block'
}

function appendEditButton(card) {
    const btn = document.createElement('button')
    btn.textContent = 'edit'
    btn.className = 'btn'
    btn.classList.add('marginRight') 
    btn.addEventListener('click', function() {
        handleEditRequest(card)
    })
    card.appendChild(btn)
}

function handleEditRequest(card) {
    appendEditForm(card)  
}

function appendEditForm(card) {
    const form = document.createElement('form')
    form.id = 'form'
    const textInput = document.createElement('input')

    textInput.className = 'textInput'
    textInput.type = 'text'
    textInput.id = card.id
    textInput.value = card.firstChild.textContent
    
    
    const submitBtn = document.createElement('input')
    submitBtn.type = 'submit'
    submitBtn.className = 'btn'

    
    form.appendChild(textInput)
    form.appendChild(submitBtn)

    form.addEventListener('submit', function(e) {
        e.preventDefault()
        const textInput = document.querySelectorAll('.textInput')[0]
        console.log(textInput)
        handleEditTodo(textInput.value, textInput.id)
    })
    card.appendChild(form)
}

async function handleEditTodo(text, strId) {
    const id = parseInt(strId)
    try {
        const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({todo_body: text})
      })
      const data = await response.json()

      showToast('Todo edited successfully...', {fx: updateTodoInDOM, data: data})
    //   updateTodoInDOM(data)
    } catch (error) {
        console.log(error.message)
    }
}

function showToast(message, obj) {
    hideSingleTodoContainer()
    createAndAppendToastContainer(message, obj)
}

function createAndAppendToastContainer(message, obj) {
    const {fx, data} = obj
    const toastContainer = document.createElement('div')
    toastContainer.className = 'toast'
    
    const toastMessage = document.createElement('h1')
    toastMessage.textContent = message
    toastContainer.appendChild(toastMessage)
    body.appendChild(toastContainer)
    setTimeout(() => {
        toastContainer.innerHTML = ""
        toastContainer.style.display = 'none'
        fx(data)
    }, 2000);
}

function updateTodoInDOM(data) {

    container.innerHTML = ''
    
    data.forEach((elem) => {
        const card = createTodoCard(elem)
        appendCardToContainer(card)
        showContainer()
    })
}
