//Business Logic
function generatePassword() {

  // Get Inputs
  const length =
    document.getElementById("length").value;

  const uppercase =
    document.getElementById("uppercase").checked;

  const lowercase =
    document.getElementById("lowercase").checked;

  const numbers =
    document.getElementById("numbers").checked;

  const symbols =
    document.getElementById("symbols").checked;

  // Character Sets
  const upperChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const lowerChars =
    "abcdefghijklmnopqrstuvwxyz";

  const numberChars =
    "0123456789";

  const symbolChars =
    "!@#$%^&*()_+[]{}|;:,.<>?";

  // Store all selected chars
  let allChars = "";

  if (uppercase) {
    allChars += upperChars;
  }

  if (lowercase) {
    allChars += lowerChars;
  }

  if (numbers) {
    allChars += numberChars;
  }

  if (symbols) {
    allChars += symbolChars;
  }

  // Validation
  if (allChars === "") {
    alert("Select at least one option!");
    return;
  }

  // Generate Password
  let password = "";

  for (let i = 0; i < length; i++) {

    const randomIndex =
      Math.floor(Math.random() * allChars.length);

    password += allChars[randomIndex];
  }

  // Display Password
  document.getElementById("password").value =
    password;
}

/* =========================
   COPY PASSWORD
========================= */
function copyPassword() {

  const passwordField =
    document.getElementById("password");

  // Select text
  passwordField.select();

  // Copy text
  navigator.clipboard.writeText(
    passwordField.value
  );

  alert("Password copied!");
}