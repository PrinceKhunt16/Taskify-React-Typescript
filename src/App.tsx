import { useState, FC, FormEvent } from "react";
import "./App.css";
import Header from "./components/Header";
import Input from "./components/Input";
import TodoList from "./components/TodoList";
import { Todo } from "./models/todos";

const App: FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

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

  return (
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
      />
    </div>
  )
}

export default App;