const alphabet = "abcdefghijklmnopqrstuvwxyz";
const uppers = alphabet.toUpperCase().split('');
const lowers = alphabet.split('');
const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const specials = ["!", "@", "#", "$", "%", "-", "_", "?"];

function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function checkSubs(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].toString().toLowerCase() == arr[i + 1].toString().toLowerCase()) {
            return false;
        }
    }
    return true;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function passwordMaker(length) {
    let password = [];

    let numOfUppers = randomNum(length / 4, length / 3);
    let numOfLowers = randomNum(length / 4, length / 3);
    let numOfNumbers = randomNum(length / 4, length / 3);
    let numOfSymbols = length - numOfUppers - numOfLowers - numOfNumbers;

    for (let i = 0; i < numOfUppers; i++) {
        password.push(uppers[randomNum(0, uppers.length)]);
    }

    for (let i = 0; i < numOfLowers; i++) {
        password.push(lowers[randomNum(0, lowers.length)]);
    }

    for (let i = 0; i < numOfNumbers; i++) {
        password.push(nums[randomNum(0, nums.length)]);
    }

    for (let i = 0; i < numOfSymbols; i++) {
        password.push(specials[randomNum(0, specials.length)]);
    }

    do {
        shuffleArray(password);
    }
    while (checkSubs(password) == false);

    return password.join('');
}

let myPass;
let dotsPass = "";
let shown = false;
let theme = "dark";
var r = document.querySelector(':root');
let firstAnim = true;

function swapHoverColor() {
    if (theme == "light") {
        r.style.setProperty('--button-hover-color', '#212121');
        r.style.setProperty('--button-text-color', '#e8e8e8');
    } else if (theme == "dark") {
        r.style.setProperty('--button-hover-color', '#e8e8e8');
        r.style.setProperty('--button-text-color', '#212121');
    }
}

function makeNewPass() {
    if (!document.getElementById("len").value) return alert("You did not enter a length.");
    if (document.getElementById("len").value < 8 || document.getElementById("len").value > 20) return alert("Your password must be between 8 and 20 characters.");

    myPass = passwordMaker(document.getElementById("len").value);
    dotsPass = "";
    for (let i = 0; i < myPass.length; i++) {
        dotsPass += "•";
    }

    if (shown == true) {
        document.getElementById("pass").innerHTML = myPass;
    } else if (shown == false) {
        document.getElementById("pass").innerHTML = dotsPass;
    }
}

function showHidePass() {
    if (myPass == undefined) return;

    if (shown == false) {
        document.getElementById("eye").src = "show.svg";
        document.getElementById("pass").innerHTML = myPass;
        document.getElementById("pass").classList.remove("font-lg");
        document.getElementById("pass").classList.add("font-sm");
        shown = true;
    } else if (shown == true) {
        document.getElementById("eye").src = "hide.svg";
        document.getElementById("pass").innerHTML = dotsPass;
        document.getElementById("pass").classList.add("font-lg");
        document.getElementById("pass").classList.remove("font-sm");
        shown = false;
    }
}

function themeToggle() {
    if (firstAnim == true) {
        document.getElementById("circle").classList.add("circle-anim");
        firstAnim = false;
    }

    document.getElementById("dlm_button").disabled = true;

    if (theme == "light") {
        document.getElementById("dlm").src = "sun.svg";

        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");

        document.getElementById("circle").classList.remove("circle-anim");

        requestAnimationFrame(() => {
            setTimeout(() => {
                document.getElementById("circle").classList.add("circle-anim");
            }, 0);
        });

        setTimeout(() => {
            document.body.classList.remove("light-mode-bg");
            document.body.classList.add("dark-mode-bg");
            document.getElementById("dlm_button").disabled = false;
        }, 300);

        document.getElementById("len").classList.remove("light-mode-input");
        document.getElementById("new").classList.remove("light-mode-input");
        document.getElementById("len").classList.add("dark-mode-input");
        document.getElementById("new").classList.add("dark-mode-input");

        document.getElementById("dlm").classList.remove("moon-filter");
        document.getElementById("dlm").classList.add("sun-filter");

        theme = "dark";
    } else if (theme == "dark") {
        document.getElementById("dlm").src = "moon.svg";

        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");

        document.getElementById("circle").classList.remove("circle-anim");

        requestAnimationFrame(() => {
            setTimeout(() => {
                document.getElementById("circle").classList.add("circle-anim");
            }, 0);
        });

        setTimeout(() => {
            document.body.classList.remove("dark-mode-bg");
            document.body.classList.add("light-mode-bg");
            document.getElementById("dlm_button").disabled = false;
        }, 300);

        document.getElementById("len").classList.remove("dark-mode-input");
        document.getElementById("new").classList.remove("dark-mode-input");
        document.getElementById("len").classList.add("light-mode-input");
        document.getElementById("new").classList.add("light-mode-input");

        document.getElementById("dlm").classList.remove("sun-filter");
        document.getElementById("dlm").classList.add("moon-filter");

        theme = "light";
    }

    swapHoverColor();
}
