import { FC, Dispatch, SetStateAction } from "react";
import { Todo } from "../models/todos";
import TodoBox from "./TodoBox";

interface TodoListProps {
    todos: Todo[],
    setTodos: (Dispatch<SetStateAction<Array<Todo>>>)
}

const TodoList: FC<TodoListProps> = ({ todos, setTodos }) => {
    return (
        <div className="todos">
            {todos.map((todo) => (
                <TodoBox
                    todo={todo}
                    key={todo.id}
                    todos={todos}
                    setTodos={setTodos}
                />
            ))}
        </div>
    )
}

export default TodoList;