import { FC, Dispatch, SetStateAction, FormEvent } from "react";

type InputProps = {
    todo: string,
    setTodo: (Dispatch<SetStateAction<string>>)
    handleAdd: (e: FormEvent) => void,
}

const Input: FC<InputProps> = ({ todo, setTodo, handleAdd }) => {
    return ( 
        <div className="inputBox" onSubmit={handleAdd}>
            <form>
                <div className="inputWrapper">
                    <input
                        type="text"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        placeholder="Add Todo"
                    />
                </div>
            </form>
        </div>
    )
}

export default Input;