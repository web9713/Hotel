// EmailJS Initialize

emailjs.init("edOO0w7Ejq5L2_kEZ");



// Booking Form

const bookingForm = document.getElementById("booking-form");


bookingForm.addEventListener("submit", function(event){

    event.preventDefault();


    emailjs.sendForm(
        "service_j679egi",
        "template_gc1qc6p",
        this
    )

    .then(function(){

        alert("Booking request sent successfully!");

        bookingForm.reset();


    }, function(error){

        alert("Failed to send booking. Please try again.");

        console.log(error);

    });


});





// Smooth scroll for navigation

document.querySelectorAll("a[href^='#']").forEach(link => {

    link.addEventListener("click", function(e){

        let target = document.querySelector(
            this.getAttribute("href")
        );


        if(target){

            e.preventDefault();

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});
