import React, { useState } from 'react'

function Flashcard({flashcard}) {

    const [flip, setFlip] = useState(false)

  return (
    <div
     className={`card ${flip ? 'flip': ''}`}
     onClick={()=> setFlip(!flip)}>
     <div class="front">
        {flashcard.question}
        <div class="options">
            {flashcard.options.map(option => {
                return <div className="flashcard-option">{option}</div>
            })}
        </div>
     </div>
     <div className="back">{flashcard.answer}</div>
    </div>
  )
}

export default Flashcard