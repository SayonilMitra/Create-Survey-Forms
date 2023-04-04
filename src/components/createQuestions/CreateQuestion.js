import React from 'react';
import './CreateQuestion.css'
import { useNavigate } from 'react-router-dom';

function CreateQuestion() {
  const navigate = useNavigate()
  return (
    <div className="button-group">
      <span>Create Questions</span>
      <div className="button-group-right">
        <button onClick={() => {
          navigate('/dashboard')
        }}>Save</button>
      </div>
    </div>
  );
}

export default CreateQuestion;
