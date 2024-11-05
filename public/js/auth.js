const DUMMY_CONFIRMATION_CODE = "123456";

function signInWithEmailAndPassword(email, password) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      console.error("Login with email failed", error);
      throw error;
    });
}

function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/userinfo.email");

  return firebase
    .auth()
    .signInWithPopup(provider)
    .catch(function (error) {
      console.error("Login with Google failed", error);
      throw error;
    });
}

function getRecaptchaVerifier() {
  return new firebase.auth.RecaptchaVerifier("recaptcha-container");
}

function getConfirmationCode() {
  return DUMMY_CONFIRMATION_CODE;
}

async function signInWithPhoneNumber(phoneNumber) {
  let appVerifier;
  try {
    appVerifier = await getRecaptchaVerifier();
  } catch (error) {
    console.error("Recaptcha error", error);
    throw error;
  }

  const confirmationResult = await firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .catch((error) => {
      console.error("Login with phone number failed", error);
      throw error;
    });

  // NOTE: Get confirmation code on user input event in real world
  const confirmationCode = getConfirmationCode();
  return confirmationResult.confirm(confirmationCode).catch((error) => {
    console.error("Confirmation code error", error);
    throw error;
  });
}

function signOut() {
  return firebase
    .auth()
    .signOut()
    .catch((error) => {
      throw error;
    });
}
