// code/story-generator/src/app/Form.js
'use client';
import { useState } from "react";


export default function Form() {
  const [fortuneTitle, setFortuneTitle] = useState();
  
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const subject = event.target.subject.value;
    //call the llm with the subject as the main prompt
    const response = await fetch('api' , {
      method: "POST",
      body: JSON.stringify({ subject })
    })
    //destructure and print out the response's data
    const {data} = await response.json()
    
    setFortuneTitle(data)
  }

  return (
    <>
      <h1>🔮 the fortune teller </h1>
      <em>this app uses a GPT Model to tell your fortune.</em>
    <form onSubmit={onSubmitHandler}>
      <label htmlFor="subject">what subject requires elucidation? </label>
      <input name='subject' placeholder='subject...' />
      <button>🦙 tell me a fortune...</button>
    </form>
     <p>{ fortuneTitle }</p>
    </>
  );
}

