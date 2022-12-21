import { useState, FormEvent, FC } from "react";
import "../App.css";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "../models/todos";
import TodoList from "./TodoList";
import Input from "./Input";
import Header from "./Header";

const Home: FC = () => {
  const [todo, setTodo] = useState <string> ('');
  const [todos, setTodos] = useState <Todo[]> ([]);
  const [completedTodos, setCompletedTodos] = useState <Todo[]> ([]);

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, {
        id: Date.now(),
        todo: todo,
        isDone: false
      }]);

      setTodo('');
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    let add, active = todos, complete = completedTodos;

    if (source.droppableId === 'ActiveTodos') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'ActiveTodos') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  }

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
          />
      </div>
    </DragDropContext>
  )
}

export default Home