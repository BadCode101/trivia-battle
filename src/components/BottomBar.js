import "../mycss/style.css";

function BottomBar({onNewGame}) {
  return (
    <div className="bottom-bar-container">
      <div className="bottom-bar">
          <button type="button" className="bottom-bar-button" onClick={onNewGame}>New Game</button>
          
          {/* <button type="button" className="bottom-bar-button">Reset</button> */}
      </div>
    </div>
  );
}
export default BottomBar;