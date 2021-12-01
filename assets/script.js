document.getElementById("theme_changer").addEventListener("change", (e) => {
    const {value} = e.target
    const body = document.getElementById("body")
    switch (parseInt(value)) {
        case 2:
            body.classList.remove("theme3")
            body.classList.add("theme2")
            break;
        case 3:
            body.classList.remove("theme2")
            body.classList.add("theme3")
            break;
        default:
            body.classList.remove("theme2", "theme3")
            break;
    }
})