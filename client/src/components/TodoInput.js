import {useState} from 'react'

const TodoInput = ({addTodo}) => {

    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text !== '') {
            addTodo(text)
            setText('')
        }
    }

    const handleChange = (e) => {
        setText(e.target.value)
    }

    return <form onSubmit={handleSubmit}>
        <input type='text' value={text} onChange={handleChange} />
        <input type='submit'/>
    </form>
}

export default TodoInput