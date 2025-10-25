import { useState, useEffect } from "react";
import QuestionCard from "./components/QuestionCard";
import StatisticBoard from "./components/StatisticsBoard";
import BottomBar from "./components/BottomBar";
import Welcome from "./components/Welcome";
import "./mycss/style.css";

function App() {

  const [questions, setQuestions] = useState([]);//setting default state
  const [currentIndex, setCurrentIndex] = useState(0);

  const [timeleft,setTimeLeft]=useState(20);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer,setSelectedAnswer]=useState(null);

  const [started,setStarted]=useState(false);
  const [gameCategory,setGameCategory]=useState("null");
  const [gameDifficulty,setGameDifficulty]=useState("any");

  const[correctAnswers,setCorrectAnswers]=useState(0);

  //Fetch API
  useEffect(() => {
  if (!started) return;

  let apiUrl = "https://opentdb.com/api.php?amount=10&type=multiple";
  if (gameCategory !== "any") apiUrl += `&category=${gameCategory}`;
  if (gameDifficulty !== "any") apiUrl += `&difficulty=${gameDifficulty}`;

  console.log("Fetching:", apiUrl);

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {console.log("API data:", data); 
      
      if (!data || !Array.isArray(data.results)) {
        console.error("Invalid API response:", data);
        setQuestions([]);
        return;
      }
      const formatted = data.results.map((q) => {
      const allAnswers = [...q.incorrect_answers];
      const randomIndex = Math.floor(Math.random() * 4);
        allAnswers.splice(randomIndex, 0, q.correct_answer);
        return {
          question: q.question,
          answers: allAnswers,
          correct: q.correct_answer,
          correct_answer: q.correct_answer,
        };
      });
      setQuestions(formatted);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      setQuestions([]);
    });
  }, [started, gameCategory, gameDifficulty]);


  //Timer
  useEffect(()=>{
    if(gameOver||!questions.length)return;
    if(timeleft===0){
      handleNext();
      return;
    }
    const timer=setTimeout(()=>setTimeLeft(timeleft-1),1000);
    return()=>clearTimeout(timer);
  },[timeleft,gameOver,questions]);

  //Answer
  const handleAnswer  = (answer) => {
    const correct = questions[currentIndex].correct_answer;
    setSelectedAnswer(answer);
    setCorrectAnswers(answer === correct);

    if (answer === correct)
       setScore(score + 1);
      
    setTimeout(() => {
      if (currentIndex + 1 < questions.length)
      {
        setCurrentIndex(currentIndex + 1);
        setTimeLeft(20);
        setSelectedAnswer(null);
        setCorrectAnswers(null);
      } else {
        setGameOver(true);
      }
    }, 800);
  };
  
  const startGame = ({ category, difficulty }) => {
    setGameCategory(category || "any");
    setGameDifficulty(difficulty || "any");
    setStarted(true);
    setQuestions([]);  // reset
    setCurrentIndex(0);
    setScore(0);
    setGameOver(false);
    setTimeLeft(20);
    setSelectedAnswer(null);
    setCorrectAnswers(null);
  };

  //Next Question
  const handleNext =()=>{
    if(currentIndex+1<questions.length){
      setCurrentIndex(currentIndex+1);
      setSelectedAnswer(null);
      setTimeLeft(20);
      setCorrectAnswers(null);
    }
    else{
      setGameOver(true);
    }
  };

  //Start new game
  const handleNewGame = () => {
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setGameOver(false);
    setTimeLeft(20);
    setSelectedAnswer(null);
    setCorrectAnswers(null);

    let apiUrl = "https://opentdb.com/api.php?amount=10&type=multiple";
    if (gameCategory !== "any") apiUrl += `&category=${gameCategory}`;
    if (gameDifficulty !== "any") apiUrl += `&difficulty=${gameDifficulty}`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        if (!data || !Array.isArray(data.results)) {
          setQuestions([]);
          return;
        }
        const formatted = data.results.map(q => {
          const allAnswers = [...q.incorrect_answers];
          const randomIndex = Math.floor(Math.random() * 4);
          allAnswers.splice(randomIndex, 0, q.correct_answer);
          return {
            question: q.question,
            answers: allAnswers,
            correct: q.correct_answer,
            correct_answer: q.correct_answer,
          };
        });
        setQuestions(formatted);
      })
      .catch(err => setQuestions([]));
  };

  if (!started) return <Welcome onStart={startGame} />;
  if (!questions.length && !gameOver) return <p>Loading questions...</p>;

  if (gameOver)
    return (
      <div 
      style={{ padding: "20px" }}>
        <h1>Game Over!</h1>
        <p>Your final score: {score} / {questions.length}</p>
      </div>
    );

  //UI
  return (
    <div 
      style={{ padding: "20px"}}>

        {/* Score board */}
        <StatisticBoard score={score} />
        
        {/* Timer ui element */}
        <div className="timer">Time Left:<span id="time">{timeleft}</span>sec</div> 
        
        {/* {Questions and Answers} */}
        <QuestionCard
          question={questions[currentIndex].question}
          answers={questions[currentIndex].answers}
          handleAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
          correctAnswer={questions[currentIndex].correct_answer}
        />

        {/* Bottom Bar with New Game and Quit buttons */}
        <BottomBar 
          onNewGame={handleNewGame}
          
        />
    </div>
  );
}
export default App;
