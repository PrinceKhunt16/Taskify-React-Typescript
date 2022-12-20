import { FC, Dispatch, useState, useRef, useEffect, FormEvent, SetStateAction } from "react";
import { Todo } from "../models/todos";
import { Draggable } from "react-beautiful-dnd";

type TodoBoxProps = {
    index: number,
    todo: Todo,
    todos: Todo[],
    setTodos: (Dispatch<SetStateAction<Array<Todo>>>)
}

const TodoBox: FC<TodoBoxProps> = ({ index, todo, todos, setTodos }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleEdit = (e: FormEvent, id: number) => {
        e.preventDefault();

        setTodos(todos.map((todo) => (
            todo.id === id ? { ...todo, todo: editTodo } : todo
        )));

        setEdit(false);
    }

    const handleTodo = () => {
        if (!edit && !todo.isDone) {
            setEdit(!edit);
        }
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <Draggable 
            draggableId={todo.id.toString()} 
            index={index}
        >
            {(provided, snapshot) => (
                <form 
                    className={`todobox ${snapshot.isDragging ? "drag" : ""}`}
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {
                        edit ? (
                            <div className="name">
                                <input
                                    ref={inputRef}
                                    value={editTodo}
                                    onChange={(e) => setEditTodo(e.target.value)}
                                />
                            </div>
                        ) : (
                                <div className="name">
                                    <h2>{todo.todo}</h2>
                                </div>
                            )
                    }
                    <div className="icons">
                        <div onClick={() => handleTodo()}>EDT</div>
                        <div onClick={() => handleDelete(todo.id)}>DEL</div>
                    </div>
                </form>
            )}
        </Draggable>
    )
}

export default TodoBox;