import Navbar from './Navbar'
import QuestionTable1 from './QuestionTable1'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function FullCreateQuestionPage() {
    // ================================= Check if user is logged in =================================
    let navigate = useNavigate()
    useEffect(() => {
        let loginStatus = localStorage.getItem("userId")
        if (loginStatus === null) {
            // user not logged in, redirect to login page
            navigate('/login')
        }
    }, [])

    return <>
        <Navbar />
        <QuestionTable1 />
    </>
}

export default FullCreateQuestionPage