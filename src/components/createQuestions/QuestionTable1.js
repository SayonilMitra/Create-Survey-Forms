import './QuestionTable1.css'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import CreateQuestion from './CreateQuestion'
import Sidebar from '../dashboard/SideBar'
import backendLink from '../../server/backendLink'

function QuestionTable1() {

    let [question, setQuestion] = useState({
        questionName: '',
        options: [],
        isMCQ: 'No',
        surveyId: '',
        isMCQ: 'No'
    })

    let [preview, setPreview] = useState(false)
    let [questionList, setQuestionList] = useState([])
    let [optionsText, setOptionText] = useState('')
    let [optionsList, setOptionsList] = useState([])

    // ========================== Adding each question to question list ==========================
    async function addQuestion() {
        if (question.questionName === '' || optionsList.length === 0) {
            alert('Question and options can not be empty')
        } else {
            let userId = localStorage.getItem('userId')
            let response = await axios(`${backendLink}/allSurveys/${userId}`)
            let surveyList = response.data
            let lastSurvey = surveyList.at(-1)
            let lastSurveyId = lastSurvey._id

            setQuestionList([...questionList,
            {
                ...question,
                options: [...optionsList],
                surveyId: lastSurveyId
            }])

            await axios.post(`${backendLink}/addQuestion`,
                {
                    ...question,
                    options: [...optionsList],
                    surveyId: lastSurveyId
                })
            setOptionsList([])
            setQuestion({ ...question, questionName: '' })
        }

    }

    // ========================== Update current question text ==========================
    function changeQuestion(e) {
        setQuestion({ ...question, questionName: e.target.value })
    }

    // ========================== add Option to Current Question ==========================
    function AddOption(e) {
        if (optionsText === '') {
            alert('option can not be empty')
        } else {
            let temp = optionsList
            temp.push(optionsText)
            setOptionsList([...temp])
            setOptionText('')
        }

    }

    // ========================== delete selected Option from Current Question ==========================
    function removeOption(index) {
        let temp = optionsList
        temp.splice(index, 1)
        setQuestion({ ...question, options: [...temp] })
    }

    // ========================== change current option text ==========================
    function changeOption(e) {
        setOptionText(e.target.value)
    }

    // ========================== change mcq status ==========================
    function changeMCQStatus(index, str) {
        let mcqStatus = question.isMCQ
        if (mcqStatus === 'Yes') {
            setQuestion({ ...question, isMCQ: 'No' })
        } else {
            setQuestion({ ...question, isMCQ: 'Yes' })
        }
    }

    return <div className="question-table">
        <Sidebar />
        <CreateQuestion preview={preview} setPreview={setPreview} />
        <ul>
            {/* ========================== display question list ========================== */}
            {questionList.map((questionItem, index) => {
                return <li key={index} className="question-item">
                    <div className='question-item-num'>Q{index + 1}</div>
                    <div className='question-item-question'>
                        {questionItem.questionName}
                    </div>
                    <div className='question-item-options'>
                        {/* ========================== display option list ========================== */}
                        {questionItem.options.map((options_item) => {
                            return <><input type={questionItem.isMCQ === 'No' ? 'radio' : 'checkbox'}
                                name={index} /> {options_item} <br /></>
                        })}
                    </div>
                    {/* <div className='question-item-msq-option'>
                        Enable Multiple Choice? {questionItem.isMCQ}<br />
                        <button id='mcq-yes' onClick={() => changeMCQStatus(index, 'Yes')}>Yes</button>
                        <button id='mcq-no' onClick={() => changeMCQStatus(index, 'No')}>NO</button> <br />
                    </div> */}
                    <div className='question-item-msq-option'>
                        Multiple Choice? <br />{questionItem.isMCQ}
                    </div>
                </li>
            })}
            {/* ========================== Add New question ========================== */}

            {!preview ? <li className='new-question-item'>
                <div className='new-question-item-row'>
                    Question
                </div>
                <div className='new-question-item-row'>
                    <input type='text' placeholder='Type your question' value={question.questionName} onChange={e => changeQuestion(e)} /> <br />
                </div>

                {/* ========================== Add new Option to current question ========================== */}
                <div className='new-question-item-row'>
                    <ul>
                        {optionsList.map((item, index) => {
                            return <li key={index} className='new-question-option-row'>
                                <div>{item} &nbsp;</div>
                                <button className='remove-Option' onClick={() => removeOption(index)}>x</button>
                            </li>
                        })}
                    </ul>
                </div>

                <div className='new-question-item-row'>
                    <input type='text' id='new-question-option-input' value={optionsText} placeholder='Type your option' onChange={e => changeOption(e)} /> &nbsp;
                    <button className='add-Option' onClick={AddOption}>+</button>
                </div>

                <div className='new-question-item-row'>
                    <button className='add-Question' onClick={addQuestion}>Add Question</button>
                    <div id='mcq-checkbox'>
                        <input type='checkbox' onChange={changeMCQStatus} /> Multiple Choice
                    </div>
                </div>


            </li> : <></>}

        </ul>

    </div>
}

export default QuestionTable1