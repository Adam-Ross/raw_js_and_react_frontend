const DeleteTodoButton = ({id, deleteTodo}) => {
    const handleClick = () => {
        deleteTodo(id)
    }

    return (
        <button onClick={handleClick} >Delete</button>
    )
}

export default DeleteTodoButton