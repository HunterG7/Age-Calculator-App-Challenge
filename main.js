"use strict";

//variables
const submitBtn = document.querySelector(".img-wrapper");

const dayErrorParent = document.querySelector("#day-error");
const monthErrorParent = document.querySelector("#month-error");
const yearErrorParent = document.querySelector("#year-error");

const dayDisplay = document.querySelector("#day-row p");
const monthDisplay = document.querySelector("#month-row p");
const yearDisplay = document.querySelector("#year-row p");

// use these to style red border / label when error occurs
const dayLabel = document.querySelector("#day-input-box h2");
const monthLabel = document.querySelector("#month-input-box h2");
const yearLabel = document.querySelector("#year-input-box h2");

const dayInputBox = document.querySelector("#day-value");
const monthInputBox = document.querySelector("#month-value");
const yearInputBox = document.querySelector("#year-value");

const labels = document.querySelectorAll(".input-box h2");
const inputBoxes = document.querySelectorAll(".input-box input");

// event listener
submitBtn.addEventListener('click', (e)=>{
    dayErrorParent.innerHTML = "";
    monthErrorParent.innerHTML = "";
    yearErrorParent.innerHTML = "";

    labels.forEach((label)=>{
        label.style.color = "var(--smokey-grey)";
    });
    inputBoxes.forEach((inputBox)=>{
        inputBox.style.borderColor = "var(--light-grey)";
    });

    let day = document.querySelector("#day-value").value;
    let month = document.querySelector("#month-value").value;
    let year = document.querySelector("#year-value").value;
    let validationCount = 0;

    dayMonthValidation(day, month, year, validationCount);
});


// calculates results and renders them onto page functions
const calculateResults = (day, month, year) => {
    const inputDate = new Date(`${year}-${month}-${day}`);
    const currentDate = new Date();

    if (inputDate > currentDate) {
        futureDateError();
    } else {
        let yearDiff = currentDate.getFullYear() - inputDate.getFullYear();
        let monthDiff = currentDate.getMonth() - inputDate.getMonth();
        let dayDiff = currentDate.getDate() - inputDate.getDate();

        // Adjust the year and month difference if the day difference is negative
        if (dayDiff < 0) {
            monthDiff--;
            const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
            dayDiff += daysInMonth;
        }
        if (monthDiff < 0) {
            yearDiff--;
            monthDiff += 12;
        }

        renderResults(dayDiff,monthDiff, yearDiff);
    }
}

const renderResults = (day, month, year) => {
    dayDisplay.innerHTML = `<p>${day}</p>`;
    monthDisplay.innerHTML = `<p>${month}</p>`;
    yearDisplay.innerHTML = `<p>${year}</p>`;
}


// error functions
const dayError = (parent) =>{
    let errorElement = document.createElement("div");
    errorElement.innerHTML = `
        <p class="error-text">Must be a valid day</p> 
    `;
    parent.append(errorElement);
    dayLabel.style.color = "var(--light-red)";
    dayInputBox.style.borderColor = "var(--light-red)";
}

const monthError = (parent) => {
    let errorElement = document.createElement("div");
    errorElement.innerHTML = `
        <p class="error-text">Must be a valid month</p> 
    `;
    parent.append(errorElement);
    monthLabel.style.color = "var(--light-red)";
    monthInputBox.style.borderColor = "var(--light-red)";
}

const yearError = (parent) => {
    let errorElement = document.createElement("div");
    errorElement.innerHTML = `
        <p class="error-text">Must be a valid year</p> 
    `;
    parent.append(errorElement);
    yearLabel.style.color = "var(--light-red)";
    yearInputBox.style.borderColor = "var(--light-red)";
}

const emptyFieldError = (parent, label, inputBox) => {
    let errorElement = document.createElement("div");
    errorElement.innerHTML = `
        <p class="error-text">This field is required</p> 
    `;
    parent.append(errorElement);
    label.style.color = "var(--light-red)";
    inputBox.style.borderColor = "var(--light-red)";
}

const futureDateError = () => {
    let errorElement = document.createElement("div");
    errorElement.innerHTML = `
        <p class="error-text">Must be a valid date</p> 
    `;
    dayErrorParent.append(errorElement);

    labels.forEach((label)=>{
        label.style.color = "var(--light-red)";
    });
    inputBoxes.forEach((inputBox)=>{
        inputBox.style.borderColor = "var(--light-red)";
    });
}


// validation functions
const dayMonthValidation = (dayStr, monthStr, yearStr, validationCount) => {
    let month = parseInt(monthStr);
    let day = parseInt(dayStr);
    let year = parseInt(yearStr);

    // checks basic day and month conditions
    if (monthStr.trim() === ""){
        emptyFieldError(monthErrorParent, monthLabel, monthInputBox);
        validationCount--;
    } else if (isNaN(month) || month < 1 || month > 12){
        monthError(monthErrorParent);
        validationCount--;
    }
    if (dayStr.trim() === ""){
        emptyFieldError(dayErrorParent, dayLabel, dayInputBox);
        validationCount--;
    } else if (isNaN(day) || day < 1 || day > 31){
        dayError(dayErrorParent);
        validationCount--;
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
                    validationCount--;
                }
                yearValidation(day, month, yearStr, validationCount);
                break;
            } else {
                if (day <= 28){
                    validationCount++;
                } else {
                    dayError(dayErrorParent);
                    validationCount--;
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
                validationCount--;
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
        emptyFieldError(yearErrorParent, yearLabel, yearInputBox);
        validationCount--;
    } else if (isNaN(year) || year < 1) {
        yearError(yearErrorParent);
        validationCount--;
    } else {
        validationCount++;
    }

    console.log(validationCount);
    if (validationCount === 2){
        calculateResults(day, month, year);
    }
}


