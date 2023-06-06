const btnMenu = document.getElementById('btn-menu');
const navbar = document.getElementsByClassName('navbar');

btnMenu.addEventListener ("click", () => {
    openMenu()
});


function openMenu() {
    navbar.style.opacity = "0";
}