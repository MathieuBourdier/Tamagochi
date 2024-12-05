class Pet {
    constructor(id) {
        this.id = id;
        this.fedLevel = 100; // Niveau de faim
        this.sleepLevel = 100; // Niveau d'énergie
        this.moodLevel = 100; // Niveau d'humeur
        this.isSleeping = false; // État indiquant si l'animal dort
        this.fedElement = document.getElementById(`hunger${id}`); // Élément pour la faim
        this.sleepElement = document.getElementById(`sleep1`); // Élément pour l'énergie
        this.moodElement = document.getElementById(`mood${id}`); // Élément pour l'humeur
        this.messageElement = document.getElementById(`message${id}`); // Message de statut
        this.displayElement = document.getElementById(`pet${id}`); // Conteneur principal du pet

        // Met à jour les valeurs initiales dans le DOM
        this.updateDisplay();
    }

    updateDisplay() {
        // Met à jour les éléments HTML avec les valeurs actuelles
        this.fedElement.innerText = this.fedLevel;
        this.sleepElement.innerText = this.sleepLevel;
        this.moodElement.innerText = this.moodLevel; // Mise à jour de l'humeur
    }

    decreaseFedLevel() {
        if (this.fedLevel > 0) {
            this.fedLevel -= 10; // Diminue de 10
            if (this.fedLevel === 0) {
                this.messageElement.innerText = "Your pet ran away due to hunger! 🐽";
                this.displayElement.style.opacity = 0.5; // Rend le pet semi-transparent
            }
            this.updateDisplay();
        }
    }

    decreaseSleepLevel() {
        // Diminue l'énergie uniquement si l'animal n'est pas en train de dormir
        if (!this.isSleeping && this.sleepLevel > 0) {
            this.sleepLevel -= 10; // Diminue de 10
            if (this.sleepLevel === 0) {
                this.messageElement.innerText = "Your pet ran away due to exhaustion! 😴";
                this.displayElement.style.opacity = 0.5; // Rend le pet semi-transparent
            }
            this.updateDisplay();
        }
    }

    decreaseMoodLevel() {
        // L'humeur diminue automatiquement si l'animal ne joue pas
        if (this.moodLevel > 0) {
            this.moodLevel -= 5; // Diminue de 5 toutes les 3 secondes
            if (this.moodLevel === 0) {
                this.messageElement.innerText = "Your pet is very bored and unhappy! 😔";
                this.displayElement.style.opacity = 0.5; // Rend le pet semi-transparent
            }
            this.updateDisplay();
        }
    }

    feed(amount) {
        this.fedLevel += amount; // Augmente le niveau de faim
        if (this.fedLevel > 100) this.fedLevel = 100;
        this.updateDisplay(); // Mise à jour de l'affichage
    }

    sleep(amount) {
        this.sleepLevel += amount; // Augmente le niveau d'énergie
        if (this.sleepLevel > 100) this.sleepLevel = 100;
        this.updateDisplay(); // Mise à jour de l'affichage
    }

    sleepAndRecover() {
        if (!this.isSleeping) {
            this.isSleeping = true; // L'animal commence à dormir
            this.messageElement.innerText = "Pet is sleeping... 💤";
            this.displayElement.style.opacity = 0.7; // Rend le pet un peu transparent pour montrer qu'il dort

            setTimeout(() => {
                this.sleep(30); // Récupère de l'énergie après un certain temps
                this.messageElement.innerText = "Pet woke up refreshed! 😊";
                this.displayElement.style.opacity = 1; // Restaurer l'opacité normale
                this.isSleeping = false; // L'animal arrête de dormir
            }, 5000); // Simulation de 5 secondes de sommeil
        }
    }

    play() {
        // Récupère l'humeur de l'animal lorsque l'utilisateur clique sur "Jouer"
        if (this.moodLevel < 100) {
            this.moodLevel += 20; // Augmente l'humeur de 20
            if (this.moodLevel > 100) this.moodLevel = 100; // Limite à 100
            this.messageElement.innerText = "Pet is playing and feels happy! 🎉";
            this.displayElement.style.opacity = 1; // Restaure l'opacité normale
            this.updateDisplay();
        }
    }
}

// Instanciation d'un objet Pet
let pet1 = new Pet(1);

// Déclenche diminution automatique toutes les 3 secondes
setInterval(() => {
    pet1.decreaseFedLevel(); // Diminue la faim
    pet1.decreaseSleepLevel(); // Diminue l'énergie uniquement si l'animal ne dort pas
    pet1.decreaseMoodLevel(); // Diminue l'humeur toutes les 3 secondes
}, 3000);

// Fonction appelée au clic sur le bouton "treat" (nourrir l'animal)
function feedPet(amount) {
    pet1.feed(amount * 20); // Nourrit l'animal
}

function sleepPet(amount) {
    pet1.sleep(amount * 50); // Lui redonne un peu d'énergie
}

// Fonction appelée au clic sur le bouton "Let Pet Sleep"
function makePetSleep() {
    pet1.sleepAndRecover(); // Fait dormir l'animal et récupère son énergie
}

// Fonction appelée au clic sur le bouton "Play"
function playWithPet() {
    pet1.play(); // Augmente l'humeur de l'animal
}
