

// Display the initial overlay on the page and set click listener for
// the button to start the animation. Runns automaticaly on page load
(function injectOverlay() {
    var overlayBg = document.createElement('div');
    overlayBg.id = "overlay";
    overlayBg.classList.add('overlay');

    var buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.innerHTML = "<p class='helpful-message'>It seems like you are heading home, do you want me to suggest the safest way for you?</p>";

    var button = document.createElement('button');
    button.innerHTML = "Yes!";
    button.classList.add('initialize-button');
    button.addEventListener('click', function(e) {
        removeOverlay();
        showReasoning(0);
    });

    buttonContainer.appendChild(button);
    overlayBg.appendChild(buttonContainer);
    document.body.appendChild(overlayBg);

})();

function removeOverlay() {
    var element = document.getElementById("overlay");
    element.parentElement.removeChild(element);
}

function showReasoning(index) {
    if (index === images.length) {
        showResult();
        return;
    } 

    var i = 0;
    var container = document.getElementById("decision-content-wrapper");
    container.innerHTML = "<h1>Evaluating route: " + (index + 1) + "</h1>";

    insertMap(index);
    

    var timer = setInterval(function() {
        if (i === strings[index].length) {
            clearInterval(timer);
            cleanUpEvaluation();
            showReasoning(index + 1);
            return;
        }
        
        var node = "<p class='reasoning-entry'>" + strings[index][i] + "</p>";
        container.innerHTML += node;
        i++;
    }, 3500);
}


 // Adds the image at the provided index from the image array into the page
function insertMap(index) {
    var mapContainer = document.getElementById("map-content-wrapper");
    var image = document.createElement("img");
    image.id = "currentMap";
    image.classList.add('current-map');
    image.setAttribute("src", images[index]);
    mapContainer.appendChild(image);
}

// Removes the map image and clears the text
function cleanUpEvaluation() {
    var imageElement = document.getElementById("currentMap");
    imageElement.parentElement.removeChild(imageElement);

    var decisionEntries = document.getElementById("decision-content-wrapper");
    decisionEntries.innerHTML = "";
}

function showResult() {
    var index = 1;
    insertMap(index);

    var container = document.getElementById("decision-content-wrapper");
    container.innerHTML = "<h1>Safest route!</h1>";
}