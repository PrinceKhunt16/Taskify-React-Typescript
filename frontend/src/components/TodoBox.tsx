import { FC, Dispatch, useState, useRef, useEffect, FormEvent, SetStateAction } from "react";
import { Todo } from "../models/todos";
import { Draggable } from "react-beautiful-dnd";
import axios from "axios";

type TodoBoxProps = {
    index: number,
    todo: Todo,
    todos: Todo[],
    setTodos: (Dispatch<SetStateAction<Array<Todo>>>)
}

const TodoBox: FC<TodoBoxProps> = ({ index, todo, todos, setTodos }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.name);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDelete = async (id: number) => {      
        await axios.delete(
            "/api/tasks/delete", 
            {
                data: {
                    id: id
                }
            }            
        )
    };

    const handleEdit = async (e: FormEvent, id: number) => {
        e.preventDefault();

        await axios.patch(
            "/api/tasks/update", 
            {   
                id: id,
                name: editTodo
            }            
        )

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
            draggableId={todo._id.toString()} 
            index={index}
        >
            {(provided, snapshot) => (
                <form 
                    className={`todobox ${snapshot.isDragging ? "drag" : ""}`}
                    onSubmit={(e) => handleEdit(e, todo._id)}
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
                                    <h2>{todo?.name}</h2>
                                </div>
                            )
                    }
                    <div className="icons">
                        <div onClick={() => handleTodo()}>EDT</div>
                        <div onClick={() => handleDelete(todo._id)}>DEL</div>
                    </div>
                </form>
            )}
        </Draggable>
    )
}

export default TodoBox;