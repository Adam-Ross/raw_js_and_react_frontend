import {useState, useEffect} from 'react'
import TodoInput from './components/TodoInput'
import SingleTodo from './components/SingleTodo'
import Todos from './components/Todos'
import './App.css';


function App() {

  const [todos, setTodos] = useState([])
  const [singleTodo, setSingleTodo] = useState(null)

  const getTodos = async () => {
    try {
      const response = await fetch(`http://localhost:3001/todos`)
      const data = await response.json()

      setTodos(data)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  const selectSingleTodo = async (id) => {
    const response = await fetch(`http://localhost:3001/todos/${id}`)
    const data = await response.json()
    setSingleTodo(data)
  }

  const addTodo = async (text) => {
    try {
      await fetch(`http://localhost:3001/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({todo_body: text})
      })
      getTodos()
    } catch (err) {
      console.error(err.message)
    }
  }

  const editTodo = async (id, text) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({todo_body: text})
      })
      const data = await response.json()
      setSingleTodo(null)
      getTodos()
      console.log(data)
    } catch (err) {
      console.error(err.message)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3001/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })

      getTodos()
    } catch (err) {
      console.error(err.message)
    }
  }

  if(singleTodo) {
    return <SingleTodo singleTodo={singleTodo}
      editTodo={editTodo}
    />
  }

  return (
    <>
      <TodoInput addTodo={addTodo}/>
      <Todos todos={todos}
      deleteTodo={deleteTodo}
      selectSingleTodo={selectSingleTodo}
      />
    </>
  );
}

export default App;
