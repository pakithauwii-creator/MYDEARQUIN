/* ==========================================
   MY QUEEN QUINN 👑❤️
   INTERACTIVE JAVASCRIPT
========================================== */


/* ==========================================
   SECTION TRACKING
========================================== */

const sections = [
    "photos",
    "intimacy",
    "secret",
    "future",
    "romance",
    "other"
];

let exploredSections =
    JSON.parse(localStorage.getItem("quinnExplored")) || [];


/* ==========================================
   ENTER KINGDOM
========================================== */

function enterKingdom() {

    showScreen("kingdom");

    createWelcomeHearts();

}


/* ==========================================
   SHOW SCREEN
========================================== */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {
            screen.classList.remove("active");
        });

    const screen =
        document.getElementById(id);

    if (screen) {

        screen.classList.add("active");

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ==========================================
   OPEN SECTION
========================================== */

function openSection(sectionName) {

    showScreen(sectionName);


    if (!exploredSections.includes(sectionName)) {

        exploredSections.push(sectionName);

        localStorage.setItem(
            "quinnExplored",
            JSON.stringify(exploredSections)
        );

    }

    updateProgress();

}


/* ==========================================
   BACK TO KINGDOM
========================================== */

function backToKingdom() {

    showScreen("kingdom");

}


/* ==========================================
   PROGRESS
========================================== */

function updateProgress() {

    const completed =
        exploredSections.length;

    const total =
        sections.length;

    const percentage =
        (completed / total) * 100;


    const progressText =
        document.getElementById("progressText");

    const progressFill =
        document.getElementById("progressFill");


    if (progressText) {

        progressText.textContent =
            `${completed} / ${total} sections explored`;

    }


    if (progressFill) {

        progressFill.style.width =
            `${percentage}%`;

    }

    /* Check if all sections are explored to trigger final popup */
    if (completed === total && !localStorage.getItem("quinnFinalShown")) {

        localStorage.setItem("quinnFinalShown", "true");

        setTimeout(() => {

            showFinalMessage();

        }, 1000);

    }

}


/* ==========================================
   CHOICE BUTTONS & WEB3FORMS MAPPING
========================================== */

document.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(".choices button");

        if (!button) return;


        const container =
            button.closest(".choices");


        container
            .querySelectorAll("button")
            .forEach(btn => {

                btn.classList.remove(
                    "selected"
                );

            });


        button.classList.add(
            "selected"
        );


        const choiceValue = button.getAttribute("data-value") || button.innerText;

        /* Map selection to hidden input for Web3Forms */
        const targetId = container.getAttribute("data-target");

        if (targetId) {

            const hiddenInput = document.getElementById(targetId);

            if (hiddenInput) {

                hiddenInput.value = choiceValue;

            }

        }


        saveAnswer(
            button.closest(".question-card"),
            choiceValue
        );

    }
);


/* ==========================================
   SAVE TEXT ANSWERS
========================================== */

document.addEventListener(
    "input",
    function(event) {

        if (
            event.target.tagName !== "TEXTAREA"
        ) {
            return;
        }


        const textarea =
            event.target;


        const card =
            textarea.closest(
                ".question-card, .sub-card"
            );


        if (!card) return;


        const question =
            card.querySelector("h3");


        if (!question) return;


        const key =
            "quinn_" +
            question.innerText.trim();


        localStorage.setItem(
            key,
            textarea.value
        );

    }
);


/* ==========================================
   RESTORE TEXT ANSWERS & CHOICES
========================================== */

function restoreAnswers() {

    document
        .querySelectorAll("textarea")
        .forEach(textarea => {

            const card =
                textarea.closest(
                    ".question-card, .sub-card"
                );


            if (!card) return;


            const question =
                card.querySelector("h3");


            if (!question) return;


            const key =
                "quinn_" +
                question.innerText.trim();


            const saved =
                localStorage.getItem(key);


            if (saved !== null) {

                textarea.value =
                    saved;

            }

        });


    /* Restore button selections and populate hidden inputs */
    document
        .querySelectorAll(".choices")
        .forEach(container => {

            const card = container.closest(".question-card, .sub-card");

            if (!card) return;

            const question = card.querySelector("h3");

            if (!question) return;

            const savedChoice = localStorage.getItem("choice_" + question.innerText.trim());

            if (savedChoice) {

                const targetId = container.getAttribute("data-target");

                if (targetId) {

                    const hiddenInput = document.getElementById(targetId);

                    if (hiddenInput) hiddenInput.value = savedChoice;

                }

                container.querySelectorAll("button").forEach(btn => {

                    const val = btn.getAttribute("data-value") || btn.innerText;

                    if (val.trim() === savedChoice.trim()) {

                        btn.classList.add("selected");

                    }

                });

            }

        });

}


/* ==========================================
   SAVE CHOICE
========================================== */

