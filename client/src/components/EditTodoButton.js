const EditTodoButton = ({selectSingleTodo, id}) => {



    const handleClick = () => {
        
        selectSingleTodo(id)
        
    }

    return (
        <button onClick={handleClick} className="subBtn" >Edit</button>
    )
}

export default EditTodoButton