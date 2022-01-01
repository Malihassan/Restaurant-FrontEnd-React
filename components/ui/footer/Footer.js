import Input from "../input/Input";
import classes from "./footer.module.css";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
} from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { MdAlternateEmail } from "react-icons/md";
import useInput from "../../../hooks/useInput";
import useFetch from "../../../hooks/useFetch";
import { useState } from "react";
function SubScribe(props) {
  const { hasError, isLoading, sendRequest } = useFetch();
  const [responseMessage, setResponseMessage ] = useState('');
  const {
    value: emailValue,
    hasError: emailHasError,
    isValid: emailIsValid,
    enteredValueHandeler: emailEnteredValueHandeler,
    inputBlureHandeler: emailInputBlureHandeler,
    resetStates: emailResetStates,
  } = useInput((emailValue) => {
    return emailValue.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
    );
  });

  let validSubscriberForm = false;
  if (emailIsValid) {
    validSubscriberForm = true;
  }
  const subscriberSubmitedFormHandler = async (e) => {
    e.preventDefault();

    const response = await sendRequest(
      {
        url: "https://alhendawy-node-server.herokuapp.com/ElhendawyRestaurant/subscribeNewsLetter",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ Email: emailValue }),
      },
      showResposne
    );

    emailResetStates();
  };
  async function showResposne(response) {
    if (response.ok) {
      setResponseMessage("Thank You For SubScribe");
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
    <div className={`${classes.mainContainer} ${props.className}`}>
      <div className={classes.footerContainer}>
        <div className={classes.logoContainer}>
          <span className={classes.logo}>El-HENDAWY.</span>
          <p className={classes.aboutRestauran}>
            The Elhendawy was founded in 1996 by momen alhendawy . the taste
            of an excellent meat dish.
          </p>
          <div className={classes.buttonContainer}>
            <button>
              <FaFacebookF />
            </button>
            <button>
              <FaInstagram />
            </button>
            <button>
              <FaTwitter />
            </button>
          </div>
        </div>
        <div className={classes.addressUsContainer}>
          <label>Address Us</label>
          <div className={classes.addressUs}>
            <div>
              <ImLocation className={classes.AddressIcons} />
              <span>Adress:21 Division St, Rangpur, RS 101215, RMS</span>
            </div>
            <div>
              <FaPhoneAlt className={classes.AddressIcons} />
              <span>
                Phone:+02 01095451290 <br /> 088 2354841
              </span>
            </div>
            <div>
              <MdAlternateEmail
                className={`${classes.AddressIcons} ${classes.emailIcon}`}
              />
              <span>Email: momenalhendawy@gmail.com</span>
            </div>
          </div>
        </div>
        <div className={classes.subScribeContainer}>
          <label>Newsletter</label>
          <div className={classes.formContainer}>
            <span className={classes.title}>Join Our Newsletter</span>
            <form
              className={classes.subScribeForm}
              onSubmit={subscriberSubmitedFormHandler}
            >
              <Input
                className={classes.subScribeInput}
                type="email"
                placeholder="Your Email"
                value={emailValue}
                invalid={emailHasError}
                onBlur={emailInputBlureHandeler}
                onChange={emailEnteredValueHandeler}
              />
              <button disabled={!validSubscriberForm}>Subscribe</button>
            </form>
            <p className={classes.commentMessage}>{responseMessage}</p>
            <div className={classes.comment}>
              and receive<span> Order </span> for free
            </div>
          </div>
        </div>
      </div>
      <div className={classes.Copyright}>
        Copyright © 2021 El-Hendawy Restaurant. All Rights Reserved.
      </div>
    </div>
  );
}
export default SubScribe;
