
// =========================
// PASSWORD STRENGTH CHECKER
// =========================
function checkStrength(password) {

  const strengthText =
    document.getElementById("strength");

  // Default
  let strength = "Weak";

  // Conditions
  const hasUpper =
    /[A-Z]/.test(password);

  const hasLower =
    /[a-z]/.test(password);

  const hasNumber =
    /[0-9]/.test(password);

  const hasSymbol =
    /[^A-Za-z0-9]/.test(password);

  // Strong Password
  if (
    password.length >= 12 &&
    hasUpper &&
    hasLower &&
    hasNumber &&
    hasSymbol
  ) {
    strength = "Strong";
    strengthText.style.color = "green";
  }

  // Medium Password
  else if (
    password.length >= 8 &&
    (
      (hasUpper && hasLower) ||
      (hasNumber && hasSymbol)
    )
  ) {
    strength = "Medium";
    strengthText.style.color = "orange";
  }

  // Weak Password
  else {
    strength = "Weak";
    strengthText.style.color = "red";
  }

  // Update UI
  strengthText.innerText =
    `Password Strength: ${strength}`;
}