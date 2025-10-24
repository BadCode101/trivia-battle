import Button from "./Button";
import "../mycss/style.css";

function QuestionCard({question,answers,handleAnswer })
{
    return(
    <div className="question-container">
        <h3 className="question" dangerouslySetInnerHTML={{__html: question}}/>
        
        <div>
            {answers.map((answers,index)=>
                <Button
                key={index}
                label={answers}
                onClick={()=>handleAnswer (answers)}
                />
            )};      
        </div>
    </div>    
    );
}
export default QuestionCard;