// Once the window is loaded...
window.addEventListener("load", function(){

   // Check localStorage to see if the lander screen
   // has NOT already been displayed
   if(!sessionStorage.getItem("lander")){

     // lander has not been displayed, so show it:
    showMySite();

     // Store a value in localStorage to denote that the lander screen
     // has now been displayed
     sessionStorage.setItem("lander", "true");
   }else {
    document.getElementById("lander").style.display = "none"
    document.querySelector("html").style.overflow = "auto"
    document.querySelector("body").style.overflow = "auto"
    document.getElementById("navbar").style.display = "block"
    document.getElementById("first-div").style.display = "block"
    document.getElementById("sec-div").style.display = "block"
   }
});
var i = 0;
var txt = "Welcome to my Space !"; /* The text */
var speed = 100; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("autotype").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

function showMySite(){
  function showSite(){
    document.getElementById("lander").classList.add("hide-lander")
    document.getElementById("navbar").style.display = "block"
    document.getElementById("first-div").style.display = "block"
    document.getElementById("sec-div").style.display = "block"
    document.querySelector("html").style.overflow = "auto"
    document.querySelector("body").style.overflow = "auto"
  }
  setTimeout(showSite, 3500);
}



function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 160;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }

  }
}

window.addEventListener("scroll", reveal);

var prevScrollpos = window.scrollY;
window.onscroll = function() {
    var currentScrollpos = window.scrollY;
  if (currentScrollpos > 50) {
    document.getElementById("navbar").style.backgroundColor = "black";
  } else {
    document.getElementById("navbar").style.backgroundColor = "transparent";
  }
  prevScrollpos = currentScrollpos;
}

