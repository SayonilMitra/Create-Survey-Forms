import React, { useState } from "react"
import "./login.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import backendLink from "../../server/backendLink"

const Login = () => {

    const navigate = useNavigate()
    let [buttonText, setButtonText] = useState('Log in')

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    function login() {
        setButtonText('Please wait...')
        axios.post(`${backendLink}/login`, user)
            .then(res => {
                if (res.data.user_data === "ok") {
                    localStorage.setItem("userId", res.data.userId)
                    navigate('/dashboard')
                } else {
                    alert("Wrong credentials")
                    navigate("/login")
                }

            })
    }

    return (
        <div className="login-container">
            <div className="login-flavor-text">
                Welcome to
                Create Survey
                WebSite
            </div>
            <div className="login">
                <h1>Login</h1>
                <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
                <input type="text" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" ></input>
                <div className="button" onClick={login}>{buttonText}</div>
                <div>or</div>
                <div className="button" onClick={() => navigate("/register")}>Register</div>
            </div>
        </div>

    )
}

export default Login