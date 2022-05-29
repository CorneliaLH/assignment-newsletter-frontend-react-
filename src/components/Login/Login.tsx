import { ChangeEvent, useState } from "react";
import { IUser } from "../../models/IUser";
import { UserService } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { INewUser } from "../../models/INewUser";

export function Login() {
  //variabler
  const [openNewUserTag, setOpenNewUserTag] = useState<boolean>(false);
  const [validationUserNameLength, setValidationUserNameLength] =
    useState(false);
  const [validationUserNameCharachters, setValidationUserNameCharachters] =
    useState(false);
  const [validationPasswordLength, setValidationPasswordLength] =
    useState(false);
  const [validationEmail, setValidationEmail] = useState(false);
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
    setValidationUserNameLength(false);
    setValidationUserNameCharachters(false);
    setValidationPasswordLength(false);
    setValidationEmail(false);
    if (newUserValues.userName.length < 3) {
      setValidationUserNameLength(true);
      return;
    } else if (/[`~,.<>;':"/[\]|{}()=_+-]/.test(newUserValues.userName)) {
      setValidationUserNameCharachters(true);
      return;
    } else if (newUserValues.password.length < 3) {
      setValidationPasswordLength(true);
      return;
    } else if (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUserValues.email) === false
    ) {
      setValidationEmail(true);
      return;
    } else {
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
    }
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
            type="password"
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
          {openNewUserTag ? (
            <p>
              Stäng skapa ny användare &nbsp;{" "}
              <span
                className="openNewUser"
                onClick={() => {
                  openNewUser();
                }}
              >
                här
              </span>
            </p>
          ) : (
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
          )}
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
            {validationUserNameLength ? (
              <span>Måste vara mer än 3 bokstäver</span>
            ) : (
              <></>
            )}
            {validationUserNameCharachters ? (
              <span>Får inte innehålla specialtecken</span>
            ) : (
              <></>
            )}
            <input
              type="password"
              placeholder="Lösenord "
              id="passwordNewUser"
              name="password"
              value={newUserValues.password}
              onChange={handleInputChangeNewUser}
            />
            {validationPasswordLength ? (
              <span>Måste vara mer än 3 tecken</span>
            ) : (
              <></>
            )}
            <input
              type="email"
              placeholder="E-mail"
              id="emailNewUser"
              name="email"
              value={newUserValues.email}
              onChange={handleInputChangeNewUser}
            />
            {validationEmail ? (
              <span>Måste vara e-mail format (xxxx@xxx.xx)</span>
            ) : (
              <></>
            )}
            <p className="subscribeBox">
              Kryssa här om du vill prenumerera på vårt nyhetsbrev:{" "}
              <input
                type="checkbox"
                id="checkboxNewUser"
                name="newsletter"
                onChange={handleInputChangeNewUser}
              />
            </p>

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
