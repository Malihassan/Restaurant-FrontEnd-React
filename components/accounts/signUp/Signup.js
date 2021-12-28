import { useState } from "react";
import Link from "next/link";
import useFetch from "../../../hooks/useFetch";
import useInput from "../../../hooks/useInput";
import Input from "../../ui/input/Input";
import accountglobalclasses from "../globalStyle.module.css";
import classes from "./signup.module.css";
import LoadingSpinner from "../../ui/spinner/LoadingSpinner";

function Signup(props) {
  const { hasError, isLoading, sendRequest } = useFetch();
  const [selectedValue, setSelectedValue] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const validEmail = (email) => {
    return email.trim().length !== 0 && email.includes("@");
  };
  const validName = (name) => {
    return name.trim().length !== 0;
  };
  const validPassword = (pass) => {
    return pass.trim().length >= 6;
  };

  const {
    value: nameValue,
    hasError: nameHasError,
    isValid: nameIsValid,
    enteredValueHandeler: nameEnteredValueHandeler,
    inputBlureHandeler: nameInputBlureHandeler,
    resetStates: nameResetStates,
  } = useInput(validName);
  const {
    value: passwordValue,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    enteredValueHandeler: passwordEnteredValueHandeler,
    inputBlureHandeler: passwordInputBlureHandeler,
    resetStates: passwordResetStates,
  } = useInput(validPassword);
  const {
    value: emailValue,
    hasError: emailHasError,
    isValid: emailIsValid,
    enteredValueHandeler: emailEnteredValueHandeler,
    inputBlureHandeler: emailInputBlureHandeler,
    resetStates: emailResetStates,
  } = useInput(validEmail);
  const {
    value: phoneValue,
    hasError: phoneHasError,
    isValid: phoneIsValid,
    enteredValueHandeler: phoneEnteredValueHandeler,
    inputBlureHandeler: phoneInputBlureHandeler,
    resetStates: phoneResetStates,
  } = useInput((phone) => phone.match("^01[0125][0-9]{8}$"));

  const onChangeRadioHandeler = (event) => {
    if (event.target.value == ("male" || "female")) {
      setSelectedValue(event.target.value);
    }
  };
  let validForm = false;
  if (
    nameIsValid &&
    passwordIsValid &&
    emailIsValid &&
    phoneIsValid &&
    selectedValue
  ) {
    validForm = true;
  }

  const submitHandeler = async (event) => {
    event.preventDefault();
    if (!validForm) {
      return;
    }

    const data = {
      Name: nameValue,
      Password: passwordValue,
      Email: emailValue,
      Phone: phoneValue,
      Gander: selectedValue,
    };

    const response = await sendRequest(
      {
        url: "https://alhendawy-node-server.herokuapp.com/ElhendawyRestaurant/addNewAcount",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      },
      redirectionHandler
    );
  };

  async function redirectionHandler(response) {
    if (response.ok) {
      setResponseMessage("Check your Email For Verify Account");
      nameResetStates();
      passwordResetStates();
      emailResetStates();
      phoneResetStates();
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
    <div className={accountglobalclasses.main}>
      <div className={accountglobalclasses.mainOverlay}>
        {isLoading && <LoadingSpinner />}
        <div className={accountglobalclasses.container}>
          <span className={accountglobalclasses.formtitle}>Sign Up</span>
          <form onSubmit={submitHandeler} className={accountglobalclasses.form}>
            <Input
              className={accountglobalclasses.accountInputStyle}
              type="text"
              id="name"
              placeholder="Name"
              value={nameValue}
              invalid={nameHasError}
              onBlur={nameInputBlureHandeler}
              onChange={nameEnteredValueHandeler}
              required
            />
            <Input
              className={accountglobalclasses.accountInputStyle}
              type="password"
              id="password"
              placeholder="Password  (At least 6 characters)"
              value={passwordValue}
              invalid={passwordHasError}
              onBlur={passwordInputBlureHandeler}
              onChange={passwordEnteredValueHandeler}
              required
            />
            <Input
              className={accountglobalclasses.accountInputStyle}
              type="email"
              id="email"
              placeholder="Email"
              value={emailValue}
              invalid={emailHasError}
              onBlur={emailInputBlureHandeler}
              onChange={emailEnteredValueHandeler}
              required
            />
            <Input
              className={accountglobalclasses.accountInputStyle}
              type="text"
              id="phone-number"
              placeholder="Phone Number"
              value={phoneValue}
              invalid={phoneHasError}
              onBlur={phoneInputBlureHandeler}
              onChange={phoneEnteredValueHandeler}
            />
            <div className={classes.gander}>
              <label htmlFor="gender">Gender</label>
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={onChangeRadioHandeler}
                  required
                />
                <label htmlFor="male">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={onChangeRadioHandeler}
                  required
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
            {!hasError && (
              <p className={accountglobalclasses.responseMessage}>
                {responseMessage}
              </p>
            )}
            <div className={accountglobalclasses.buttonContainer}>
              <button className={accountglobalclasses.button}>Signup</button>
            </div>
          </form>
          <Link href="/account/login" passHref>
            <a href="/" className={classes.loginLink}>
              I have acount already ? <span> Login</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Signup;
