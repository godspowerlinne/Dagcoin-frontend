// Delay the link click event by 500ms
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setTimeout(() => {
        window.location.href = link.href;
      }, 300);
    })
  );
});

// Function to toggle the loading spinner
function toggleLoading() {
  const spinner = document.getElementById("spinner");
  const buttonText = document.getElementById("buttonText");

  // Toggle loading state
  spinner.classList.toggle("hidden");
  buttonText.classList.toggle("hidden");

  // Simulate a delay
  setTimeout(() => {
    spinner.classList.add("hidden");
    buttonText.classList.remove("hidden");
  }, 2000); // After 2 seconds, revert to the normal button
}

// Get form elements
const signupForm = document.getElementById("signupForm");
const username = document.getElementById("username");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const signupButton = document.getElementById("signupButton");

// Get elements for error messages
const usernameError = document.getElementById("usernameError");
const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const phoneError = document.getElementById("phoneError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const passwordStrength = document.getElementById("passwordStrength");
const passwordStrengthValue = document.getElementById("passwordStrengthValue");
const userError = document.getElementById("userError");

// Disable the signup button initially
signupButton.disabled = true;

// validate username
function isValidUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9]+$/; // Only alphanumeric characters
  const isValid = usernameRegex.test(username); // Check if the username matches the regex (true or false)
  usernameError.classList[isValid ? "add" : "remove"]("hidden");
  if (username === "") {
    usernameError.className = `text-sm text-red-500 items-center gap-1 absolute bottom-0 left-0 translate-y-6 z-[1] opacity-80 hidden`;
  }
  return isValid;
}

// validated First Name
function isValidFirstName(firstName) {
  const firstNameRegex = /^[a-zA-Z '-]{1,}$/;
  const isValid = firstNameRegex.test(firstName); // Check if the first name matches the regex (true or false)
  firstNameError.classList[isValid ? "add" : "remove"]("hidden");
  if (firstName === "") {
    firstNameError.classList.add("hidden");
  }
  return isValid;
}

// validated Last Name
function isValidLastName(lastName) {
  const lastNameRegex = /^[a-zA-Z '-]{1,}$/;
  const isValid = lastNameRegex.test(lastName); // Check if the last name matches the regex (true or false)
  lastNameError.classList[isValid ? "add" : "remove"]("hidden");
  if (lastName === "") {
    lastNameError.classList.add("hidden");
  }
  return isValid;
}

// validated phone number
function isValidPhoneNumber(phone) {
  const phoneRegex =
    /^(?:\+234|0|234)?(70|80|81|90|91|802|803|804|805|806|807|808|809)\d{8}$/;
  const isValid = phoneRegex.test(phone); // Check if the phone number matches the regex (true or false)
  phoneError.classList[isValid ? "add" : "remove"]("hidden");
  if (phone === "") {
    phoneError.classList.add("hidden");
  }
  return isValid;
}

// validated email
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = emailRegex.test(email);
  emailError.classList[isValid ? "add" : "remove"]("hidden");
  if (email === "") {
    emailError.classList.add("hidden");
  }
  return isValid;
}

// calculate password strength
function getPasswordStrength(password) {
  if (password === "") {
    passwordStrength.classList.add("hidden");
  } else {
    passwordStrength.classList.remove("hidden");
  }
  if (password === "") {
    passwordError.classList.add("hidden");
  } else if (password.length < 8) {
    passwordStrengthValue.innerHTML = `weak <i class='bx bx-shield-x translate-y-[1px]' ></i>`;
    passwordStrengthValue.className = "text-red-500 opacity-80";
    passwordError.classList.remove("hidden");
  } else if (
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[@$!%*?&#]/.test(password)
  ) {
    passwordStrengthValue.innerHTML = `Strong <b class='bx bx-check-double translate-y-[-2px]' ></b> `;
    passwordStrengthValue.className = "text-green-500 opacity-80";
    passwordError.classList.add("hidden");
  } else if (
    (/[a-z]/.test(password) || /[A-Z]/.test(password)) &&
    /\d/.test(password)
  ) {
    passwordStrengthValue.innerHTML = `Medium <b class='bx bx-check translate-y-[-2px]' ></b> `;
    passwordStrengthValue.className = "text-yellow-500 opacity-80";
    passwordError.classList.add("hidden");
  } else {
    passwordStrengthValue.className = "opacity-80";
    passwordStrengthValue.innerHTML = `Weak <i class='bx bx-shield-x translate-y-[1px]' ></i>`;
    passwordError.classList.remove("hidden");
  }
  return password;
}

// check if password and confirm password match
function arePasswordMatching(password, confirmPassword) {
  if (password === confirmPassword) {
    confirmPasswordError.classList.add("hidden");
  } else if (confirmPassword === "") {
    confirmPasswordError.classList.add("hidden");
  } else {
    confirmPasswordError.classList.remove("hidden");
  }
  return password === confirmPassword;
}

// enable signup button if all fields are valid
signupForm.addEventListener("input", () => {
  if (
    isValidUsername(username.value) &&
    isValidFirstName(firstName.value) &&
    isValidLastName(lastName.value) &&
    isValidPhoneNumber(phone.value) &&
    isValidEmail(email.value) &&
    getPasswordStrength(password.value) &&
    arePasswordMatching(password.value, confirmPassword.value)
  ) {
    signupButton.disabled = false;
    signupButton.className = `h-[60px] text-[#A5A7B3] text-[19px] rounded-[20px] md:rounded-lg transition-all duration-500 hover:translate-y-[-2px] bg-gradient-to-b from-[#3039E5] to-[#7479d2] w-[100%] text-center`;
  } else {
    signupButton.disabled = true;
    signupButton.className = `h-[60px] text-[#A5A7B3]/50 text-[19px] rounded-[20px] md:rounded-lg cursor-not-allowed transition-all duration-500 hover:translate-y-[-2px] bg-gradient-to-b from-[#D9E0F6]/40 to-[#D9E0F6]/50  w-[100%] text-center `;
  }
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Gather data
  const signupData = {
    username: username.value.trim(),
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    phone: phone.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
  };

  const requestObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  };

  const url = "http://localhost:3000/dagcoin/api/signup"; // URL

  fetch(url, requestObject)
    .then((response) => {
      if (!response.ok) {
        const errorMessage = data.message || "Login Failed";
        throw new Error(errorMessage); // Throw error to prevent the success code from running
      }
      return response.json();
    })
    .then((data) => {
      alert("Signup Successful");
      setTimeout(() => {
        window.location.href = "./login.html";
      }, 300);
      signupForm.reset(); //cleans all user input from the form
    })
    .catch((err) => {
      const errorMessage = err.message; // Error message from the backend
      alert(`Signup Failed: ${errorMessage}`); // Handle error
      // Now you have the data from the backend containing the error message

      if (errorMessage) {
        userError.textContent = errorMessage; // Set the username error
      } else {
        userError.textContent = ""; // Clear the error if no issue with username
      }
    });
});
