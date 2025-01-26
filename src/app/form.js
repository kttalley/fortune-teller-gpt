'use client';
import { useState } from "react";

export default function Form() {
  const [fortuneTitle, setFortuneTitle] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const subject = event.target.subject.value;

    const response = await fetch('/api/fortune-teller-gpt/api', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ subject })
    });

    if (!response.ok) {
      console.error('Failed to fetch:', response.statusText);
      return;
    }

    const { data } = await response.json();
    setFortuneTitle(data);
  };

  return (
    <section aria-label="Fortune Teller Form" style={styles.formContainer}>
      
      <div style={{ textAlign: 'center'}}><h1 style={styles.heading}>🔮 Fortune Teller GPT</h1></div>
      <form onSubmit={onSubmitHandler} style={styles.form}>
         <div style={styles.resultContainer}>
        <p>{fortuneTitle ? "🔮 " + fortuneTitle : "Your fortune will appear here... 🔮"}</p>
      </div>
      <div style={{maxWidth: "100%", display: "flex", alignContent: "left", justifyContent: "left", fontSize: "1rem"
      }}>
        <label style={{textAlign: "left"}}htmlFor="subject">What subject requires elucidation?</label>
        </div>
        <input name='subject' placeholder='I would like to know more about...' />
        <button type="submit" aria-label="Tell my fortune">🦙 Tell my fortune...</button>
      </form>
     
    </section>
  );
}

const styles = {
  formContainer: {
    background: "linear-gradient(144deg, rgba(0, 0, 0, .85) 54%, #c82afa66 100%)",
    // border: "2px solid rgba(245, 48, 255, .6)",
    backdropFilter: "blur(12px)",
    padding: "2rem",
    width: "100%", // Adjust as needed for responsiveness
  },
  heading: {
    whiteSpace: "nowrap",
    width: "88%"
  },
  form: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  resultContainer: {
    background: "linear-gradient(144deg, rgba(0, 0, 0, .85) 54%, #c82afa66 100%)",
    border: "2px solid rgba(245, 48, 255, .6)",
    backdropFilter: "blur(12px)",
    backgroundBlendMode: "multiply",
    boxShadow: "0 10px 20px rgba(0, 0, 0, .8)",
    minWidth: "96%",
    padding: '24px',
    borderRadius: '8px',
    marginTop: '24px',
    marginBottom: '2rem'
  }
};