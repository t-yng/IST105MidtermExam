let signedOutManually = false;

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    const url = new URL(location.origin);
    url.pathname = "/";
    if (!signedOutManually) {
      url.searchParams.append("unauthorized", "");
    }

    location.href = url.href;
  }
});

const signOutButton = document.getElementById("sign-out-button");
signOutButton.addEventListener("click", () => {
  signOut()
    .then(() => {
      signedOutManually = true;
    })
    .catch((error) => {
      console.error("Sign out failed", error);
      alert("Sign out failed");
    });
});
