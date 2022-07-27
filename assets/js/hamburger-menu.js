document.addEventListener('DOMContentLoaded', () => {
    console.log('we loaded hamburger-menu.js');

    let hamburgerMenu = document.querySelector('nav.nav-mobile');
    let bar1 = hamburgerMenu.querySelector('#bar1');
    let bar2 = hamburgerMenu.querySelector('#bar2');
    let bar3 = hamburgerMenu.querySelector('#bar3');
    let navList = document.getElementById("menu-no-animation");
    console.log(navList);
    console.log(hamburgerMenu);

    hamburgerMenu.addEventListener('click', () => {
        if (hamburgerMenu.getAttribute('data-hamburger-clicked') === 'false') {
            hamburgerMenu.setAttribute('data-hamburger-clicked', 'true');

            bar1.style.transform = "translateY(4px) rotate(-45deg)"
            bar2.style.opacity = "0";
            bar3.style.transform = "translateY(-6px) rotate(45deg)"
            navList.style.display = "block";
            console.log('hamburger is now true');
        } else {
            hamburgerMenu.setAttribute('data-hamburger-clicked', 'false');

            bar1.style.transform = "translateY(-4px) rotate(0deg)"
            bar2.style.opacity = "100";
            bar3.style.transform = "translateY(6px) rotate(0deg)"
            navList.style.display = "none";
            console.log('hamburger is now false');
        }
    });
});