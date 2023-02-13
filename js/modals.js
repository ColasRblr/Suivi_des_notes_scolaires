let type = document.getElementById("type");
let date = document.getElementById("date");
let grade = document.getElementById("grade");
let comment = document.getElementById("comment");

let grades = document.querySelectorAll(".grades");
console.log(grades);
console.log(grades.length);
for (let i = 0; i < grades.length; i++) {
  // console.log(grades[i]);
  grades[i].addEventListener("click", addValues);
  function addValues() {
    var xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "./server/grades.json", true);
    xhr1.onreadystatechange = function () {
      if (xhr1.readyState === 4 && xhr1.status === 200) {
        var xmlDoc1 = JSON.parse(xhr1.response);
        xmlDoc1.forEach((item) => {
          if (item.id == grades[i].dataset.id) {
            type.innerHTML = item.type;
            date.innerHTML = item.date;
            grade.innerHTML = item.value;
            comment.innerHTML = item.comments;

            // Delete grade
            let deleteBtn = document.querySelector(".delete-grade-btn");

            deleteBtn.addEventListener("click", () => {
              fetch("http://127.0.0.1:8000/json.php", {
                method: "POST",
                headers: {
                  "Content-type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
                },
                body: "id=" + grades[i].dataset.id + "&delete=true",
              })
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            });

            // Modif grade

            // Display form onclick
            let modifForm = document.getElementById("modifForm");
            let modifBtn = document.querySelector(".modif-grade-btn");
            let closeBtn = document.getElementById("closeBtn");

            let newValue = document.getElementById("newValue");
            let newDate = document.getElementById("newDate");
            let newType = document.getElementById("newType");
            let newComment = document.getElementById("newComment");

            let gradeModif = {};

            modifBtn.addEventListener("click", () => {
              modifForm.style.display = "block";
              newValue.value = item.value;
              newDate.value = item.date;
              newType.value = item.type;
              newComment.innerHTML = item.comments;
              modifBtn.style.display = "none";
            });

            closeBtn.addEventListener("click", () => {
              modifForm.style.display = "none";
              modifBtn.style.display = "block";
            });

            let confirmModifBtn = document.querySelector(
              ".modif-grade-confirm"
            );

            confirmModifBtn.addEventListener("click", () => {
              if (
                newValue != "" &&
                newDate != "" &&
                newType != "" &&
                newComment != ""
              ) {
                gradeModif = {
                  id: grades[i].dataset.id,
                  value: newValue.value,
                  date: newDate.value,
                  type: newType.value,
                  comment: newComment.value,
                };
                console.log(gradeModif);
              }
              // Envoi de la requête au serveur
              fetch("http://127.0.0.1:8000/json.php", {
                method: "POST",
                headers: {
                  "Content-type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
                },
                body: "grade=" + JSON.stringify(gradeModif) + "&modify=true",
              })
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          }
        });
      }
    };
    xhr1.send();
  }
}