// Mobile Menu Toggle

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");


menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});



// Close menu after clicking link

const navItems = document.querySelectorAll(".nav-links a");


navItems.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});




// Header background change on scroll

const header = document.querySelector(".header");


window.addEventListener("scroll", () => {


    if(window.scrollY > 50){

        header.style.background = "#111";

    }
    else{

        header.style.background = "rgba(0,0,0,0.65)";

    }


});




// Smooth reveal animation

const sections = document.querySelectorAll(".section");


const observer = new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }


    });


},{threshold:0.2});



sections.forEach(section=>{


    section.style.opacity="0";
    section.style.transform="translateY(40px)";
    section.style.transition="0.8s ease";


    observer.observe(section);


});
