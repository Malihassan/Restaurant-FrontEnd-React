import { useDispatch, useSelector } from "react-redux";
import { bookedtable_ui_action } from "../../Store/bookedTable-ui";
import useInput from "../../hooks/useInput";
import Input, { Textarea } from "../ui/input/Input";
import Modal from "../ui/modal/Modal";
import classes from "./bookTable.module.css";
import useFetch from "../../hooks/useFetch";
import { useRouter } from "next/router";
import LoadingSpinner from "../ui/spinner/LoadingSpinner";
import { useState } from "react";

function changeTimeFormat(inputEle) {
  let timeSplit = inputEle.split(":"),
    hours,
    minutes,
    meridian;
  hours = timeSplit[0];
  minutes = timeSplit[1];
  if (hours > 12) {
    meridian = "PM";
    hours -= 12;
  } else if (hours < 12) {
    meridian = "AM";
    if (hours == 0) {
      hours = 12;
    }
  } else {
    meridian = "PM";
  }
  const t = `${hours}:${minutes} ${meridian}`;
  return t;
}
function BookTable() {
  const { hasError, isLoading, sendRequest } = useFetch();
  const [responseMessage, setResponseMessage] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state)=>state.account.token)
  const router  = useRouter()

  const {
    value: nameValue,
    hasError: nameHasError,
    isValid: nameIsValid,
    enteredValueHandeler: nameEnteredValueHandeler,
    inputBlureHandeler: nameInputBlureHandeler,
    resetStates: nameResetStates,
  } = useInput((name) => name.trim() !== "");
  const {
    value: emailValue,
    hasError: emailHasError,
    isValid: emailIsValid,
    enteredValueHandeler: emailEnteredValueHandeler,
    inputBlureHandeler: emailInputBlureHandeler,
    resetStates: emailResetStates,
  } = useInput((email) => email.trim() !== "" && email.includes("@"));
  const {
    value: phoneValue,
    hasError: phoneHasError,
    isValid: phoneIsValid,
    enteredValueHandeler: phoneEnteredValueHandeler,
    inputBlureHandeler: phoneInputBlureHandeler,
    resetStates: phoneResetStates,
  } = useInput((phone) => phone.match("^01[0125][0-9]{8}$"));
  const {
    value: numPeopleValue,
    hasError: numPeopleHasError,
    isValid: numPeopleIsValid,
    enteredValueHandeler: numPeopleEnteredValueHandeler,
    inputBlureHandeler: numPeopleInputBlureHandeler,
    resetStates: numPeopleResetStates,
  } = useInput((num) => num.trim() !== "" && num >= 2 && num <= 15);

  const {
    value: dateValue,
    hasError: dateHasError,
    isValid: dateIsValid,
    enteredValueHandeler: dateEnteredValueHandeler,
    inputBlureHandeler: dateInputBlureHandeler,
    resetStates: dateResetStates,
  } = useInput((date) => date.trim() !== "");
  const {
    value: timeValue,
    hasError: timeHasError,
    isValid: timeIsValid,
    enteredValueHandeler: timeEnteredValueHandeler,
    inputBlureHandeler: timeInputBlureHandeler,
    resetStates: timeResetStates,
  } = useInput((time) => time.trim() !== "");
  const {
    value: special_requestValue,
    hasError: special_requestHasError,
    isValid: special_requestIsValid,
    enteredValueHandeler: special_requestEnteredValueHandeler,
    inputBlureHandeler: special_requestInputBlureHandeler,
    resetStates: special_requestResetStates,
  } = useInput((special_request) => special_request.trim() !== "");

  let formIsValid = false;
  if (
    nameIsValid &&
    emailIsValid &&
    phoneIsValid &&
    numPeopleIsValid &&
    timeIsValid &&
    dateIsValid &&
    special_requestIsValid
  ) {
    formIsValid = true;
  }
  const hidePageHandeler = () => {
    dispatch(bookedtable_ui_action.toggleBookedTablePage());
  };
  const ReservedTableHandler = async () => {
    let bookedTime = changeTimeFormat(timeValue);
    const reservedTable = {
      Name:nameValue,
      Email:emailValue,
      Phone:phoneValue,
      NumberOfPeople:numPeopleValue,
      Time:bookedTime,
      Date:dateValue,
      SpecialRequest:special_requestValue,
    };

    if (!formIsValid) {
      return;
    }
    
    try {

      if (!auth) {
        hidePageHandeler()
        router.push('/account/login')
      }

       await sendRequest({
        url: "https://alhendawy-node-server.herokuapp.com/ElhendawyRestaurant/bookTable",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'token':auth
        },
        body: JSON.stringify(reservedTable),
      },redirectionHandler);

    } catch (error) {
      console.log(error);
    }
  };
  async function redirectionHandler(response) {
    if (response.ok) {
      setResponseMessage('thank you ,we will calling in three minutes');
        setTimeout(()=>{
          hidePageHandeler
        },2000)
      nameResetStates();
      emailResetStates();
      phoneResetStates();
      numPeopleResetStates();
      timeResetStates();
      dateResetStates();
      special_requestResetStates();
    }
    if (response.status == 500) {
      setResponseMessage('Server Error');
    }
    if (!response.ok) {
      let responseError = await response.json();
      setResponseMessage(responseError.response);
    }
  }
  return (
    <Modal onClose={hidePageHandeler} className={classes.module}>
      <div className={classes.bookTableContainer}>
        {isLoading && <LoadingSpinner/>}
        <label className={classes.booktableformtitle}>Reservation Table</label>
        <form className={classes.bookform}>
          <Input
            className={classes.booktext}
            type="text"
            id="name"
            // label="Name"
            placeholder="Name"
            value={nameValue}
            invalid={nameHasError}
            onBlur={nameInputBlureHandeler}
            onChange={nameEnteredValueHandeler}
          />
          <Input
            className={classes.booktext}
            type="email"
            id="bookemail"
            // label="Email"
            placeholder="Email"
            value={emailValue}
            invalid={emailHasError}
            onBlur={emailInputBlureHandeler}
            onChange={emailEnteredValueHandeler}
          />
          <Input
            className={classes.booktext}
            type="text"
            id="phone-number"
            // label="Phone Number"
            placeholder="Phone Number"
            value={phoneValue}
            invalid={phoneHasError}
            onBlur={phoneInputBlureHandeler}
            onChange={phoneEnteredValueHandeler}
          />

          <Input
            className={classes.booktext}
            type="number"
            id="numPeople"
            // label="Num Of Visitor"
            placeholder="Number Of Visitor"
            value={numPeopleValue}
            invalid={numPeopleHasError}
            onBlur={numPeopleInputBlureHandeler}
            onChange={numPeopleEnteredValueHandeler}
          />

          <Input
            className={classes.booktext}
            type="date"
            id="date"
            // label="Date"
            placeholder="Date"
            value={dateValue}
            invalid={dateHasError}
            onBlur={dateInputBlureHandeler}
            onChange={dateEnteredValueHandeler}
          />

          <Input
            className={classes.booktext}
            type="time"
            id="time"
            // label="Time"
            placeholder="time"
            value={timeValue}
            invalid={timeHasError}
            onBlur={timeInputBlureHandeler}
            onChange={timeEnteredValueHandeler}
            required
          />
          <Textarea
            className={classes.booktext}
            id="special-request"
            placeholder="Specail Request"
            value={special_requestValue}
            invalid={special_requestHasError}
            onBlur={special_requestInputBlureHandeler}
            onChange={special_requestEnteredValueHandeler}
          />
        </form>
        <p className={classes.responseMessage}>{responseMessage}</p>      
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={hidePageHandeler}>
            Close
          </button>
          <button className={classes.order} onClick={ReservedTableHandler} >
            Book
          </button>
        </div>
      </div>
    </Modal>
  );
}
export default BookTable;
