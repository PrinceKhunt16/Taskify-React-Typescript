import { useState, FormEvent, FC, useEffect } from "react"
import "../App.css"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { Todo } from "../models/todos"
import TodoList from "./TodoList"
import Input from "./Input"
import Header from "./Header"
import axios from "axios"

const Home: FC = () => {
  const [todo, setTodo] = useState <string> ('')
  const [todos, setTodos] = useState <Todo[]> ([])
  const [completedTodos, setCompletedTodos] = useState <Todo[]> ([])
  const [check, setCheck] = useState <boolean> (false)

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault()

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const userInfo = localStorage.getItem('userInfo')
    let uid

    if (typeof userInfo === 'string') {
      const data = JSON.parse(userInfo)
      uid = data.uid
    }

    await axios.post(
      "/api/tasks/create",
      {
        name: todo,
        user: uid
      },
      config
    )

    setTodo('')
    setCheck(!check)
  }

  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result

    if (!destination) {
      return
    }

    if(destination.droppableId === source.droppableId){
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    let add, active = todos, complete = completedTodos

    if (source.droppableId === 'ActiveTodos') {
      add = active[source.index]
      await axios.patch(
        "/api/tasks/update", 
        {   
          id: active[source.index]._id,
          completed: true
        }            
      )
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      await axios.patch(
        "/api/tasks/update", 
        {   
          id: complete[source.index]._id,
          completed: false
        }            
      ) 
      complete.splice(source.index, 1)
    }

    if (destination.droppableId === 'ActiveTodos') {
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }

    await fetchTasks()
  }

  const fetchTasks = async () => {
    const userInfo = localStorage.getItem('userInfo')
    let uid

    if (typeof userInfo === 'string') {
      const data = JSON.parse(userInfo)
      uid = data.uid
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data: activeTasks } = await axios.post(
        "/api/tasks/active",
        {
          id: uid
        },
        config
      )

      setTodos(activeTasks.tasks)

      const { data: completedTasks } = await axios.post(
        "/api/tasks/completed",
        {
          id: uid
        },
        config
      )

      setCompletedTodos(completedTasks.tasks)
    } catch (e: any) {
      console.log(e.response.data.message)
    }
  }

  useEffect(() => {
    (async function setDefaultTask() {
      await fetchTasks()
    })()
  }, [check])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <div className="headerAndInput">
          <Header />
          <Input
            todo={todo}
            setTodo={setTodo}
            handleAdd={handleAdd}
          />
        </div>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          check={check}
          setCheck={setCheck}
        />
      </div>
    </DragDropContext>
  )
}

export default Home