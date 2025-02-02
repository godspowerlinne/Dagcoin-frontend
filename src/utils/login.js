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
const loginForm = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginButton = document.getElementById("loginButton");

// Error message from backend
const userError = document.getElementById("userError");

// Disable the login button initially
loginButton.disabled = true;

// Add event listeners to form fields
username.addEventListener("input", validateForm);
password.addEventListener("input", validateForm);

// Function to validate form fields
function validateForm() {
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();
  // Enable the login button if both fields are valid
  if (usernameValue && passwordValue) {
    loginButton.disabled = false;
    loginButton.className = `h-[60px] text-[#A5A7B3] text-[19px] rounded-[20px] md:rounded-lg transition-all duration-500 hover:translate-y-[-2px] bg-gradient-to-b from-[#3039E5] to-[#7479d2] w-[100%] text-center`;
  } else {
    loginButton.disabled = true;
    loginButton.className = `h-[60px] text-[#A5A7B3]/50 text-[19px] rounded-[20px] md:rounded-lg cursor-not-allowed transition-all duration-500 hover:translate-y-[-2px] bg-gradient-to-b from-[#D9E0F6]/40 to-[#D9E0F6]/50  w-[100%] text-center`;
  }
}

// Add event listener to form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Gather data
  const loginData = {
    username: username.value.trim(),
    password: password.value.trim(),
  };

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  };

  const url = "http://localhost:3000/dagcoin/api/login"; // URL

  fetch(url, request)
    .then((response) => {
      return response.json().then((data) => {
        if (!response.ok) {
          const errorMessage = data.message || "Login Failed";

          throw new Error(errorMessage); // Throw error to prevent the success code from running
        }
        return data; // This will be passed to the next `.then()`
      });
    })
    .then((data) => {
      alert("Login Successful");
      setTimeout(() => {
        window.location.href = "/src/welcome.html"; // Redirect to welcome page
      }, 300);
    })
    .catch((err) => {
      const errorMessage = err.message; // Error message from the backend
      alert(`Login Failed: ${errorMessage}`); // Handle error
      // Now you have the data from the backend containing the error message

      if (errorMessage) {
        userError.textContent = errorMessage; // Set the username error
      } else {
        userError.textContent = ""; // Clear the error if no issue with username
      }
    });
});
