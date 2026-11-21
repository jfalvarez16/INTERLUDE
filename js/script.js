
// Contact Us Form

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        const emailBody =
            "Name: " + name + "\n" +
            "Email: " + email + "\n\n" +
            "Message:\n" + message;

        const mailtoLink =
            "mailto:hello@examplewebsite142.com" +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(emailBody);

        window.location.href = mailtoLink;

    });

}
