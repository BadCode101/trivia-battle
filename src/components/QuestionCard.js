import Button from "./Button";
import "../mycss/style.css";

function QuestionCard({question,answers,handleAnswer,selectedAnswer,correctAnswer})
{
    return(
    <div className="question-container">
        {/* Question */}
        <h3 className="question" dangerouslySetInnerHTML={{__html: question}}/>
        
        {/* Answer */}
        <div>
            {answers.map((answers,index)=>
                <Button
                key={index}
                label={answers}
                onClick={()=>handleAnswer(answers)}
                isSelected={selectedAnswer === answers}//pass to button
                isCorrect={correctAnswer}//pass to button
                />
            )};      
        </div>
    </div>    
    );
}
export default QuestionCard;