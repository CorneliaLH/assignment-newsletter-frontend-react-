import { ChangeEvent, useState } from "react";
import { IUser } from "../../models/IUser";
import { UserService } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { INewUser } from "../../models/INewUser";

export function Login() {
  //variabler
  const [openNewUserTag, setOpenNewUserTag] = useState<boolean>(false);
  const [logInValues, setLogInValues] = useState<IUser>({
    userName: "",
    password: "",
  });
  const [newUserValues, setNewUserValues] = useState<INewUser>({
    userName: "",
    password: "",
    email: "",
    newsletter: false,
  });

  const navigation = useNavigate();

  //inputvärden från login-fält
  function handleInputChangeLogin(e: ChangeEvent<HTMLInputElement>) {
    setLogInValues({ ...logInValues, [e.target.name]: e.target.value });
  }

  //inputvärden från ny-användare-fält
  function handleInputChangeNewUser(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.name !== "newsletter") {
      setNewUserValues({ ...newUserValues, [e.target.name]: e.target.value });
    } else {
      setNewUserValues({
        ...newUserValues,
        [e.target.name]: !newUserValues.newsletter,
      });
    }
  }

  //logga-in funktion
  function submitLogIn() {
    let service = new UserService();
    service.postLogIn(logInValues).then((response) => {
      console.log(response);
      if (response.status === "ok") {
        localStorage.setItem("userId", response.message);
        navigation("/main");
      } else {
        alert("Användare finns inte, försök gärna igen!");
      }
    });
    setLogInValues({
      userName: "",
      password: "",
    });
  }

  //skapa ny användare funktion
  function submitNewUser() {
    let service = new UserService();
    service.postNewUser(newUserValues).then((response) => {
      if (response.status === "ok") {
        alert("Ny användare är skapad, var vänlig logga in");
        setOpenNewUserTag(false);
        return;
      } else if (response.status === "error-namn finns redan") {
        alert("Användarnamn finns redan, prova med ett annat");
        return;
      } else if (response.status === "error-användarnamn krävs") {
        alert("Användarnamn och lösenord krävs");
        return;
      }
    });
    setNewUserValues({
      userName: "",
      password: "",
      email: "",
      newsletter: false,
    });
  }

  //Toggla ny användare fönster
  function openNewUser() {
    if (openNewUserTag === true) {
      setOpenNewUserTag(false);
    } else {
      setOpenNewUserTag(true);
    }
  }
  return (
    <>
      <div className="containerLogin">
        <h2 className="headingLogin">Var vänlig logga in nedan:</h2>
        <form className="formLogin">
          <input
            type="text"
            placeholder="Användarnamn"
            id="userLogin"
            name="userName"
            value={logInValues.userName}
            onChange={handleInputChangeLogin}
          />
          <input
            type="text"
            placeholder="Lösenord "
            id="passwordLogin"
            name="password"
            value={logInValues.password}
            onChange={handleInputChangeLogin}
          />
          <button
            type="submit"
            className="submitButtonLogin"
            onClick={(e) => {
              e.preventDefault();
              submitLogIn();
            }}
          >
            Logga in
          </button>
          <p>
            Skapa ny användare &nbsp;
            <span
              className="openNewUser"
              onClick={() => {
                openNewUser();
              }}
            >
              här
            </span>
          </p>
        </form>
      </div>
      {openNewUserTag ? (
        <div className="containerNewUser">
          <h2 className="headingLogin">Skapa ny användare: </h2>
          <form className="formNewUser">
            <input
              type="text"
              placeholder="Användarnamn"
              id="userNewUser"
              name="userName"
              value={newUserValues.userName}
              onChange={handleInputChangeNewUser}
            />
            <input
              type="text"
              placeholder="Lösenord "
              id="passwordNewUser"
              name="password"
              value={newUserValues.password}
              onChange={handleInputChangeNewUser}
            />
            <input
              type="email"
              placeholder="E-mail"
              id="emailNewUser"
              name="email"
              value={newUserValues.email}
              onChange={handleInputChangeNewUser}
            />
            <input
              type="checkbox"
              id="checkboxNewUser"
              name="newsletter"
              onChange={handleInputChangeNewUser}
            />
            <button
              type="submit"
              className="submitButtonNewUser"
              onClick={(e) => {
                e.preventDefault();
                submitNewUser();
              }}
            >
              Skapa ny användare
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
