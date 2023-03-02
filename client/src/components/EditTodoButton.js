const EditTodoButton = ({selectSingleTodo, id}) => {

    const handleClick = () => {
        selectSingleTodo(id)
    }

    return (
        <button onClick={handleClick}>Edit</button>
    )
}

export default EditTodoButton