const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click", generatePalette);

// Copy to clipboard
paletteContainer.addEventListener("click", function(e) {

    if (e.target.classList.contains("copy-btn")) {

        const hexValue = e.target.previousElementSibling.textContent;

        navigator.clipboard.writeText(hexValue);

        e.target.style.color = "green";

        setTimeout(() => {
            e.target.style.color = "";
        }, 500);
    }
});

function generatePalette() {

    const colors = [];

    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());
    }

    updatePaletteDisplay(colors);
}

function generateRandomColor() {

    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function updatePaletteDisplay(colors) {

    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach((box, index) => {

        const color = colors[index];
        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");

        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;

    });
}

// Auto generate on page load
generatePalette();

