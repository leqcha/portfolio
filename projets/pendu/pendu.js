const tableauDeMots = [
    "chien",
    "chat",
    "table",
    "ordinateur",
    "maison",
    "voiture",
    "fenetre",
    "porte",
    "fleur",
    "arbre",
    "soleil",
    "lune",
    "etoile",
    "plage",
    "mer",
    "montagne",
    "riviere",
    "pont",
    "nuage",
    "herbe",
    "cafe",
    "livre",
    "stylo",
    "papier",
    "musique",
    "film",
    "fenetre",
    "velo",
    "ballon",
    "portable",
    "ordinateur",
    "ecran",
    "clavier",
    "souris",
    "ecouteurs",
    "casque",
    "telecommande",
    "pizza",
    "hamburger",
    "sandwich",
    "chocolat",
    "gateau",
    "bonbon",
    "glace",
    "soda",
    "eau",
    "jus",
    "orange",
    "pomme"
];

let motAleatoire = "";
let tirets = [];
let motADeviner = [];
let coups = 7;
let numeroImage = 0;
let lettre = "";

const tiretsDom = document.querySelector(".tirets");
const inputMot = document.querySelector("#mot");
const formulaire = document.querySelector(".formulaire");
const score = document.querySelector(".score");
const image = document.querySelector("img");
const nouvellePartieBtn = document.querySelector(".nouvellePartie");
const lettreElements = document.querySelectorAll("td");

/* cette function permet d'afficher un message d'alerte
 * elle prend en paramètre le message à afficher
 * elle prend en paramètre une fonction callback qui sera exécutée après l'affichage du message
 * elle utilise la fonction setTimeout pour afficher le message après 20ms
 * cela permet de laisser le temps au navigateur de mettre à jour le DOM
 * et donc d'afficher la lettre dans les tirets ou le compteur de vie avant d'afficher l'alerte
 */
function showAlertAndRun(message, callback) {
    setTimeout(() => {
        alert(message);
        callback();
    }, 20);
}
// on crée une fonction qui supprime les accents de l'input
function supprimerAccents(input) {
    return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function genererMot() {
    const nombreAleatoire = Math.floor(Math.random() * tableauDeMots.length);
    motAleatoire = tableauDeMots[nombreAleatoire];
    motADeviner = motAleatoire.split("");
    console.log(motADeviner);
}

function genererTirets() {
    for (let i = 0; i < motAleatoire.length; i++) {
        tirets[i] = "_";
    }
}

function miseAJourTirets() {
    tiretsDom.textContent = tirets.join(" ");
}

function indexLettreDansMot(lettre) {
    let lettreTrouvee = false;
    let i = -1;

    while (lettreTrouvee === false && i !== motADeviner.length) {
        i++;
        lettreTrouvee = motADeviner[i] === lettre;
    }

    if (lettreTrouvee) {
        return i;
    }
    return -1;
}

function enleverUneVie() {
    coups--;
    image.src = `../../images/${++numeroImage}.png`;
    score.textContent = coups;
}

function miseAjourMotJoueur(index) {
    for (let i = 0; i < motADeviner.length; i++) {
        if (motADeviner[i] === motADeviner[index]) {
            tirets[i] = motADeviner[index];
        }
    }
    miseAJourTirets();
}

function verifierLettre(lettre) {
    const indexLettreTrouvee = indexLettreDansMot(lettre);
    if (indexLettreTrouvee === -1) {
        enleverUneVie();
    } else {
        miseAjourMotJoueur(indexLettreTrouvee);
    }
}

function verifierNombreDeCoupRestant() {
    if (coups === 0) {
        showAlertAndRun(
            "Vous avez perdu! Il fallait deviner le mot : " + motAleatoire,
            nouvellePartie
        );
    }
}

function verifierMot(mot) {
    return mot === motADeviner.join("");
}

function motTrouve() {
    showAlertAndRun(
        "Bravo! Vous avez deviné le mot " + motAleatoire,
        nouvellePartie
    );
}

function nouvellePartie() {
    // remise à 0 des variables et fonctions
    tiretsDom.textContent = "";
    numeroImage = 0;
    image.src = `../../images/${numeroImage}.png`;
    coups = 7;
    score.textContent = coups;
    tirets = [];
    motADeviner = [];

    genererMot();
    genererTirets();
    miseAJourTirets();
}

function soumissionFormulaire(event) {
    // Empêcher le rechargement de la page au clic sinon une nouvelle partie est lancée
    event.preventDefault();
    // On supprime les accents de l'entrée de l'utilisateur sinon le mot sera faux
    const motSansAccents = supprimerAccents(mot.value);

    if (verifierMot(motSansAccents)) {
        motTrouve();
    } else {
        alert("Désolé, ce n'est pas le bon mot. Vous perdez une vie");
        enleverUneVie();
    }
    verifierNombreDeCoupRestant();

    // Réinitialisation du champ de saisie
    inputMot.value = "";
}

function lettreClick(event) {
    const element = event.currentTarget;
    const lettre = element.textContent;
    verifierLettre(lettre);
    if (verifierMot(tirets.join(""))) {
        motTrouve();
    } else {
        verifierNombreDeCoupRestant();
    }
}

function initialisation() {
    // Générer une nouvelle partie au clic sur le bouton nouvelle partie
    nouvellePartieBtn.addEventListener("click", nouvellePartie);
    console.log("Init");
    lettreElements.forEach(function (element) {
        element.addEventListener("click", function (event) {
            lettreClick(event);
        });
    });

    formulaire.addEventListener("submit", soumissionFormulaire);
}

function lancement() {
    initialisation();
    nouvellePartie();
}

//---------------- LANCEMENT APPLICATION ----------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    lancement();
});