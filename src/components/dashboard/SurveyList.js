import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SurveyListItem from "./SurveyListItem"
import './SurveyList.css'
import searchIcon from '../../images/search.png'
import axios from 'axios'
import backendLink from "../../server/backendLink"

function SurveyList() {

    const navigate = useNavigate()

    // ================================= Check if user is logged in =================================
    useEffect(() => {
        let loginStatus = localStorage.getItem("userId")
        if (loginStatus === null) {
            // user not logged in, redirect to login page
            navigate('/')
        }
    }, [])

    // ================================= Fetch surveys from database =================================
    let [surveyList, setSurveyList] = useState([])
    useEffect(() => {
        let userId = localStorage.getItem('userId')
        async function fetchSurveys() {
            let response = await axios.get(`${backendLink}/allSurveys/${userId}`)
            let surveyList = await response.data
            setSurveyList(surveyList)
        }
        fetchSurveys()
    }, [])

    // ================================= Search survey name =================================
    let [searchText, setSearchText] = useState('')

    // ================================= Sort surveys by name =================================
    async function sortSurvey() {
        let userId = localStorage.getItem('userId')
        let response = await axios.get(`${backendLink}/sort/${userId}`)
        let searchResult = response.data
        setSurveyList(searchResult)
    }

    // ================================= Redirect to Create Survey Page =================================
    function createSurvey() {
        navigate('/createSurvey')
    }

    // ================================= Log Out user =================================
    function logOut() {
        navigate('/login')
        localStorage.removeItem("userId")
    }

    return <div className="container">
        <div className="survey-list-container">
            <div className="nav-bar">
                <div className="logo">DashBoard</div>
                <div className="log-out" onClick={logOut}>Log Out</div>
            </div>
            <div className="header">
                Survey list
                <span className="icon" >
                    <img src={searchIcon} />
                </span >
                <input type='text' id='survey-list-search-input' onChange={(e) => setSearchText(e.target.value)} />
                {/*<button className="survey-list-header-buttons" id="survey-list-search" onClick={startSearchText}>Search</button>*/}
                <button className="survey-list-header-buttons" id="survey-list-sort" onClick={sortSurvey}>Sort</button>
                <button className="survey-list-header-buttons" id="survey-list-create" onClick={createSurvey}>Create</button>
            </div>
            <div className="info-surveyList">
                <div className="info-bar">
                    <div>Name</div >
                    <div>Description</div >
                    <div>Type</div >
                    <div>Start Date</div >
                    <div>End Date</div >
                    <div>Actions</div >
                </div >
                <div className="survey-list">
                    <ul>
                        {surveyList.map((item, index) => {
                            return <li key={index}>
                                <SurveyListItem listItem={item} searchText={searchText} />
                            </li>
                        })}
                    </ul>
                </div>
            </div>


        </div>

    </div>

}

export default SurveyList