import "../mycss/style.css";

function Button({ label, onClick }) {
  return (
    <div className="button-container">
    <button className="button" onClick={onClick}>
      {label}
    </button>
    </div>
  );
}

export default Button;
