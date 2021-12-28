import { useState } from "react"

function useInput(validateFunc) {
    const [enteredValue,setEnteredValue] = useState('')
    const [isTouch ,setIsTouch] = useState(false)

    const isValid = validateFunc(enteredValue)
    const hasError = !isValid && isTouch

    function enteredValueHandeler(event) {
        setEnteredValue(event.target.value)
    }

    function inputBlureHandeler() {
        setIsTouch(true)
    }
    function resetStates() {
        setIsTouch(false)
        setEnteredValue("")
    }
    return {
        value :enteredValue,
        isValid ,
        hasError,
        enteredValueHandeler,
        inputBlureHandeler,
        resetStates
    }
}

export default useInput