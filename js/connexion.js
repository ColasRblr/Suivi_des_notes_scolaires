import { isValidMail } from './controller.js';
let connectTeacherBtn = document.querySelector("#connect-teacher-btn");
let connectStudentBtn = document.querySelector("#connect-student-btn");
let errorMessage = document.querySelector("#error-msg");
var teacherEmailValue = "";
var teacherPasswordValue = "";


// ---------------Connexion du professeur----------------------
connectTeacherBtn.addEventListener("click", () => {
  let teacherEmail = document.querySelector("#teacher-email");
  let teacherPassword = document.querySelector("#teacher-password");

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../teachers.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var xmlDoc = JSON.parse(xhr.responseText);
      console.log(xmlDoc);

      for (let i = 0; i < xmlDoc.length; i++) {
        if (xmlDoc[i].email == teacherEmail.value && isValidMail(teacherEmail.value)) {
          console.log("adresse mail connue");
          if (xmlDoc[i].password == teacherPassword.value) {
            console.log("connexion validée");
            let infos = {
              id: xmlDoc[i].id,
              type: "teacher",
            };
            localStorage.setItem("userInfo", JSON.stringify(infos));
            window.location.href = "../teacher.html";
            break;
          } else {
            console.log("mot de passe erroné");
            errorMessage.innerHTML = "Mot de passe incorrect";
          }
        } else {
          console.log("adresse mail inconnue");
          errorMessage.innerHTML = "Adresse mail incorrecte";
        }
      }
    }
  };
  xhr.send();
});

// ---------------Connexion de l'élève----------------------
connectStudentBtn.addEventListener("click", () => {
  let studentEmail = document.querySelector("#student-email");
  let studentPassword = document.querySelector("#student-password");

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../server/students.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var xmlDoc = JSON.parse(xhr.response);
      console.log(xmlDoc);

      for (let i = 0; i < xmlDoc.length; i++) {
        if (xmlDoc[i].email == studentEmail.value && isValidMail(studentEmail.value)) {
          console.log("adresse mail connue");
          if (xmlDoc[i].password == studentPassword.value) {
            console.log("connexion validée");
            window.location.href = "../student.html";
            let infos = {
              id: xmlDoc[i].id,
              type: "student",
            };
            localStorage.setItem("userInfo", JSON.stringify(infos));
            break;
          } else {
            console.log("mot de passe erroné");
            errorMessage.innerText = "Mot de passe incorrect";
          }
        } else {
          console.log("adresse mail inconnue");
          errorMessage.innerHTML = "Adresse mail incorrecte";
        }
      }
    }
  };
  xhr.send();
})

// module.exports = {
//   isValidMail
// };


