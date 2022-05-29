import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewsletterService } from "../../services/NewsletterService";
import "./main.css";
export function Main() {
  //variabler
  const [subscriber, setSubscriber] = useState<boolean>();
  const navigation = useNavigate();

  //om userId finns i ls hämtar prenumerationsstatus från databasen genom service
  useEffect(() => {
    if (!localStorage.userId) {
      navigation("../");

      return;
    } else {
      let user = localStorage.getItem("userId");
      let service = new NewsletterService();
      service.getNewsletterSubscriber(user).then((response) => {
        if (response.newsletter === true) {
          setSubscriber(true);
        } else {
          setSubscriber(false);
        }
      });
    }
  }, []);

  //ändrar prenumerationsstatus i databasen genom service
  function changeSubscriberStatus() {
    let user = localStorage.getItem("userId");
    let service = new NewsletterService();
    service.changeNewsletterSubscriber(user).then((response) => {
      if (subscriber === true) {
        setSubscriber(false);
      } else {
        setSubscriber(true);
      }
    });
  }
  //logga ut från huvudsidan
  function logOut() {
    localStorage.removeItem("userId");
    navigation("/");
  }
  return (
    <>
      <div className="containerLogOutButton">
        <button className="logOutButton" onClick={logOut}>
          Logga ut
        </button>
      </div>
      <div className="containerMain">
        <h2>Välkommen!</h2>
        {subscriber ? (
          <div className="containerSubscriber">
            <p>
              Du <span className="spanSubscriber">prenumererar </span>på vårt
              nyhetsbrev!
            </p>
            <p>Här kan du avsluta din prenumeration: </p>
            <button
              onClick={() => {
                changeSubscriberStatus();
              }}
            >
              Avsluta prenumeration
            </button>
          </div>
        ) : (
          <div className="containerNoSubscriber">
            <p>
              Du prenumererar <span className="spanNoSubscriber">inte </span>på
              vårt nyhetsbrev!
            </p>
            <p>Här kan du påbörja din prenumeration: </p>
            <button
              onClick={() => {
                changeSubscriberStatus();
              }}
            >
              Påbörja prenumeration
            </button>
          </div>
        )}
      </div>
    </>
  );
}
