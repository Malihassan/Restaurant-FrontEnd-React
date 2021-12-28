import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import useInput from "../../../hooks/useInput";
import Input from "../../ui/input/Input";
import LoadingSpinner from "../../ui/spinner/LoadingSpinner";
import globalStyle from "../globalStyle.module.css";
import classes from "./forgetPass.module.css";
function ForgetPass(props) {
  const { hasError, isLoading, sendRequest } = useFetch();
  const [responseMessage, setResponseMessage] = useState("");

  const validEmail = (email) => {
    return email.trim().length !== 0 && email.includes("@");
  };
  const {
    value: emailValue,
    hasError: emailHasError,
    isValid: emailIsValid,
    enteredValueHandeler: emailEnteredValueHandeler,
    inputBlureHandeler: emailInputBlureHandeler,
    resetStates: emailResetStates,
  } = useInput(validEmail);

  let validForm = false;
  if (emailIsValid) {
    validForm = true;
  }
  const formHandeler = async (e) => {
    e.preventDefault();
    const response = await sendRequest(
      {
        url: "https://alhendawy-node-server.herokuapp.com/ElhendawyRestaurant/forgetPassword",
        method: "POST",
        body: JSON.stringify({ Email: emailValue }),
        headers: {
          "Content-Type": "application/json",
        },
      },
      redirectionHandler
    );
    console.log(response);
    emailResetStates();
  };
  async function redirectionHandler(response) {
    if (response.ok) {
      emailResetStates();
      setResponseMessage("Seccess Send Order");
    }
    if (response.status == 500) {
      setResponseMessage("Server Error");
    }
    if (!response.ok) {
      let responseError = await response.json();
      setResponseMessage(responseError.response);
    }
  }
  return (
    <div className={globalStyle.main}>
      <div className={globalStyle.mainOverlay}>
      {isLoading && <LoadingSpinner />}
        <div className={globalStyle.container}>
          <p className={classes.sendEmailMessage}>
            Enter your user account's verified email address and we will send
            you a password reset link.
          </p>
          <form className={globalStyle.form} onSubmit={formHandeler}>
            <Input
              className={globalStyle.accountInputStyle}
              type="email"
              id="email"
              placeholder="Email"
              value={emailValue}
              invalid={emailHasError}
              onBlur={emailInputBlureHandeler}
              onChange={emailEnteredValueHandeler}
              required
            />
            {!hasError && (
              <p className={globalStyle.responseMessage}>{responseMessage}</p>
            )}
            <div className={globalStyle.buttonContainer}>
              <button disabled={!validForm} className={globalStyle.button}>
                Send Code
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ForgetPass;
