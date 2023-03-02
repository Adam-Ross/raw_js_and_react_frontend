import DeleteTodoButton from './DeleteTodoButton'
import EditTodoButton from './EditTodoButton'

const TodoItem = ({todo, deleteTodo,selectSingleTodo}) => {
    return (
        <>
            <h1>{todo.todo_body}</h1>
            <DeleteTodoButton deleteTodo={deleteTodo}
            id={todo.todo_id}
            />
            <EditTodoButton 
            id={todo.todo_id}
            selectSingleTodo={selectSingleTodo}/>
        </>
    )   
}

export default TodoItem