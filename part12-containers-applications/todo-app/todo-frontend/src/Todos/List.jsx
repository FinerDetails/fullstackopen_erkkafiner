import Todo from './Todo'
const TodoList = ({ todos, deleteTodo, completeTodo }) => {

  return (
    <>
      {todos.map((todo, index) => {
        return <Todo key={`${todo.text+index}`} todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo}/>
      // eslint-disable-next-line react/jsx-key
      }).reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </>
  )
}

export default TodoList
