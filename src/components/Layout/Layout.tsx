import { Outlet } from "react-router-dom";
import "./layout.css";

export function Layout() {
  return (
    <>
      <header className="header">
        <div>
          <h1>NYHETSBREV</h1>
        </div>
      </header>
      <main className="main">
        <Outlet></Outlet>
      </main>
      <footer>
        <div className="footerContainer">
          <p>footer</p>
        </div>
      </footer>
    </>
  );
}
