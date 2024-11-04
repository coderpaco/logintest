/*
  Inspired by: "Login Page & Homepage"
  By: Neo  Link: https://dribbble.com/shots/4485321-Login-Page-Homepage
*/

let usernameInput = document.querySelector(".username");
let passwordInput = document.querySelector(".password");
let repeatPasswordInput = document.querySelector(".repeat-password");
let emailInput = document.querySelector(".email");
let showPasswordButton = document.querySelector(".password-button");
let face = document.querySelector(".face");
let toggleSignUpButton = document.querySelector(".toggle-signup");
let loginButton = document.querySelector('.login-button');
let signupFields = document.querySelector(".additional-fields"); // Select the signup fields

passwordInput.addEventListener("focus", (event) => {
  document.querySelectorAll(".hand").forEach((hand) => {
    hand.classList.add("hide");
  });
  document.querySelector(".tongue").classList.remove("breath");
});

passwordInput.addEventListener("blur", (event) => {
  document.querySelectorAll(".hand").forEach((hand) => {
    hand.classList.remove("hide");
    hand.classList.remove("peek");
  });
  document.querySelector(".tongue").classList.add("breath");
});

usernameInput.addEventListener("focus", (event) => {
  let length = Math.min(usernameInput.value.length - 16, 19);
  document.querySelectorAll(".hand").forEach((hand) => {
    hand.classList.remove("hide");
    hand.classList.remove("peek");
  });

  face.style.setProperty("--rotate-head", `${-length}deg`);
});

usernameInput.addEventListener("blur", (event) => {
  face.style.setProperty("--rotate-head", "0deg");
});

usernameInput.addEventListener(
  "input",
  _.throttle((event) => {
    let length = Math.min(event.target.value.length - 16, 19);
    face.style.setProperty("--rotate-head", `${-length}deg`);
  }, 100)
);

showPasswordButton.addEventListener("click", (event) => {
  if (passwordInput.type === "text") {
    passwordInput.type = "password";
    document.querySelectorAll(".hand").forEach((hand) => {
      hand.classList.remove("peek");
      hand.classList.add("hide");
    });
  } else {
    passwordInput.type = "text";
    document.querySelectorAll(".hand").forEach((hand) => {
      hand.classList.remove("hide");
      hand.classList.add("peek");
    });
  }
});
//switch between login and reg modes
toggleSignUpButton.addEventListener("click", () => {
    const isSignUpVisible = signupFields.classList.contains("active");

    if (isSignUpVisible) {
              // Slide up to hide the fields
              signupFields.classList.remove("active");
              signupFields.classList.add("hidden");
              loginButton.textContent = "Sign In";
              toggleSignUpButton.textContent = "Don't have an account yet? Sign Up";
          } else {
              // Slide down to show the fields
              signupFields.classList.remove("hidden");
              setTimeout(() => {
                  signupFields.classList.add("active");
              }, 10); // Small timeout to trigger the transition
              loginButton.textContent = "Register";
              toggleSignUpButton.textContent = "Already have an account? Login";
        }
});

//Added below
function showPopup(isCorrect) {
  const popup = document.getElementById('popup');
  const message = document.getElementById('popup-message');

  // Set message and style based on password correctness
  if (isCorrect) {
    message.textContent = 'Correct password!';
    popup.classList.add('correct');
    popup.classList.remove('incorrect');
  } else {
    message.textContent = 'Incorrect password!';
    popup.classList.add('incorrect');
    popup.classList.remove('correct');
  }

  // Display the popup
  popup.classList.remove('hidden');

  // Hide the popup after 3 seconds
  setTimeout(() => {
    popup.classList.add('hidden');
  }, 3000);
}

// Example function to simulate password check and show popup
document.querySelector('.login-button').addEventListener('click', (e) => {
  e.preventDefault(); // Prevent form submission for testing

  // Check password (you'd replace this with real validation logic)
  const password = document.querySelector('.password').value;
  const isCorrect = password === 'abc123!'; // Replace with actual check

  showPopup(isCorrect);
});

