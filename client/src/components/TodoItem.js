import DeleteTodoButton from './DeleteTodoButton'
import EditTodoButton from './EditTodoButton'

const TodoItem = ({todo, deleteTodo,selectSingleTodo}) => {
    return (
        <>
            <div className="todo">{todo.todo_body}</div>
            <DeleteTodoButton deleteTodo={deleteTodo}
            id={todo.id}
            />
            <EditTodoButton 
            id={todo.id}
            selectSingleTodo={selectSingleTodo}/>
        </>
    )   
}

export default TodoItem