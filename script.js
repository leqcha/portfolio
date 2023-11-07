const tableauDeMots = [
    "chien", "chat", "table", "ordinateur", "maison", "voiture", "fenetre", "porte", "fleur", "arbre",
    "soleil", "lune", "étoile", "plage", "mer", "montagne", "riviere", "pont", "nuage", "herbe",
    "cafe", "livre", "stylo", "papier", "musique", "film", "fenetre", "velo", "ballon", "portable",
    "ordinateur", "ecran", "clavier", "souris", "ecouteurs", "casque", "telecommande", "pizza", "hamburger", "sandwich",
    "chocolat", "gateau", "bonbon", "glace", "soda", "eau", "jus", "orange", "pomme"
];

let motAleatoire = '';
let tirets = [];
let motADeviner = [];
let coups = 7;
let numeroImage = 0;
let lettre = '';

let mot = document.querySelector('#mot');
let formulaire = document.querySelector('.formulaire');
let score = document.querySelector('.score');
let image = document.querySelector('img');
let nouvellePartieBtn = document.querySelector('.nouvellePartie');

// Générer une nouvelle partie au clic sur le bouton nouvelle partie
nouvellePartieBtn.addEventListener('click', nouvellePartie);

function nouvellePartie() {
    // remise à 0 des variables et fonctions
    document.querySelector('.tirets').textContent = '';
    numeroImage = 0;
    image.src = `../images/${numeroImage}.png`;
    coups = 7;
    score.textContent = coups;
    tirets = [];
    motADeviner = [];

    motADeviner = genererMot(tableauDeMots.length);
    copieMotAleatoire();
    genererTirets();
}

function copieMotAleatoire() {
    motADeviner = motAleatoire.split('');
}

// Générer des tirets pour le tableau copieMotAleatoire
function genererTirets() {
    for (let i = 0; i < motAleatoire.length; i++) {
        tirets[i] = '_';
    }
    document.querySelector('.tirets').textContent = tirets.join(' ');
}



// Choisir un mot aléatoire dans la liste et le retourner sous forme de tableau
function genererMot(max) {
    let nombreAleatoire = Math.floor(Math.random() * max);
    motAleatoire = tableauDeMots[nombreAleatoire];

    for (let i = 0; i < motAleatoire.length; i++) {
        motADeviner.push(motAleatoire[i]);
    }
    return motADeviner;
}


let lettreElements = document.querySelectorAll('td');
lettreElements.forEach(function (e) {
    e.addEventListener('click', function () {
        lettre = e.textContent;
        verifierLettre(lettre);
    });
});

function verifierLettre(lettre) {
    let lettreTrouvee = false;

    for (let i = 0; i < motADeviner.length; i++) {
        if (motADeviner[i] === lettre) {
            lettreTrouvee = true;

            tirets[i] = lettre; // Remplace le tiret par la lettre

            if (tirets.join('') === motAleatoire) {
                alert('Vous avez trouvez le mot ' + motAleatoire + '!');
                nouvellePartie();
            }
        }

    }

    document.querySelector('.tirets').textContent = tirets.join(' '); // Mise à jour de l'affichage des tirets

    if (!lettreTrouvee) {
        coups--;
        score.textContent = coups;
        image.src = `../images/${++numeroImage}.png`;

        if (coups < 0) {
            alert('Vous avez perdu! Il fallait deviner le mot : ' + motAleatoire);
            nouvellePartie();
        }
    }
}

nouvellePartie();

// on crée une fonction qui supprime les accents de l'input
function supprimerAccents(input) {
    return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

formulaire.addEventListener('submit', function (e) {
    e.preventDefault(); // Empêcher le rechargement de la page au clic sinon une nouvelle partie est lancée

    // On supprime les accents de l'entrée de l'utilisateur sinon le mot sera faux
    let motSansAccents = supprimerAccents(mot.value);

    if (motSansAccents === motADeviner.join('')) {
        alert('Bravo! Vous avez deviné le mot ' + motAleatoire);
        nouvellePartie();
    } else if (coups === 0) {
        alert('Vous avez perdu! Il fallait deviner le mot : ' + motAleatoire);
        nouvellePartie();
    } else {
        alert('Désolé, ce n\'est pas le bon mot. Vous perdez une vie');
        coups--;
        image.src = `../images/${++numeroImage}.png`;
        score.textContent = coups;
    }

    // Réinitialisation du champ de saisie
    mot.value = '';
});