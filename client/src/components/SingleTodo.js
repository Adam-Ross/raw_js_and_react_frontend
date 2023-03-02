import {useState} from 'react'
const SingleTodo = ({singleTodo, editTodo}) => {

    const [text, setText] = useState(singleTodo.todo_body)

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {

        e.preventDefault()
        editTodo(singleTodo.todo_id, text)
    }
 
    return (
        <form onSubmit={handleSubmit}>
            <input type='text' value={text} onChange={handleChange} />
            <input type='submit' />
        </form>
    )
}

export default SingleTodo