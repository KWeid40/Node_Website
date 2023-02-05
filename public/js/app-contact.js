console.log("client side JS");
const feedbackForm = document.getElementsByClassName("feedback-form");
const recipient_input = document.getElementById("email");
const feedback_input = document.getElementById("feedback");
const recipient_error = document.getElementsByClassName("error-recipient");
const body_error = document.getElementsByClassName("error-body");

console.log(recipient_error);

feedbackForm[0].addEventListener("submit", (e) => {
  e.preventDefault();

  const recipient = recipient_input.value;
  const body = feedback_input.value;

  recipient_error[0].innerHTML = "";
  body_error[0].innerHTML = "";

  if (!recipient) {
    console.log(recipient_error[0]);
    recipient_error[0].innerHTML = "Please enter an email address";
    recipient_error[0].style.color = "red";
  } else {
    if (!body) {
      body_error[0].innerHTML = "Please add a message";
      body_error[0].style.color = "red";
    } else {
      const bodytemp =
        "Good day and thank you for contacting me. I will read your message as soon as Possible and get back to you.";
      if (validateEmail(recipient)) {
        console.log("Email valid");
        fetch(
          `http://localhost:3000/sendmail?recipient=${recipient}&body=${bodytemp} Your message: "${body}"`
        )
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });

        fetch(
          `http://localhost:3000/sendmail?recipient=kweidenmann40@gmail.com&body=${body} from ${recipient}`
        ).then((response) => {
          console.log(response);
        });
      } else {
        recipient_error[0].innerHTML = "Please add valid email address";
        recipient_error[0].style.color = "red";
      }
      /*;*/
    }
  }

  /* */
});
//http://localhost:3000/sendmail?recipient=kweidenmann40@gmail.com&body=testmail
function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
