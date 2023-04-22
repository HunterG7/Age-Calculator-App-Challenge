"use strict";

//query selectors
const submitBtn = document.querySelector(".img-wrapper");

const dayErrorParent = document.querySelector("#day-error");
const monthErrorParent = document.querySelector("#month-error");
const yearErrorParent = document.querySelector("#year-error");

const dayDisplayParent = document.querySelector("#day-row p");
const monthDisplayParent = document.querySelector("#month-row p");
const yearDisplayParent = document.querySelector("#year-row p");

// event listener
submitBtn.addEventListener('click', (e)=>{
    dayErrorParent.innerHTML = "";
    monthErrorParent.innerHTML = "";
    yearErrorParent.innerHTML = "";

    let day = document.querySelector("#day-value").value;
    let month = document.querySelector("#month-value").value;
    let year = document.querySelector("#year-value").value;
    let validationCount = 0;

    dayMonthValidation(day, month, year, validationCount);
});


// calculates results and renders them onto page functions
const calculateResults = (day, month, year) => {




    renderResults();
}

const renderResults = (day, month, year) => {

}


// error functions
const dayError = (parent) =>{
    let errorElement = document.createElement("div");
    errorElement.innerHTML = `
        <p class="error-text">Must be a valid day</p> 
    `;
    console.log(parent);
    parent.append(errorElement);
}

const monthError = (parent) => {
    let errorElement = document.createElement("div");
    errorElement.innerHTML = `
        <p class="error-text">Must be a valid month</p> 
    `;
    console.log(parent);
    parent.append(errorElement);
}

const yearError = (parent) => {
    let errorElement = document.createElement("div");
    errorElement.innerHTML = `
        <p class="error-text">Must be a valid year</p> 
    `;
    console.log(parent);
    parent.append(errorElement);
}

const emptyFieldError = (parent) => {
    let errorElement = document.createElement("div");
    errorElement.innerHTML = `
        <p class="error-text">This field is required</p> 
    `;
    console.log(parent);
    parent.append(errorElement);
}


// validation functions
const dayMonthValidation = (dayStr, monthStr, yearStr, validationCount) => {
    let month = parseInt(monthStr);
    let day = parseInt(dayStr);
    let year = parseInt(yearStr);

    // checks basic day and month conditions
    if (monthStr.trim() === ""){
        emptyFieldError(monthErrorParent);
    } else if (isNaN(month) || month < 1 || month > 12){
        monthError(monthErrorParent);
    }
    if (dayStr.trim() === ""){
        emptyFieldError(dayErrorParent);
    } else if (isNaN(day) || day < 1 || day > 31){
        dayError(dayErrorParent);
    }

    // checks num of days based on year and month
    switch (month) {
        // checks leap year num of days
        case 2:
            if ((0 === year % 4) && (0 !== year % 100) || (0 === year % 400)) {
                if (day <= 29){
                    validationCount++;
                } else {
                    dayError(dayErrorParent);
                }
                yearValidation(day, month, yearStr, validationCount);
                break;
            } else {
                if (day <= 28){
                    validationCount++;
                } else {
                    dayError(dayErrorParent);
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
                dayError(dayErrorParent);
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
        emptyFieldError(yearErrorParent);
    } else if (isNaN(year) || year < 1 || year > 2023) {
        yearError(yearErrorParent);
    } else {
        validationCount++;
    }

    if (validationCount === 2){
        calculateResults(day, month, year);
    }
}

// CHATGPT CODE
// const calculateAgeDifference = (date1, date2) => {
//     const d1 = new Date(date1.year, date1.month - 1, date1.day);
//     const d2 = new Date(date2.year, date2.month - 1, date2.day);
//     const currentDate = new Date();
//
//     if (d1 > currentDate) {
//         return "Date 1 is in the future";
//     } else if (d2 > currentDate) {
//         return "Date 2 is in the future";
//     } else if (d1 > d2) {
//         return "Date 1 is later than date 2";
//     } else {
//         let years = d2.getFullYear() - d1.getFullYear();
//         let months = d2.getMonth() - d1.getMonth();
//         let days = d2.getDate() - d1.getDate();
//
//         if (months < 0) {
//             years--;
//             months += 12;
//         }
//
//         if (days < 0) {
//             months--;
//             const daysInPrevMonth = new Date(
//                 d2.getFullYear(),
//                 d2.getMonth(),
//                 0
//             ).getDate();
//             days += daysInPrevMonth;
//         }
//
//         return `${years} years, ${months} months, and ${days} days`;
//     }
// };
