// Fonction pour vérifier les erreurs de formulaire
function checkErrors() {
    const evalChoice = document.querySelector('#eval-choice').value;
    const subject = document.querySelector('#subject').value;
    const date = document.querySelector('#date').value;
    const grade = document.querySelector('#grade').value;
  
    // Vérifier si tous les champs sont remplis
    if (evalChoice === '' || subject === '' || date === '' || grade === '') {
      alert('Veuillez remplir tous les champs.');
      return;
    }
  
    // Vérifier si la note est valide
    if (isNaN(grade) || parseInt(grade) < 0 || parseInt(grade) > 20) {
      alert('La note doit être un nombre entre 0 et 20.');
      return;
    }
  
    // Si tout est valide, enregistrer la note
    alert('Note enregistrée !');
  }
  
  // Ajouter un écouteur d'événement "click" sur le bouton "Sauvegarder"
  const saveBtn = document.querySelector('#save-btn');
  
  saveBtn.addEventListener('click', () => {
    checkErrors();
  });