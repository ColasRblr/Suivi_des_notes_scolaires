//  Restricted access : if no connection (= empty local storage) then redirection
let storage = localStorage.length;
// console.log(storage);
if (storage == 0) {
  window.location.href = "./index.html";
}

//--------Displaying student picture--------------
import {
  average,
  mathClassAverage,
  frenchClassAverage,
  historyClassAverage,
  physicalClassAverage,
  englishClassAverage,
  globalAverage,
} from "./controller.js";

let userInfo = JSON.parse(localStorage.getItem("userInfo"));
let studentAverageContent = document.querySelector("#student-average");
let typeUser = userInfo.type;
let mathGrades = [];
let historyGrades = [];
let englishGrades = [];
let physiqueGrades = [];
let frenchGrades = [];
let coefMathGrades = [];
let coefHistoryGrades = [];
let coefEnglishGrades = [];
let coefPhysiqueGrades = [];
let coefFrenchGrades = [];
let coefmath = null;
let coeffrench = null;
let coefenglish = null;
let coefphysique = null;
let coefhistory = null;
let tdMath = null;
let tdFrench = null;
let tdEnglish = null;
let tdPhysique = null;
let tdHistory = null;
let mathSomme = 0;
let coefMathSomme = 0;
let frenchSomme = 0;
let coefFrenchSomme = 0;
let englishSomme = 0;
let coefEnglishSomme = 0;
let physiqueSomme = 0;
let coefPhysiqueSomme = 0;
let historySomme = 0;
let coefHistorySomme = 0;
export let globalStudentAverage = 0;

// let studentController = require('./controllerStudent');

// Student datas displayed if user connected is a student

