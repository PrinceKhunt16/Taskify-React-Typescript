import { FC, Dispatch, SetStateAction } from "react";
import { Todo } from "../models/todos";
import TodoBox from "./TodoBox";
import { Droppable } from "react-beautiful-dnd";

interface TodoListProps {
    todos: Todo[],
    setTodos: (Dispatch<SetStateAction<Array<Todo>>>),
    completedTodos: Todo[],
    setCompletedTodos: (Dispatch<SetStateAction<Array<Todo>>>)
}

const TodoList: FC<TodoListProps> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
    return (
        <div className="containerTodos">
            <Droppable droppableId="ActiveTodos">
                {(provided, snapshot) => (
                    <div
                        className={`activeTodos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <div className="heading">Active Task</div>
                        {todos.map((todo, index) => (
                            <TodoBox
                                index={index}
                                todo={todo}
                                key={todo.id}
                                todos={todos}
                                setTodos={setTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="CompletedTodos">
                {(provided, snapshot) => (
                    <div
                        className={`completedTodos ${snapshot.isDraggingOver ? 'dragcomplete' : ''}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <div className="heading">Completed Task</div>
                        {completedTodos.map((todo, index) => (
                            <TodoBox
                                index={index}
                                todo={todo}
                                key={todo.id}
                                todos={completedTodos}
                                setTodos={setCompletedTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default TodoList;