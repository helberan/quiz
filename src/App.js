import './App.css';
import { useState } from 'react';
import questionData from './questions.json';

function App() {

  const [count, setCount] = useState(0);            //číslo otázky

  const [showScore, setShowScore] = useState(false);  //jakmile dojdeme na konec kvízu, stav této proměnné se změní na true a zobrazí se výsledky

  const [score, setScore] = useState(0);

  //funkce přepínající otázky a počítající skóre
  const next = (isCorrect) => {
   
    if (isCorrect === true) {
      const newScore = score + 1;
      setScore(newScore);
    }
   
    const nextQuestion = count + 1;
    if (questionData.length > nextQuestion) {
      setCount(nextQuestion);
    } else {
      setShowScore(true);
    }
  }

  const znovu = () => {
    setScore(0);
    setShowScore(false);
    setCount(0);
  }

  //komponent, který zobrazuje otázku a příslušné možnosti
  const Question = () => {
    return (
      <div className='card'>
        <p id='top'>Otázka {count+1}/{questionData.length}</p>
        <h2>{questionData[count].questionText}</h2>
        <div className='answers'>
          {questionData[count].answerOptions.map((question) => {
            return (<button id={question.id} onClick={() => next(question.isCorrect)}>{question.answer}</button>)
          })}
        </div>        
      </div>
    )
  }

  const ScoreCard = () => {
    return (
      <div className='card'>
        <h3>Vaše skóre je {score} z {questionData.length}</h3>
        <button id='znovu-btn' onClick={znovu}>Zkusit znovu</button>     
      </div>
    )
  }

  return (
    <div className="App">
      {showScore ? <ScoreCard /> : <Question />}
    </div>
  );
}

export default App;
