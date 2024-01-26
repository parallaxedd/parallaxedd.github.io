const alphabet="abcdefghijklmnopqrstuvwxyz",uppers=alphabet.toUpperCase().split(""),lowers=alphabet.split(""),nums=[0,1,2,3,4,5,6,7,8,9],specials=["!","@","#","$","%","-"];function randomNum(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e)+e)}function shuffleArray(e){for(var t=e.length-1;0<t;t--){var s=Math.floor(Math.random()*(t+1)),o=e[t];e[t]=e[s],e[s]=o}}function passwordMaker(e){let t=[];var s=randomNum(e/5,e/3),o=randomNum(e/4,e/3),n=randomNum(e/4,e/3),d=e-s-o-n;for(let e=0;e<s;e++)t.push(uppers[randomNum(0,uppers.length-1)]);for(let e=0;e<o;e++)t.push(lowers[randomNum(0,lowers.length-1)]);for(let e=0;e<n;e++)t.push(nums[randomNum(0,nums.length-1)]);for(let e=0;e<d;e++)t.push(specials[randomNum(0,specials.length-1)]);return shuffleArray(t),t.join("")}let myPass,dotsPass="",shown=!1,theme="dark";var r=document.querySelector(":root");function swapHoverColor(){"light"==theme?(r.style.setProperty("--button-hover-color","#212121"),r.style.setProperty("--button-text-color","#e8e8e8")):"dark"==theme&&(r.style.setProperty("--button-hover-color","#e8e8e8"),r.style.setProperty("--button-text-color","#212121"))}function makeNewPass(){if(!document.getElementById("len").value)return alert("You did not enter a length.");if(document.getElementById("len").value<8||20<document.getElementById("len").value)return alert("Your password must be between 8 and 20 characters.");myPass=passwordMaker(document.getElementById("len").value),dotsPass="";for(let e=0;e<myPass.length;e++)dotsPass+="•";document.getElementById("eye").src="hide.svg",document.getElementById("pass").classList.remove("font-sm"),document.getElementById("pass").classList.add("font-lg"),shown=!1,document.getElementById("pass").innerHTML=dotsPass}function showHidePass(){null!=myPass&&(0==shown?(document.getElementById("eye").src="show.svg",document.getElementById("pass").innerHTML=myPass,document.getElementById("pass").classList.remove("font-lg"),document.getElementById("pass").classList.add("font-sm"),shown=!0):1==shown&&(document.getElementById("eye").src="hide.svg",document.getElementById("pass").innerHTML=dotsPass,document.getElementById("pass").classList.add("font-lg"),document.getElementById("pass").classList.remove("font-sm"),shown=!1))}function themeToggle(){"dark"==theme?(document.getElementById("dlm").src="sun.svg",document.body.classList.remove("light-mode"),document.body.classList.add("dark-mode"),document.getElementById("len").classList.remove("light-mode-input"),document.getElementById("new").classList.remove("light-mode-input"),document.getElementById("len").classList.add("dark-mode-input"),document.getElementById("new").classList.add("dark-mode-input"),document.getElementById("dlm").classList.remove("moon-filter"),document.getElementById("dlm").classList.add("sun-filter"),swapHoverColor(),theme="light"):"light"==theme&&(document.getElementById("dlm").src="moon.svg",document.body.classList.add("light-mode"),document.body.classList.remove("dark-mode"),document.getElementById("len").classList.add("light-mode-input"),document.getElementById("new").classList.add("light-mode-input"),document.getElementById("len").classList.remove("dark-mode-input"),document.getElementById("new").classList.remove("dark-mode-input"),document.getElementById("dlm").classList.remove("sun-filter"),document.getElementById("dlm").classList.add("moon-filter"),swapHoverColor(),theme="dark")}
