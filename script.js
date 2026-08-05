// Mobile Menu

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");


menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});





// Scroll Reveal Animation

const reveals = document.querySelectorAll(".reveal");


function revealOnScroll(){

    for(let i = 0; i < reveals.length; i++){

        let windowHeight = window.innerHeight;

        let elementTop = reveals[i].getBoundingClientRect().top;

        let elementVisible = 100;


        if(elementTop < windowHeight - elementVisible){

            reveals[i].classList.add("active");

        }

    }

}


window.addEventListener("scroll", revealOnScroll);


revealOnScroll();






// Close mobile menu after clicking link

const links = document.querySelectorAll(".nav-links a");


links.forEach(link => {

    link.addEventListener("click",()=>{

        navLinks.classList.remove("active");

    });

});






// Booking Button Message

const bookingForm = document.querySelector(".booking-form");


bookingForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    alert("Thank you! Your booking request has been received.");

});