function saveAnswer(card, answer) {

    if (!card) return;


    const question =
        card.querySelector("h3");


    if (!question) return;


    localStorage.setItem(
        "choice_" + question.innerText.trim(),
        answer
    );

}


/* ==========================================
   WEB3FORMS SUBMIT HANDLING
========================================== */

document.addEventListener("submit", function(event) {

    const form = event.target;

    if (form.tagName === "FORM") {

        const btn = form.querySelector(".submit-btn");

        if (btn) {

            btn.innerText = "Sending to your King... 👑";

            btn.style.opacity = "0.7";

            btn.style.pointerEvents = "none";

        }

    }

});


/* ==========================================
   ROMANTIC HEARTS
========================================== */

function createHeart() {

    const heart =
        document.createElement("div");


    const symbols = [
        "❤️",
        "💗",
        "💕",
        "✨",
        "💖"
    ];


    heart.innerText =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];


    heart.className =
        "floating-heart";


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        (12 + Math.random() * 18) + "px";


    heart.style.animationDuration =
        (4 + Math.random() * 4) + "s";


    document.body.appendChild(
        heart
    );


    setTimeout(() => {

        heart.remove();

    }, 8000);

}


/* Start occasional hearts */

setInterval(
    createHeart,
    3500
);


/* ==========================================
   WELCOME HEART BURST
========================================== */

function createWelcomeHearts() {

    for (
        let i = 0;
        i < 12;
        i++
    ) {

        setTimeout(
            createHeart,
            i * 100
        );

    }

}


/* ==========================================
   SECRET QUEEN EASTER EGG
========================================== */

let crownClicks = 0;


document.addEventListener(
    "click",
    function(event) {

        const crown =
            event.target.closest(
                ".queen-icon"
            );


        if (!crown) return;


        crownClicks++;


        if (crownClicks >= 5) {

            crownClicks = 0;

            showSecretMessage();

        }

    }
);


/* ==========================================
   SECRET MESSAGE
========================================== */

function showSecretMessage() {

    const messages = [

        "You found the secret, my Queen. 👑❤️",

        "Yes... I'm still obsessed with you. 😂❤️",

        "You're stuck with me. Sorry. 😂",

        "I hope you know how special you are. ❤️",

        "Stop being so beautiful. It's distracting. 😭❤️",

        "Secret unlocked: I miss you. 🥺❤️"

    ];


    const message =
        messages[
            Math.floor(
                Math.random() *
                messages.length
            )
        ];


    const popup =
        document.createElement("div");


    popup.className =
        "secret-popup";


    popup.innerHTML = `

        <div class="secret-box">

            <div class="secret-crown">
                👑
            </div>

            <h2>
                SECRET LEVEL UNLOCKED
            </h2>

            <p>
                ${message}
            </p>

            <button onclick="closeSecret()">
                Keep My Secret 🤫
            </button>

        </div>

    `;


    document.body.appendChild(
        popup
    );


    createConfetti();

}


/* ==========================================
   CLOSE SECRET
========================================== */

function closeSecret() {

    const popup =
        document.querySelector(
            ".secret-popup"
        );


    if (popup) {

        popup.remove();

    }

}


/* ==========================================
   CONFETTI
========================================== */

function createConfetti() {

    const symbols = [
        "❤️",
        "💖",
        "✨",
        "💕",
        "👑"
    ];


    for (
        let i = 0;
        i < 30;
        i++
    ) {

        const piece =
            document.createElement("div");


        piece.className =
            "confetti";


        piece.innerText =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.animationDelay =
            Math.random() * 0.8 + "s";


        document.body.appendChild(
            piece
        );


        setTimeout(() => {

            piece.remove();

        }, 4000);

    }

}


/* ==========================================
   FINAL MESSAGE
========================================== */

function showFinalMessage() {

    const popup =
        document.createElement("div");


    popup.className =
        "final-popup";


    popup.innerHTML = `

        <div class="final-box">

            <div class="final-crown">
                👑
            </div>

            <p class="small-title">
                ONE LAST THING
            </p>

            <h1>
                My Queen Quinn ❤️
            </h1>

            <p>
                You don't have to change
                anything to deserve love.
            </p>

            <p>
                You don't have to be perfect.
            </p>

            <p>
                You only have to be yourself.
            </p>

            <h3>
                You're already perfect
                exactly as you are. ❤️
            </h3>

            <button onclick="finishExperience()">
                I'M QUINN 👑
            </button>

        </div>

    `;


    document.body.appendChild(
        popup
    );


    createConfetti();

}


/* ==========================================
   FINISH EXPERIENCE
========================================== */

function finishExperience() {

    const popup =
        document.querySelector(
            ".final-popup"
        );


    if (popup) {

        popup.remove();

    }


    createConfetti();


    setTimeout(() => {

        alert(
            "Queen Quinn has officially completed her kingdom. 👑❤️"
        );

    }, 800);

}


/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateProgress();

        restoreAnswers();

    }
);
