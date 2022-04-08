// import { useEffect, useState } from 'react';
// import "./App.css"


// function App() {
//   let [count, setCount] = useState(0)
//   let [question, setQuestion] = useState("A really easy question?")
//   let [score, setScore] = useState(0)
//   let [answer, setAnswer] = useState("")
//   const object = {}


//   const getQuiz = async ()=>{
//     const url = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
//     const res = await fetch(url)
//     const data = await res.json()
//     // setQuestion(data.results[0].question)
//     // let correct_ans = data.results[0].correct_answer
//     // setAnswer(correct_ans)
//     // // console.log(data.results[0].correct_answer)
//     // c.push(data.results[0].correct_answer)
//     // console.log(data.results[0].incorrect_answers.map((e)=> console.log(e)))
    
//     console.log(data)
//   }

//   useEffect(()=>{
//     getQuiz()
//   }, [])


//   return (
//     // <div className="container">
//     //   <h1 className="question">{question}</h1>  
//     //   <button onClick={()=> setCount(count + 1)}>Next</button>
//     // </div>
//     <div>
//     {console.log(object)}
//     </div>
//   );
// }

// export default App;

import React, {useState, useEffect} from 'react'
import FlashcardList from './FlashcardList'
import "./App.css"
import axios from 'axios'



function App() {

  const [flashcards, setFlashcards] = useState([])

  useEffect(()=>{
    axios.get("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
    .then(res=>{
      setFlashcards(res.data.results.map((questionItem, index)=>{
        const answer = questionItem.correct_answer
        const options = [...questionItem.incorrect_answers.map((a)=> decodeString(a))
          , decodeString(answer)]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: answer,
          options: options.sort(()=> Math.random() - 0.5)
        }
      }))
    })
  }, [])

  function decodeString(str){
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  return (
    <FlashcardList flashcards={flashcards} />
  )
}


export default App
