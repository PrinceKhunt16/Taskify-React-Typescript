import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()
    
    const logout = () => {
        localStorage.removeItem('userInfo')
        navigate('/login')
    }

    return (
        <header className="header">
            <h1>Taskify</h1>
            <div>
                <button onClick={logout}>Logout</button>
            </div>
        </header>
    )
}

export default Header;