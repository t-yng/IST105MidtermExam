firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    location.href = "culturalconnections.html";
  }
});

if (location.search.includes("unauthorized")) {
  alert("Unauthorized access. Please sign in.");
}

const passwordSignInButton = document.getElementById("sign-in-email-button");
passwordSignInButton.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(email, password);
  } catch (error) {
    alert("Login Failed");
  }
});

const googleSignInButton = document.getElementById("sign-in-google-button");
googleSignInButton.addEventListener("click", async () => {
  try {
    await signInWithGoogle();
  } catch (error) {
    alert("Login Failed");
  }
});

const DUMMY_PHONE_NUMBER = "+16505554567";
const phoneSignInButton = document.getElementById("sign-in-phone-button");
phoneSignInButton.addEventListener("click", async () => {
  const phoneNumber = DUMMY_PHONE_NUMBER;

  try {
    await signInWithPhoneNumber(phoneNumber);
  } catch (error) {
    console.error("Login with phone number failed", error);
    alert("Login Failed");
  }
});
