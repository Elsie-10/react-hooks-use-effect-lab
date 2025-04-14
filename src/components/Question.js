import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    // set up the timeout to decrease time remaining by 1 every second
    const timerId = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        if(prevTime > 1){
          return prevTime - 1
        }else {
          onAnswered(false);
          return 10; // reset timer for the next question

        }
      });
    },1000);
    // clean up the timer
    return() => clearTimeout(timerId)
  },[timeRemaining,onAnswered])
      
//cleanup function to clear the timeout
  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
