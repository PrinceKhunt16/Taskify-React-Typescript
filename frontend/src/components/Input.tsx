import { FC, Dispatch, SetStateAction, FormEvent, useState, useEffect } from "react";

type InputProps = {
    todo: string,
    setTodo: (Dispatch<SetStateAction<string>>)
    handleAdd: (e: FormEvent) => void,
}

type IPropsLSTypes = {
    name: string | null,
    token: string | null
}

const Input: FC<InputProps> = ({ todo, setTodo, handleAdd }) => {
    const [user, setUser] = useState<IPropsLSTypes>()

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo')

        if (typeof userInfo === 'string') {
            setUser(JSON.parse(userInfo))
        }
    }, [])    

    return ( 
        <div className="inputBox" onSubmit={handleAdd}>
            <form>
                <div className="inputWrapper">
                    <input
                        type="text"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        placeholder={`${user?.name} enter your todos`}
                    />
                </div>
            </form>
        </div>
    )
}

export default Input;