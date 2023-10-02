//Average's calculation
export function average(sum, count) {
    return parseFloat((sum / count).toFixed(2));
}

// Regex to add grade
export function isValidValue(value) {
    const VALUE_REGEX = /^(0|[1-9]|1[0-9]|20)$/;
    return VALUE_REGEX.test(value);
}
export function isValidDate(date) {
    const DATE_REGEX = /^(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:29|30|31)|(?:0[13-9]|1[0-2])-(?:0[1-9]|[1-2][0-9])|02-(?:0[1-9]|1[0-9]|2[0-8]))$/;
    return DATE_REGEX.test(date);
}
export function isDateBeforeToday(dateString) {
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[2]);
    const date = new Date(year, month, day);
    const today = new Date();
    return date <= today;
}
export function isValidComment(comment) {
    const COMMENT_REGEX = /^[a-zA-Z0-9À-ÿ\-_\s.,;:!?'()€$£&<>\/]+$/u;
    return COMMENT_REGEX.test(comment);
}
export function isValidGradeType(type) {
    let result = (type === "oral") || (type === "écrit")
    return result;
}

export function isValidGradeSubject(subject) {
    let result = (subject === "Histoire") || (subject === "Anglais") || (subject === "Physique") || (subject === "Français") || (subject === "Mathématiques");
    return result;
}

// email validation
export function isValidMail(mail) {
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_REGEX.test(mail);
}

//Request
export function performRequest() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://example.com/');
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4 || xhr.status !== 200) return;
        callback(xhr.response);
    };
    xhr.responseType = 'json';
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(null);
}

//Class's maths average
export async function mathClassAverage() {
    const response = await fetch("../server/grades.json");
    const data = await response.json();
    let gradeMathSomme = 0;
    let coefSomme = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].subject == "Mathématiques") {
            gradeMathSomme += parseInt(data[i].value) * parseInt(data[i].coef);
            coefSomme += parseInt(data[i].coef);
        }
    }
    const average = parseFloat(gradeMathSomme / coefSomme).toFixed(2);
    console.log("La moyenne de la classe en Maths est : " + average);
    return average;
}

//Class's french average
export async function frenchClassAverage() {
    fetch("../server/grades.json")
    const response = await fetch("../server/grades.json");
    const data = await response.json();
    let gradeFrenchSomme = 0;
    let coefSomme = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].subject == "Français") {
            gradeFrenchSomme += (parseInt(data[i].value) * parseInt(data[i].coef));
            coefSomme += parseInt(data[i].coef);
        }
    }
    console.log("La moyenne de la classe en Français est : " + parseFloat(gradeFrenchSomme / coefSomme).toFixed(2));
    return parseFloat(gradeFrenchSomme / coefSomme).toFixed(2);
}

//Class's history average
export async function historyClassAverage() {
    const response = await fetch("../server/grades.json");
    const data = await response.json();
    let gradeHistorySomme = 0;
    let coefSomme = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].subject == "Histoire") {
            gradeHistorySomme += (parseInt(data[i].value) * parseInt(data[i].coef));
            coefSomme += parseInt(data[i].coef);
        }
    }
    console.log("La moyenne de la classe en Histoire est : " + parseFloat(gradeHistorySomme / coefSomme).toFixed(2));
    return parseFloat(gradeHistorySomme / coefSomme).toFixed(2);
}

//Class's physical average
export async function physicalClassAverage() {
    const response = await fetch("../server/grades.json");
    const data = await response.json();
    let gradePhysiqueSomme = 0;
    let coefSomme = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].subject == "Physique") {
            gradePhysiqueSomme += (parseInt(data[i].value) * parseInt(data[i].coef));
            coefSomme += parseInt(data[i].coef);
        }
    }
    console.log("La moyenne de la classe en Physique est : " + parseFloat(gradePhysiqueSomme / coefSomme).toFixed(2));
    return parseFloat(gradePhysiqueSomme / coefSomme).toFixed(2);
}

//Class's english average
export async function englishClassAverage() {
    const response = await fetch("../server/grades.json");
    const data = await response.json();
    let gradeEnglishSomme = 0;
    let coefSomme = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].subject == "Anglais") {
            gradeEnglishSomme += (parseInt(data[i].value) * parseInt(data[i].coef));
            coefSomme += parseInt(data[i].coef);
        }
    }
    console.log("La moyenne de la classe en Anglais est : " + parseFloat(gradeEnglishSomme / coefSomme).toFixed(2));
    return parseFloat(gradeEnglishSomme / coefSomme).toFixed(2);
}

//Class Global average
export async function globalAverage() {
    const mathAverage = await mathClassAverage();
    const frenchAverage = await frenchClassAverage();
    const englishAverage = await englishClassAverage();
    const historyAverage = await historyClassAverage();
    const physicalAverage = await physicalClassAverage();
    let globalClassAverage = ((parseFloat(mathAverage) + parseFloat(frenchAverage) + parseFloat(englishAverage) + parseFloat(historyAverage) + parseFloat(physicalAverage)) / 5).toFixed(2);
    console.log("La moyenne globale de la classe est : " + globalClassAverage);
    return globalClassAverage;
}
