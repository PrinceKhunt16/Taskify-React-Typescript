import { FC } from "react"
import "./App.css"
import Login from "./components/Login"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./components/Home"
import Register from "./components/Register"

interface IProtectedType {
  children: any
}

const App: FC = () => {
  const ProtectedRoute = ({ children }: IProtectedType) => {
    const userInfo = localStorage.getItem('userInfo')

    if (!userInfo) {
      return <Navigate to={'/login'} />
    }

    return children
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App