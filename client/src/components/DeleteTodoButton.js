const DeleteTodoButton = ({id, deleteTodo}) => {
    const handleClick = () => {
        deleteTodo(id)
    }

    return (
        <button onClick={handleClick} className="subBtn">Delete</button>
    )
}

export default DeleteTodoButton