if (typeUser == "student") {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "./server/students.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var xmlDoc = JSON.parse(xhr.response);

      console.log(userInfo);
      for (let i = 0; i < xmlDoc.length; i++) {
        if (xmlDoc[i].id == userInfo.id) {
          // displaying name and picture of the student
          document.querySelector("#picAndLogout").innerHTML += `
                        <img src=${xmlDoc[i].picture} alt="student picture" class="img-fluid rounded-circle">
                        <div id="name-content">${xmlDoc[i].firstname} ${xmlDoc[i].lastname}</div>`;

          document.querySelector(
            "h1"
          ).innerHTML = `Bulletin de ${xmlDoc[i].firstname} ${xmlDoc[i].lastname}`;
        }
      }
    }
  };
  xhr.send();
  let idStudent = userInfo.id;
  console.log(idStudent);

  // Displaying school report
  let studentReport = document.querySelector("#studentReport");
  var xhr1 = new XMLHttpRequest();

  xhr1.open("GET", "./server/grades.json", true);
  xhr1.onreadystatechange = function () {
    if (xhr1.readyState === 4 && xhr1.status === 200) {
      var xmlDoc1 = JSON.parse(xhr1.response);
      // console.log(xmlDoc1);

      for (let i = 0; i < xmlDoc1.length; i++) {
        if (xmlDoc1[i].id_student == idStudent) {
          // if (i % 2 == 0) {

          switch (xmlDoc1[i].subject) {
            case "Mathématiques":
              mathGrades.push([xmlDoc1[i].id, xmlDoc1[i].value]);
              if (!coefmath) {
                document.querySelector(
                  ".maths"
                ).innerHTML += `<td class="coef-content-math"></td>`;
                coefmath = true;
              }
              document.querySelector(
                ".coef-content-math"
              ).innerHTML += `<span>${xmlDoc1[i].coef}</span>`;
              coefMathGrades.push(xmlDoc1[i].coef);
              break;
            case "Histoire":
              historyGrades.push([xmlDoc1[i].id, xmlDoc1[i].value]);
              if (!coefhistory) {
                document.querySelector(
                  ".history"
                ).innerHTML += `<td class="coef-content-history"></td>`;
                coefhistory = true;
              }
              document.querySelector(
                ".coef-content-history"
              ).innerHTML += `<span>${xmlDoc1[i].coef}</span>`;
              coefHistoryGrades.push(xmlDoc1[i].coef);
              break;
            case "Anglais":
              englishGrades.push([xmlDoc1[i].id, xmlDoc1[i].value]);
              if (!coefenglish) {
                document.querySelector(
                  ".english"
                ).innerHTML += `<td class="coef-content-english"></td>`;
                coefenglish = true;
              }
              document.querySelector(
                ".coef-content-english"
              ).innerHTML += `<span>${xmlDoc1[i].coef}</span>`;
              coefEnglishGrades.push(xmlDoc1[i].coef);
              break;
            case "Physique":
              physiqueGrades.push([xmlDoc1[i].id, xmlDoc1[i].value]);
              if (!coefphysique) {
                document.querySelector(
                  ".physique"
                ).innerHTML += `<td class="coef-content-physique"></td>`;
                coefphysique = true;
              }
              document.querySelector(
                ".coef-content-physique"
              ).innerHTML += `<span>${xmlDoc1[i].coef}</span>`;
              coefPhysiqueGrades.push(xmlDoc1[i].coef);
              break;
            case "Français":
              frenchGrades.push([xmlDoc1[i].id, xmlDoc1[i].value]);
              if (!coeffrench) {
                document.querySelector(
                  ".french"
                ).innerHTML += `<td class="coef-content-french"></td>`;
                coeffrench = true;
              }
              document.querySelector(
                ".coef-content-french"
              ).innerHTML += `<span>${xmlDoc1[i].coef}</span>`;
              coefFrenchGrades.push(xmlDoc1[i].coef);
              break;
            default:
              console.log(`Sorry, innexpected error happened`);
          }
        }
      }

      // Maths
      for (let j = 0; j < mathGrades.length; j++) {
        if (!tdMath) {
          document.querySelector(
            ".maths"
          ).innerHTML += `<td class="grade-content-maths"></td>`;
          tdMath = true;
        }
        document.querySelector(
          ".grade-content-maths"
        ).innerHTML += `<button class="grades" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id=${mathGrades[j][0]}>${mathGrades[j][1]}</button>`;
        mathSomme += parseInt(mathGrades[j][1]) * parseInt(coefMathGrades[j]);
        coefMathSomme += parseInt(coefMathGrades[j]);
      }
      let mathAverage = average(parseInt(mathSomme), parseInt(coefMathSomme));
      globalStudentAverage += parseFloat(mathAverage);
      document.querySelector(".maths").innerHTML += `
      <td class="average"><span>${mathAverage}</span></td>
      <td class="graph_link">
      <input type="image" class="chartButton" data-bs-toggle="modal" data-bs-target="#staticSubject" data-subject="Mathématiques" data-average="${mathAverage}" src="./assets/stats.png" alt="graph_link" width="70">
      </td>
      `;
      // French
      for (let j = 0; j < frenchGrades.length; j++) {
        if (!tdFrench) {
          document.querySelector(
            ".french"
          ).innerHTML += `<td class="grade-content-french"></td>`;
          tdFrench = true;
        }
        document.querySelector(
          ".grade-content-french"
        ).innerHTML += `<button class="grades" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id=${frenchGrades[j][0]}>${frenchGrades[j][1]}</button>`;
        frenchSomme +=
          parseInt(frenchGrades[j][1]) * parseInt(coefFrenchGrades[j]);
        coefFrenchSomme += parseInt(coefFrenchGrades[j]);
      }
      let frenchAverage = average(
        parseInt(frenchSomme),
        parseInt(coefFrenchSomme)
      );
      globalStudentAverage += parseFloat(frenchAverage);
      document.querySelector(".french").innerHTML += `
      <td class="average"><span>${frenchAverage}</span></td>
      <td class="graph_link">
      <input type="image" class="chartButton" data-bs-toggle="modal" data-bs-target="#staticSubject" data-subject="Français" data-average="${frenchAverage}" src="./assets/stats.png" alt="graph_link" width="70">
      </td>
      `;

      // English
      for (let j = 0; j < englishGrades.length; j++) {
        if (!tdEnglish) {
          document.querySelector(
            ".english"
          ).innerHTML += `<td class="grade-content-english"></td>`;
          tdEnglish = true;
        }
        document.querySelector(
          ".grade-content-english"
        ).innerHTML += `<button class="grades" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id=${englishGrades[j][0]}>${englishGrades[j][1]}</button>`;
        englishSomme +=
          parseInt(englishGrades[j][1]) * parseInt(coefEnglishGrades[j]);
        coefEnglishSomme += parseInt(coefEnglishGrades[j]);
      }
      let englishAverage = average(
        parseInt(englishSomme),
        parseInt(coefEnglishSomme)
      );
      englishAverage = englishAverage.toFixed(2);
      globalStudentAverage += parseFloat(englishAverage);
      document.querySelector(".english").innerHTML += `
      <td class="average"><span>${englishAverage}<span></td>
      <td class="graph_link">
      <input type="image" class="chartButton" data-bs-toggle="modal" data-bs-target="#staticSubject" data-subject="Anglais" data-average="${englishAverage}" src="./assets/stats.png" alt="graph_link" width="70">
      </td>
      `;

      // Physique
      for (let j = 0; j < physiqueGrades.length; j++) {
        if (!tdPhysique) {
          document.querySelector(
            ".physique"
          ).innerHTML += `<td class="grade-content-physique"></td>`;
          tdPhysique = true;
        }

        document.querySelector(
          ".grade-content-physique"
        ).innerHTML += `<button class="grades" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id=${mathGrades[j][0]}>${physiqueGrades[j][1]}</button>`;
        physiqueSomme +=
          parseInt(physiqueGrades[j][1]) * parseInt(coefPhysiqueGrades[j]);
        coefPhysiqueSomme += parseInt(coefPhysiqueGrades[j]);
      }
      let physiqueAverage = average(
        parseInt(physiqueSomme),
        parseInt(coefPhysiqueSomme)
      );
      physiqueAverage = physiqueAverage.toFixed(2);
      globalStudentAverage += parseFloat(physiqueAverage);
      document.querySelector(".physique").innerHTML += `
      <td class="average"><span>${physiqueAverage}<span></td>
      <td class="graph_link">
      <input type="image" class="chartButton" data-bs-toggle="modal" data-bs-target="#staticSubject" data-subject="Physique" data-average="${physiqueAverage}" src="./assets/stats.png" alt="graph_link" width="70">
      </td>
      `;

      // History
      for (let j = 0; j < historyGrades.length; j++) {
        if (!tdHistory) {
          document.querySelector(
            ".history"
          ).innerHTML += `<td class="grade-content-history"></td>`;
          tdHistory = true;
        }
        document.querySelector(
          ".grade-content-history"
        ).innerHTML += `<button class="grades" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id=${historyGrades[j][0]}>${historyGrades[j][1]}</button>`;
        historySomme +=
          parseInt(historyGrades[j][1]) * parseInt(coefHistoryGrades[j]);
        coefHistorySomme += parseInt(coefHistoryGrades[j]);
      }
      let historyAverage = average(
        parseInt(historySomme),
        parseInt(coefHistorySomme)
      );
      historyAverage = historyAverage.toFixed(2);
      globalStudentAverage += parseFloat(historyAverage);
      document.querySelector(".history").innerHTML += `
      <td class="average"><span>${historyAverage}<span></td>
      <td class="graph_link">
      <input type="image" class="chartButton" data-bs-toggle="modal" data-bs-target="#staticSubject" data-subject="Histoire" data-average="${historyAverage}" src="./assets/stats.png" alt="graph_link" width="70">
      </td>
      `;
    }
    globalStudentAverage /= 5;
    studentAverageContent.innerHTML = `Moyenne générale : ${globalStudentAverage.toFixed(
      2
    )}`;
    function loadModals() {
      var script = document.createElement("script");
      script.src = "./js/modals.js";
      script.type = "module";
      document.getElementsByTagName("body")[0].appendChild(script);
    }
    loadModals();
  };

  xhr1.send();

  // Displaying student datas if teacher is connected
} else if (typeUser == "teacher") {
  // Restricted access to update and delete buttons for grades
  let modalFooter = document.getElementById("modalFooter");
  modalFooter.innerHTML = `<button type="button" class="btn btn-secondary modif-grade-btn" data-dismiss="modal">Modifier</button>
  <button type="button" class="btn btn-primary delete-grade-btn">Supprimer</button>`;

  // Restricted access to trombi buttons in header
  let teacherButtonHeader = document.getElementById("teacherButtonHeader");
  teacherButtonHeader.innerHTML = `<label class="btn btn-secondary">
     <a href="teacher.html">Trombinoscope</a>
 </label>`;

  var xhr2 = new XMLHttpRequest();
  xhr2.open("GET", "../teachers.json", true);
  xhr2.onreadystatechange = function () {
    if (xhr2.readyState === 4 && xhr2.status === 200) {
      var xmlDoc2 = JSON.parse(xhr2.response);
      console.log(xmlDoc2);

      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log(userInfo);
      for (let i = 0; i < xmlDoc2.length; i++) {
        if (xmlDoc2[i].id == userInfo.id) {
          // displaying teacher picture and name on header
          document.querySelector("#picAndLogout").innerHTML += `
                          <img src=${xmlDoc2[i].picture} alt="student picture" class="img-fluid rounded-circle">
                          <div id="name-content">${xmlDoc2[i].firstname} ${xmlDoc2[i].lastname}</div>
                          `;
        }
      }
    }
  };
  xhr2.send();

  // Displaying school report of the student
  // let studentReport = document.querySelector("#studentReport");
  var xhr3 = new XMLHttpRequest();
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get("id");
  console.log(paramValue);

  xhr3.open("GET", "../server/grades.json", true);
  xhr3.onreadystatechange = function () {
    if (xhr3.readyState === 4 && xhr3.status === 200) {
      var xmlDoc3 = JSON.parse(xhr3.response);
      console.log(xmlDoc3);

      for (let i = 0; i < xmlDoc3.length; i++) {
        if (xmlDoc3[i].id_student == paramValue) {
          switch (xmlDoc3[i].subject) {
            case "Mathématiques":
              mathGrades.push([xmlDoc3[i].id, xmlDoc3[i].value]);
              if (!coefmath) {
                document.querySelector(
                  ".maths"
                ).innerHTML += `<td class="coef-content-math"></td>`;
                coefmath = true;
              }
              document.querySelector(
                ".coef-content-math"
              ).innerHTML += `<span>${xmlDoc3[i].coef}</span>`;
              coefMathGrades.push(xmlDoc3[i].coef);
              break;
            case "Histoire":
              historyGrades.push([xmlDoc3[i].id, xmlDoc3[i].value]);
              if (!coefhistory) {
                document.querySelector(
                  ".history"
                ).innerHTML += `<td class="coef-content-history"></td>`;
                coefhistory = true;
              }
              document.querySelector(
                ".coef-content-history"
              ).innerHTML += `<span>${xmlDoc3[i].coef}</span>`;
              coefHistoryGrades.push(xmlDoc3[i].coef);
              break;
            case "Anglais":
              englishGrades.push([xmlDoc3[i].id, xmlDoc3[i].value]);
              if (!coefenglish) {
                document.querySelector(
                  ".english"
                ).innerHTML += `<td class="coef-content-english"></td>`;
                coefenglish = true;
              }
              document.querySelector(
                ".coef-content-english"
              ).innerHTML += `<span>${xmlDoc3[i].coef}</span>`;
              coefEnglishGrades.push(xmlDoc3[i].coef);
              break;
            case "Physique":
              physiqueGrades.push([xmlDoc3[i].id, xmlDoc3[i].value]);
              if (!coefphysique) {
                document.querySelector(
                  ".physique"
                ).innerHTML += `<td class="coef-content-physique"></td>`;
                coefphysique = true;
              }
              document.querySelector(
                ".coef-content-physique"
              ).innerHTML += `<span>${xmlDoc3[i].coef}</span>`;
              coefPhysiqueGrades.push(xmlDoc3[i].coef);
              break;
            case "Français":
              frenchGrades.push([xmlDoc3[i].id, xmlDoc3[i].value]);
              if (!coeffrench) {
                document.querySelector(
                  ".french"
                ).innerHTML += `<td class="coef-content-french"></td>`;
                coeffrench = true;
              }
              document.querySelector(
                ".coef-content-french"
              ).innerHTML += `<span>${xmlDoc3[i].coef}</span>`;
              coefFrenchGrades.push(xmlDoc3[i].coef);
              break;
            default:
              console.log(`Sorry, innexpected error happened`);
          }
        }
      }
      console.log(mathGrades);
      // Maths
      console.log(mathGrades.length);
      for (let j = 0; j < mathGrades.length; j++) {
        if (!tdMath) {
          document.querySelector(
            ".maths"
          ).innerHTML += `<td class="grade-content-maths"></td>`;
          tdMath = true;
        }
        document.querySelector(
          ".grade-content-maths"
        ).innerHTML += `<button class="grades" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id=${mathGrades[j][0]}>${mathGrades[j][1]}</button>`;
        mathSomme += parseInt(mathGrades[j][1]) * parseInt(coefMathGrades[j]);
        coefMathSomme += parseInt(coefMathGrades[j]);
      }
      let mathAverage = average(parseInt(mathSomme), parseInt(coefMathSomme));
      globalStudentAverage += parseFloat(mathAverage);
      document.querySelector(".maths").innerHTML += `
        <td class="average"><span>${mathAverage}</span></td>
        <td class="graph_link">
        <input type="image" class="chartButton" data-bs-toggle="modal" data-bs-target="#staticSubject" data-subject="Mathématiques" data-average="${mathAverage}"src="./assets/stats.png" alt="graph_link" width="70">
        </td>`;

      // French
      for (let j = 0; j < frenchGrades.length; j++) {
        if (!tdFrench) {
          document.querySelector(
            ".french"
          ).innerHTML += `<td class="grade-content-french"></td>`;
          tdFrench = true;
        }
        document.querySelector(
          ".grade-content-french"
        ).innerHTML += `<button class="grades" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id=${frenchGrades[j][0]}>${frenchGrades[j][1]}</button>`;
        frenchSomme +=
          parseInt(frenchGrades[j][1]) * parseInt(coefFrenchGrades[j]);
        coefFrenchSomme += parseInt(coefFrenchGrades[j]);
      }
      let frenchAverage = average(
        parseInt(frenchSomme),
        parseInt(coefFrenchSomme)
      );
      globalStudentAverage += parseFloat(frenchAverage);
      document.querySelector(".french").innerHTML += `
        <td class="average"><span>${frenchAverage}</span></td>
        <td class="graph_link">
        <input type="image" class="chartButton" data-bs-toggle="modal" data-bs-target="#staticSubject" data-subject="Français" data-average="${frenchAverage}" src="./assets/stats.png" alt="graph_link" width="70">
        </td>`;

      // English
      for (let j = 0; j < englishGrades.length; j++) {
        if (!tdEnglish) {
          document.querySelector(
            ".english"
          ).innerHTML += `<td class="grade-content-english"></td>`;
          tdEnglish = true;
        }
        document.querySelector(
          ".grade-content-english"
        ).innerHTML += `<button class="grades" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id=${englishGrades[j][0]}>${englishGrades[j][1]}</button>`;
        englishSomme +=
          parseInt(englishGrades[j][1]) * parseInt(coefEnglishGrades[j]);
        coefEnglishSomme += parseInt(coefEnglishGrades[j]);
      }
      let englishAverage = average(
        parseInt(englishSomme),
        parseInt(coefEnglishSomme)
      );
      globalStudentAverage += parseFloat(englishAverage);
      document.querySelector(".english").innerHTML += `
        <td class="average"><span>${englishAverage}<span></td>
        <td class="graph_link">
        <input type="image" class="chartButton" data-bs-toggle="modal" data-bs-target="#staticSubject" data-subject="Anglais" data-average="${englishAverage}" src="./assets/stats.png" alt="graph_link" width="70">
        </td>`;

      // Physique
      for (let j = 0; j < physiqueGrades.length; j++) {
        if (!tdPhysique) {
          document.querySelector(
            ".physique"
          ).innerHTML += `<td class="grade-content-physique"></td>`;
          tdPhysique = true;
        }
        let gradePhysique = document.querySelector(".grade-content-physique");
        console.log(gradePhysique);
        document.querySelector(
          ".grade-content-physique"
        ).innerHTML += `<button class="grades" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id=${physiqueGrades[j][0]}>${physiqueGrades[j][1]}</button>`;
        physiqueSomme +=
          parseInt(physiqueGrades[j][1]) * parseInt(coefPhysiqueGrades[j]);
        coefPhysiqueSomme += parseInt(coefPhysiqueGrades[j]);
      }
      let physiqueAverage = average(
        parseInt(physiqueSomme),
        parseInt(coefPhysiqueSomme)
      );
      globalStudentAverage += parseFloat(physiqueAverage);
      document.querySelector(".physique").innerHTML += `
        <td class="average"><span>${physiqueAverage}<span></td>
        <td class="graph_link">
        <input type="image" class="chartButton" data-bs-toggle="modal" data-bs-target="#staticSubject" data-subject="Physique" data-average="${physiqueAverage}" src="./assets/stats.png" alt="graph_link" width="70">
        </td>`;

      // History
      for (let j = 0; j < historyGrades.length; j++) {
        if (!tdHistory) {
          document.querySelector(
            ".history"
          ).innerHTML += `<td class="grade-content-history"></td>`;
          tdHistory = true;
        }
        document.querySelector(
          ".grade-content-history"
        ).innerHTML += `<button class="grades" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id=${historyGrades[j][0]}>${historyGrades[j][1]}</button>`;
        historySomme +=
          parseInt(historyGrades[j][1]) * parseInt(coefHistoryGrades[j]);
        coefHistorySomme += parseInt(coefHistoryGrades[j]);
      }
      let historyAverage = average(
        parseInt(historySomme),
        parseInt(coefHistorySomme)
      );
      globalStudentAverage += parseFloat(historyAverage);
      document.querySelector(".history").innerHTML += `
        <td class="average"><span>${historyAverage}<span></td>
        <td class="graph_link">
        <input type="image" class="chartButton" data-bs-toggle="modal" data-bs-target="#staticSubject" data-subject="Histoire" data-average="${historyAverage}" src="./assets/stats.png" alt="graph_link" width="70">
        </td>`;

      globalStudentAverage /= 5;
      studentAverageContent.innerHTML = `Moyenne générale : ${globalStudentAverage.toFixed(
        2
      )}`;


      const btnAverageClass = document.querySelector('#btnAverageClass');
      btnAverageClass.setAttribute('data-classaverage', globalStudentAverage.toFixed(2));


      function loadModals() {
        var script = document.createElement("script");
        script.src = "./js/modals.js";
        script.type = "module";
        document.getElementsByTagName("body")[0].appendChild(script);
      }
      loadModals();

      // Display student name on h1
      var xhr4 = new XMLHttpRequest();
      xhr4.open("GET", "../server/students.json", true);
      xhr4.onreadystatechange = function () {
        if (xhr4.readyState === 4 && xhr4.status === 200) {
          console.log("Salut");
          var xmlDoc4 = JSON.parse(xhr4.response);
          console.log(xmlDoc4);

          for (let i = 0; i < xmlDoc4.length; i++) {
            if (xmlDoc4[i].id == paramValue) {
              console.log("Salut");
              document.querySelector(
                "h1"
              ).innerHTML = `Bulletin de ${xmlDoc4[i].firstname} ${xmlDoc4[i].lastname}`;
            }
          }
        }
      };
      xhr4.send();
    }
  };
  xhr3.send();
}

// --------------Logout------------------
let deconnectionBtn = document.querySelector("#logoutBtn");

deconnectionBtn.addEventListener("click", () => {
  localStorage.removeItem("userInfo");
  window.location.href = "../index.html";
});

mathClassAverage();
frenchClassAverage();
historyClassAverage();
physicalClassAverage();
englishClassAverage();
globalAverage();
