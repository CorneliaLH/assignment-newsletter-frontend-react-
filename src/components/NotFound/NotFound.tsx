import "./notFound.css";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigation = useNavigate();
  function navigateStartPage() {
    navigation("../");
  }
  return (
    <>
      <div className="containerNotFound">
        <div className="notFoundCard">
          <h2>
            <span className="404">404</span> Sidan finns inte!
          </h2>
          <button onClick={navigateStartPage}>Tillbaka till startsidan</button>
        </div>
      </div>
    </>
  );
}
