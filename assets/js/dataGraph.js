// <initialisation de la courbe>
let datapoints = [1200, 750, 775, 760, 2560]; //différents encours après opérations successives
const DATA_COUNT = datapoints.length; //longueur du tableau
const labels = []; //tableau vide dans const
for (let i = 0; i < DATA_COUNT; i++) {
  //boucle sur tableau qui pousse valeurs dans tableau vide sous forme de string
  labels.push(i.toString());
}
const data = {
  labels: labels,
  datasets: [
    {
          label: "Compte", //Affichage du compte sur la courbe
      data: datapoints, //points de la courbe
      borderColor: "purple", //Couleur de la courbe
      //   fill: true,    colore le dessous de la courbe
      cubicInterpolationMode: "monotone", //gère la forme de la courbe
    },
  ],
};
// </block:setup>

// <block:config:0>
const config = {
  //gestion de la ligne (abscisse, ordonnée)
  type: "line",
  data: data,
  options: {
    elements: {
      point: {
        radius: 0, // gère les points de courbe via un rayon
      },
    },
    responsive: true,
    plugins: {
      legend: false,
      //   title: {
      //     display: true,
      //     text: "Chart.js Line Chart - Cubic interpolation mode",
      //   },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  },
};

/*Le contexte du canevas HTML */
let context = document.getElementById("myChart").getContext("2d");
/* Création du graphique */
let chart = new Chart(context, config);

function addOperator(posCourbe, montant) {
  /* Ajoute la valeur en X */
  config.data.labels.push(posCourbe); // ajoute une position a la courbe

  /* Ajoute la valeur */
  config.data.datasets[0].data.push(montant);

  /* Rafraichir le graphique */
  chart.update();
}

//affichage débit/crédit
let allOp = document.querySelector("#allOperation"); //bouton "tout"
allOp.style.backgroundColor = "black"; //couleur de fond par défaut du bouton

let creditOp = document.getElementById("creditOperation"); //bouton crédit
let debitOp = document.getElementById("debitOperation"); // bouton débit

let allCreditValue = document.querySelectorAll(".credit"); // ensemble des opérations de crédit [class credit dans html ]
let AllDebitValue = document.querySelectorAll(".debit"); // ensemble des opérations de débit [class debit dans html ]
let AllopValue = document.querySelectorAll(".operation"); // ensemble des opérations  [class operation dans html ]

allOp.addEventListener("click", (e) => {
  // écoute du bouton "tout"
  allOp.style.backgroundColor = "black"; // au "click" bouton "tout" = noir et les autres = blanc
  creditOp.style.backgroundColor = "white";
  debitOp.style.backgroundColor = "white";
  AllopValue.forEach(function (element) {
    // tous les éléments dans [class = operation] apparaissent
    element.style.display = "block";
  });
});

creditOp.addEventListener("click", (e) => {
  // écoute du bouton "crédit"
  allOp.style.backgroundColor = "white"; // au "click" bouton "crédit" = noir et les autres = blanc
  creditOp.style.backgroundColor = "black";
  debitOp.style.backgroundColor = "white";
  allCreditValue.forEach(function (element) {
    // fonction 1: tous les éléments dans [class = credit] apparaissent
    element.style.display = "block";
  });

  AllDebitValue.forEach(function (element) {
    // fonction 2: tous les éléments dans [class = debit] disparaissent
    element.style.display = "none";
  });
});

debitOp.addEventListener("click", (e) => {
  // écoute du bouton "debit"
  allOp.style.backgroundColor = "white"; // au "click" bouton "debit" = noir et les autres = blanc
  creditOp.style.backgroundColor = "white";
  debitOp.style.backgroundColor = "black";
  AllDebitValue.forEach(function (element) {
    // fonction 1: tous les éléments dans [class = debit] apparaissent
    element.style.display = "block";
  });

  allCreditValue.forEach(function (element) {
    // fonction 2: tous les éléments dans [class = debit] disparaissent
    element.style.display = "none";
  });
});

/*
let solde = datapoints[datapoints.length - 1];
let operator = document.getElementById("operator");
let montant = document.getElementById("montant");
let submitForm = document.getElementsByClassName("btSubmit");
submitForm.addEventListener("click", function (){

  if (-){
    solde -= montant.value;
  }else{
    solde += montant.value;
  }
})
solde.push()
*/
