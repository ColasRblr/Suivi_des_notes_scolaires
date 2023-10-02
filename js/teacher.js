//  Restricted access : if no connection (= empty local storage) then redirection
let storage = localStorage.length;
// console.log(storage);
if (storage == 0) {
  window.location.href = "./index.html";
}
//  Restricted access to this page : if a student attempts to access : redirection
let userInfo = JSON.parse(localStorage.getItem("userInfo"));
let typeUser = userInfo.type;
if (typeUser == "student") {
  window.location.href = "./student.html";
}

import {
  isValidValue,
  isValidDate,
  isDateBeforeToday,
  isValidComment,
  isValidGradeType,
  isValidGradeSubject,
} from "./controller.js";

let studentsCardsContent = document.querySelector("#students-cards-content");
let deconnectionBtn = document.querySelector("#logoutBtn");

fetch("../server/students.json")
  .then((response) => response.json())
  .then((xmlDoc) => {
    console.log(xmlDoc);
    let lastId = xmlDoc[xmlDoc.length];
    console.log("le dernier id est : " + lastId);

    for (let i = 0; i < xmlDoc.length; i++) {
      console.log(xmlDoc[i].picture);
      let id = xmlDoc[i].id;
      console.log(id);
      studentsCardsContent.innerHTML += `
            <div class="cards">
                <img src=${xmlDoc[i].picture} alt="">
                <span class="name">${xmlDoc[i].firstname} ${xmlDoc[i].lastname}</span>
                <div class="btn-container">
                    <button class="add-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Ajouter une note</button>
                    <button class="grade-btn">
                    <a href="../student.html?id=${id}">
                    Voir le bulletin
                    </a>
                    </button>
                </div>
            </div>`;
    }
    // Ajouter une note

    let addGradeButtons = document.querySelectorAll(".add-btn");
    console.log(addGradeButtons);

    for (let j = 0; j < addGradeButtons.length; j++) {
      console.log(addGradeButtons[j]);
      addGradeButtons[j].addEventListener("click", () => {
        let validateGradeBtn = document.querySelector(".add-grade-btn");

        let type = document.querySelector("#eval-choice");
        let subject = document.querySelector("#subject");
        let dateInput = document.querySelector("#date");
        let gradeInput = document.querySelector("#grade");
        let commentInput = document.querySelector("#comment");

        validateGradeBtn.addEventListener("click", () => {
          fetch("../server/grades.json")
            .then((response) => response.json())
            .then((xmlGrade) => {
              var gradesNumber = xmlGrade.length;

              if (
                isValidValue(gradeInput.value) &&
                isValidDate(dateInput.value) &&
                isDateBeforeToday(dateInput.value) &&
                isValidComment(commentInput.value) &&
                isValidGradeType(type.value) &&
                isValidGradeSubject(subject.value)
              ) {
                let gradeInfo = {
                  id: gradesNumber + 1,
                  value: gradeInput.value,
                  date: dateInput.value,
                  type: type.value,
                  coef: type.value == "oral" ? "1" : "2",
                  id_student: j + 1,
                  subject: subject.value,
                  comments: commentInput.value,
                };
                console.log(gradeInfo);
                // Envoi de la requête au serveur
                fetch("http://127.0.0.1:8000/json.php", {
                  method: "POST",
                  headers: {
                    "Content-type":
                      "application/x-www-form-urlencoded; charset=UTF-8",
                  },
                  body: "content=" + JSON.stringify(gradeInfo) + "&create=true",
                })
                  .then((res) => {
                    console.log(res);
                    type.value = "";
                    subject.value = "";
                    dateInput.value = "";
                    gradeInput.value = "";
                    commentInput.value = "";
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                alert("Veuillez remplir tous les champs avant de valider la note.");
              }
            });
        });
      });
    }
  });

// Affichage de la photo du professeur dynamiquement
fetch("../teachers.json")
  .then((response) => response.json())
  .then((json) => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    for (let i = 0; i < json.length; i++) {
      if (json[i].id == userInfo.id) {
        document.querySelector(
          "#picAndLogout"
        ).innerHTML += `<img src=${json[i].picture} alt="student picture" class="img-fluid rounded-circle"> <div id="name-content">${json[i].firstname} ${json[i].lastname}</div>`;
      }
    }
  })
  .catch((error) => console.log(error));

// --------------Deconnection------------------
deconnectionBtn.addEventListener("click", () => {
  localStorage.removeItem("userInfo");
  window.location.href = "../index.html";
});
