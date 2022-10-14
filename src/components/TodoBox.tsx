import { FC, Dispatch, useState, useRef, useEffect, FormEvent, SetStateAction } from "react";
import { Todo } from "../models/todos";

type TodoBoxProps = {
    todo: Todo,
    todos: Todo[],
    setTodos: (Dispatch<SetStateAction<Array<Todo>>>)
}

const TodoBox: FC<TodoBoxProps> = ({ todo, todos, setTodos }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleDone = (id: number) => {
        setTodos(todos.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        ));
    };

    const handleEdit = (e: FormEvent, id: number) => {
        e.preventDefault();

        setTodos(todos.map((todo) => (
            todo.id === id ? { ...todo, todo: editTodo } : todo
        )));

        setEdit(false);
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <form className="todobox" onSubmit={(e) => handleEdit(e, todo.id)}>
            {
                edit ? (
                    <div className="name">
                        <input
                            ref={inputRef}
                            value={editTodo}
                            onChange={(e) => setEditTodo(e.target.value)}
                        />
                    </div>
                ) :
                    todo.isDone ? (
                        <div className="name">
                            <s>{todo.todo}</s>
                        </div>
                    ) : (
                        <div className="name">
                            <h2>{todo.todo}</h2>
                        </div>
                    )
            }
            <div className="icons">
                <div onClick={() => {
                    if (!edit && !todo.isDone) {
                        setEdit(!edit);
                    }
                }
                }>ED</div>
                <div onClick={() => handleDone(todo.id)}>DN</div>
                <div onClick={() => handleDelete(todo.id)}>DL</div>
            </div>
        </form>
    )
}

export default TodoBox;