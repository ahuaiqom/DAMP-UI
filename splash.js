function goToHomepage() {
  window.location.href = "homepage.html";
}

window.addEventListener("load", () => {
    const splash = document.getElementById("splash-screen");
    const main = document.getElementById("main-content");
    const body = document.getElementsByTagName("body")[0];

    setTimeout(() => {
        splash.classList.add("fade-out");

        // Wait for the fade-out transition to complete before hiding
        setTimeout(() => {
        splash.style.display = "none";
        main.style.display = "block";
        }, 1000); // Match transition duration
    }, 2000); // Delay before starting fade

    setTimeout(() =>{
        body.style.display = "block";
    },3000);

});
