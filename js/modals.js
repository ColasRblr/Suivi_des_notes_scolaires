// // Averages in each subject
import {
  mathClassAverage,
  frenchClassAverage,
  historyClassAverage,
  physicalClassAverage,
  englishClassAverage,
} from "./controller.js";

let type = document.getElementById("type");
let date = document.getElementById("date");
let grade = document.getElementById("grade");
let comment = document.getElementById("comment");
let grades = document.querySelectorAll(".grades");

console.log(grades);
console.log(grades.length);

for (let i = 0; i < grades.length; i++) {
  // console.log(grades[i]);

  // Display datas
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
            // console.log(grades[i].dataset.id);
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

// MODAL GRAPH INDIVIDUEL
const ctx = document.getElementById("myChart");
const chart = document.querySelectorAll(".chartButton");

let arrayAverage = [];
let graphik = null;
let mathAverage = mathClassAverage();
let frenchAverage = frenchClassAverage();
let historyAverage = historyClassAverage();
let physiqueAverage = physicalClassAverage();
let englishAverage = englishClassAverage();

mathAverage.then((res) => {
  arrayAverage.push(res);
});
frenchAverage.then((res) => {
  arrayAverage.push(res);
});
historyAverage.then((res) => {
  arrayAverage.push(res);
});
physiqueAverage.then((res) => {
  arrayAverage.push(res);
});
englishAverage.then((res) => {
  arrayAverage.push(res);
});

console.log(arrayAverage);

for (let i = 0; i < chart.length; i++) {
  chart[i].addEventListener("click", graph);
  function graph() {
    // averageStudent = document.querySelectorAll(".average");
    // console.log(averageStudent[i].firstChild.innerText);

    var dataStudent = {
      label: "Moyenne étudiant",
      data: [chart[i].dataset.average],
      backgroundColor: "rgb(60, 179, 113)",
      borderColor: "rgb(39,79,76)",
      borderWidth: 1,
    };

    var dataClass = {
      label: "Moyenne classe",
      data: arrayAverage,
      backgroundColor: "rgb(0, 0, 255)",
      borderColor: "rgb(40,161,130)",
      borderWidth: 1,
    };

    if (graphik) {
      graphik.destroy();
    }

    ctx.innerHTML = '<canvas id="myChart"></canvas>';
    graphik = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Ma moyenne et celle de la classe"],
        datasets: [dataStudent, dataClass],
      },
      options: {
        scales: {
          xAxes: [
            {
              barPercentage: 0.2,
              // barThickness: 70,
            },
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                steps: 1,
                stepValue: 5,
                max: 20,
              },
            },
          ],
        },
      },
    });
  }
}

// // MODAL GRAPH INDIVIDUEL
// const ctx = document.getElementById("myChart");
// const chart = document.querySelectorAll(".chartButton");

// fetch("./server/grades.json")
//   .then((response) => response.json())
//   .then((data) => {
//     let graphik = null;
//     for (let i = 0; i < chart.length; i++) {
//       chart[i].addEventListener("click", graph);
//       function graph() {
//         const labels = [];
//         const values = [];
//         data
//           .filter(
//             (grade) =>
//               grade.subject == chart[i].dataset.subject &&
//               grade.id_student == chart[i].dataset.student
//           )
//           .forEach((grade) => {
//             console.log(chart[i].dataset.student);
//             labels.push(grade.date);
//             values.push(grade.value);
//             console.log(grade);
//           });

//         if (graphik) {
//           graphik.destroy();
//         }
//         ctx.innerHTML = '<canvas id="myChart"></canvas>';
//         graphik = new Chart(ctx, {
//           type: "bar",
//           data: {
//             labels: labels,
//             datasets: [
//               {
//                 label: "Notes",
//                 data: values,
//                 backgroundColor: [
//                   "rgba(255, 99, 132, 0.2)",
//                   "rgba(255, 159, 64, 0.2)",
//                   "rgba(255, 205, 86, 0.2)",
//                   "rgba(75, 192, 192, 0.2)",
//                   "rgba(54, 162, 235, 0.2)",
//                   "rgba(153, 102, 255, 0.2)",
//                   "rgba(201, 203, 207, 0.2)",
//                 ],

//                 order: 2,
//               },
//             ],
//           },
//           options: {
//             scales: {
//               xAxes: [
//                 {
//                   ticks: {
//                     min: 0,
//                     stepSize: 1,
//                   },
//                 },
//               ],
//               yAxes: [
//                 {
//                   ticks: {
//                     max: 20,
//                     beginAtZero: true,
//                   },
//                 },
//               ],
//             },
//           },
//         });
//       }
//     }
//   });
