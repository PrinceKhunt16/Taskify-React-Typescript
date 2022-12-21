import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState('')
  const [dis, setDis] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const navigate = useNavigate()

  const handleError = () => {
    setTimeout(() => {
      setDis(false)
    }, 3000)
  }

  const submitHandler = async (e: any) => {
    e.preventDefault()
    setDisabled(true)

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.post(
        "/api/users/login",
        {
          name,
          password
        },
        config
      )

      localStorage.setItem('userInfo', JSON.stringify(data))

      setDisabled(false)
      setIsRegistered(true)
    } catch (e: any) {
      setDisabled(false)
      setDis(true)
      handleError()
      setError(e.response.data.message)
    }
  }

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
    if(userInfo){
      navigate('/')
    }
  }, [navigate])

  useEffect(() => {
    if(isRegistered){
      navigate('/')
    }
  }, [isRegistered, navigate])

  return (
    <div className="login">
      <div className="error" style={{ display: dis ? 'block' : 'none' }}>{error && <h1>{error}</h1>}</div>
      <div className="content">
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            />
          <input disabled={disabled} type="submit" value="Submit" />
        </form>
        <div className="other-link">
          If you have not account. <Link to={'/register'}>Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login