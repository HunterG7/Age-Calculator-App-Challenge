"use strict";

//query selectors
const submitBtn = document.querySelector(".img-wrapper");
const inputBoxParentDay = document.querySelector("#day-input-box");
const inputBoxParentMonth = document.querySelector("#month-input-box");
const inputBoxParentYear = document.querySelector("#year-input-box");

// event listener
submitBtn.addEventListener('click', (e)=>{
    let day = document.querySelector("#day-value").value;
    let month = document.querySelector("#month-value").value;
    let year = document.querySelector("#year-value").value;

    // button styling
    submitBtn.classList.add("clicked");
    setTimeout(()=>{
        submitBtn.classList.remove("clicked");
    }, 1000);

    let validationCount = 0;
    dayMonthValidation(day, month, year, validationCount);
});

// Receive validation errors if:
// Any field is empty when the form is submitted

// The day number is not between 1-31
// The month number is not between 1-12
// The year is in the future
// The date is invalid e.g. 31/04/1991 (there are 30 days in April)
// View the optimal layout for the interface depending on their device's screen size
// See hover and focus states for all interactive elements on the page
// Bonus: See the age numbers animate to their final number when the form is submitted

// error functions
const dayError = () =>{

}

const monthError = () => {

}

const yearError = () => {

}

const emptyFieldError = (parent) => {
    let errorElement = document.createElement("div");
    errorElement.innerHTML = `
        <p class="error-text">This field is required</p> 
    `;
    console.log(parent);
    parent.append(errorElement);
}

// render results onto page function
const renderResults = (day, month, year) => {

}

// validation functions
const dayMonthValidation = (dayStr, monthStr, yearStr, validationCount) => {
    let month = parseInt(monthStr);
    let day = parseInt(dayStr);
    let year = parseInt(yearStr);

    // checks basic day and month conditions
    if (monthStr.trim() === ""){
        emptyFieldError(inputBoxParentMonth);
    } else if (isNaN(month)){
        console.log("error");
    } else if (month < 1 || month > 12){
        console.log("error");
    }
    if (dayStr.trim() === ""){
        emptyFieldError(inputBoxParentDay);
    } else if (isNaN(day)){
        console.log("error");
    } else if (day < 1 || day > 31){
        console.log("error");
    }

    // checks num of days based on year and month
    switch (month) {
        // checks leap year num of days
        case 2:
            if ((0 === year % 4) && (0 !== year % 100) || (0 === year % 400)) {
                if (day <= 29){
                    validationCount++;
                } else {
                    console.log("error");
                }
                yearValidation(day, month, yearStr, validationCount);
                break;
            } else {
                if (day <= 28){
                    validationCount++;
                } else {
                    console.log("error");
                }
                yearValidation(day, month, yearStr, validationCount);
                break;
            }
        // checks months that have 30 days
        case 4:
        case 6:
        case 9:
        case 11:
            if (day <= 30){
                validationCount++;
            } else {
                console.log("error");
            }
            yearValidation(day, month, yearStr, validationCount);
            break;
        default:
            validationCount++;
            yearValidation(day, month, yearStr, validationCount);
            break;
    }
}

const yearValidation = (day, month, yearStr, validationCount) => {
    let year = parseInt(yearStr);
    if (yearStr.trim() === "") {
        emptyFieldError(inputBoxParentYear);
    } else if (isNaN(year)) {
        console.log("error");
    } else if (year < 1){
        console.log("error");
    } else {
        validationCount++;
    }

    if (validationCount === 2){
        renderResults(day, month, year);
    }
}