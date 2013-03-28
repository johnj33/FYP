function Initialise() {
    try{
        var image = document.getElementById("image");

        image.src = localStorage["img"];
    }
    catch (ex) {
        alert(ex);
    }
}