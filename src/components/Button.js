import "../mycss/style.css";

function Button({ label, onClick, isSelected, isCorrect }) {
  //property for styling based on answer correctness
  let buttonclass = "button";
  if(isSelected){
    buttonclass += isCorrect ? "correct" : "wrong";
  }

  //UI
  return (
    <div className="button-container">
    <button className={buttonclass} onClick={onClick}>
      {label}
    </button>
    </div>
  );
}
export default Button;
