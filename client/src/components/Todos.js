import TodoItem from './TodoItem'
const Todos = ({todos, deleteTodo, selectSingleTodo}) => {
    return (
        todos.map((todo) => (
            <TodoItem todo={todo}
             key={todo.todo_id}
             deleteTodo={deleteTodo}
             selectSingleTodo={selectSingleTodo}
            />
        ))
    )
}

export default Todos