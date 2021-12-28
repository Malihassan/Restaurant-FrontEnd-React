import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import useInput from "../../../hooks/useInput";
import { accountAction } from "../../../Store/account";
import Input from "../../ui/input/Input";
import accountglobalclasses from "../globalStyle.module.css";
import classes from "./Login.module.css";
import GoogleLogin from "react-google-login";
import LoadingSpinner from "../../ui/spinner/LoadingSpinner";

function LoginForm(props) {
  const dispatch = useDispatch();
  const { hasError, isLoading, sendRequest } = useFetch();
  const [responseMessage, setResponseMessage] = useState("");
  const route = useRouter();
  useEffect(() => {
    setResponseMessage(props.responseMessage);
  }, []);
  const validEmail = (email) => {
    return email.trim().length !== 0 && email.includes("@");
  };
  const validPassword = (pass) => {
    return pass.trim().length >= 6;
  };

  const loginHandler = async (googleData) => {
    await sendRequest(
      {
        url: "https://alhendawy-node-server.herokuapp.com/ElhendawyRestaurant/loginWithGmail",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: googleData.tokenId }),
      },
      redirectionHandler
    );
  };
  const failureHandler = (response) => {
    console.log(response);
  };

  const {
    value: emailValue,
    hasError: emailHasError,
    isValid: emailIsValid,
    enteredValueHandeler: emailEnteredValueHandeler,
    inputBlureHandeler: emailInputBlureHandeler,
    resetStates: emailResetStates,
  } = useInput(validEmail);

  const {
    value: passwordValue,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    enteredValueHandeler: passwordEnteredValueHandeler,
    inputBlureHandeler: passwordInputBlureHandeler,
    resetStates: passwordResetStates,
  } = useInput(validPassword);

  let validForm = false;
  if (emailIsValid && passwordIsValid) {
    validForm = true;
  }
  const submitHandeler = async (e) => {
    e.preventDefault();
    try {
      const formData = { Email: emailValue, Password: passwordValue };
      await sendRequest(
        {
          //https://alhendawy-node-server.herokuapp.com/
          //http://localhost:7000/
          url: "https://alhendawy-node-server.herokuapp.com/ElhendawyRestaurant/login",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
        redirectionHandler
      );
    } catch (error) {
      console.log(error);
    }
  };

  async function redirectionHandler(response) {
    if (response.ok) {
      const result = await response.json();
      dispatch(accountAction.login(result.tokenID));
      route.replace("/");
      emailResetStates();
      passwordResetStates();
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
          <span className={accountglobalclasses.formtitle}>Sign In </span>
          <form onSubmit={submitHandeler} className={accountglobalclasses.form}>
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
              type="password"
              id="password"
              placeholder="Password"
              value={passwordValue}
              invalid={passwordHasError}
              onBlur={passwordInputBlureHandeler}
              onChange={passwordEnteredValueHandeler}
              required
            />
            <div className={classes.rememberContainer}>
              <div className={classes.rememberMe}>
                <input type="checkbox" value="lsRememberMe" id="idRememberMe" />
                <label htmlFor="rememberMe">Remember me</label>
              </div>

              <Link href="/account/forgetPassword" passHref>
                <a href="/" className={classes.link}>
                  Forget Password ?
                </a>
              </Link>
            </div>
            {responseMessage && (
              <p className={accountglobalclasses.responseMessage}>
                {responseMessage}
              </p>
            )}
            <div className={accountglobalclasses.buttonContainer}>
              <button
                type="submit"
                disabled={!validForm}
                className={accountglobalclasses.button}
              >
                Sign In
              </button>
            </div>
          </form>
          <GoogleLogin
            clientId="413684897547-2joj0mh2sien6if3m6jp3qsjuojce9v4.apps.googleusercontent.com"
            // clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className={`${accountglobalclasses.button} ${classes.signInWithGamil}`}
              >
                Sign In With Gmail
              </button>
            )}
            onSuccess={loginHandler}
            onFailure={failureHandler}
            cookiePolicy={"single_host_origin"}
          />
          <Link href="/account/signup" passHref>
            <a href="/" className={`${classes.link} ${classes.createAcount}`}>
              Create Acount ? <span> Sign Up </span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
