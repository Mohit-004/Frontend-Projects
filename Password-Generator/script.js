
// =========================
// BUSINESS LOGIC
// =========================
function generatePassword() {

  // Inputs
  const length =
    Number(document.getElementById("length").value);

  // Character Sets
  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+[]{}|;:,.<>?"
  };

  // Build Character Pool
  let allChars = "";

  for (let key in charSets) {

    if (document.getElementById(key).checked) {
      allChars += charSets[key];
    }

  }

  // Validation
  if (!allChars) {
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

// =========================
// COPY PASSWORD
// =========================
function copyPassword() {

  const passwordField =
    document.getElementById("password");

  // Validation
  if (!passwordField.value) {
    alert("Generate password first!");
    return;
  }

  // Copy Password
  navigator.clipboard.writeText(
    passwordField.value
  );

  alert("Password copied!");
}
