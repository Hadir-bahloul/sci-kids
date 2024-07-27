// Function to handle changes based on the injected number
function handleConsoleInput(input) {
    if (input === 1) {
        removeYellowShades();
        document.body.style.fontSize = '50px'; // Change font size of the whole page
    }
}

// Function to generate all possible yellow shades
const generateAllYellowShades = () => {
    const yellowShades = [];
    for (let r = 100; r <= 255; r++) { // Red component from 151 to 255
        for (let g = 100; g <= 255; g++) { // Green component from 151 to 255
            for (let b = 0; b < 180; b++) { // Blue component from 0 to 149
                yellowShades.push(`rgb(${r}, ${g}, ${b})`);
            }
        }
    }
    return yellowShades;
};

// Function to convert a CSS color string (like rgb(255, 255, 0)) to an array of RGB values
const parseRGB = (rgbString) => {
    const result = rgbString.match(/\d+/g);
    return result ? result.map(Number) : [];
};

// Function to check if a color is a shade of yellow
const isYellowShade = (r, g, b) => {
    return (r > 100 && g > 100 && b < 180);
};

// Function to remove all yellow shades from the page
function removeYellowShades() {
    const elements = document.querySelectorAll('*'); // Select all elements
    const yellowShades = generateAllYellowShades();

    elements.forEach(element => {
        const bgColor = window.getComputedStyle(element).backgroundColor;
        const textColor = window.getComputedStyle(element).color;
        const borderTopColor = window.getComputedStyle(element).borderTopColor;
        const borderRightColor = window.getComputedStyle(element).borderRightColor;
        const borderBottomColor = window.getComputedStyle(element).borderBottomColor;
        const borderLeftColor = window.getComputedStyle(element).borderLeftColor;

        const [rBg, gBg, bBg] = parseRGB(bgColor);
        const [rText, gText, bText] = parseRGB(textColor);
        const [rBorderTop, gBorderTop, bBorderTop] = parseRGB(borderTopColor);
        const [rBorderRight, gBorderRight, bBorderRight] = parseRGB(borderRightColor);
        const [rBorderBottom, gBorderBottom, bBorderBottom] = parseRGB(borderBottomColor);
        const [rBorderLeft, gBorderLeft, bBorderLeft] = parseRGB(borderLeftColor);

        // Check if the element's background or text color is a yellow shade
        if (isYellowShade(rBg, gBg, bBg)) {
            element.style.backgroundColor = 'blue'; // Reset background color
        }
        if (isYellowShade(rText, gText, bText)) {
            element.style.color = 'red'; // Reset text color
        }
        // Check if the element's border color is a yellow shade
        if (isYellowShade(rBorderTop, gBorderTop, bBorderTop)) {
            element.style.borderTopColor = 'blue'; // Reset top border color
        }
        if (isYellowShade(rBorderRight, gBorderRight, bBorderRight)) {
            element.style.borderRightColor = 'blue'; // Reset right border color
        }
        if (isYellowShade(rBorderBottom, gBorderBottom, bBorderBottom)) {
            element.style.borderBottomColor = 'blue'; // Reset bottom border color
        }
        if (isYellowShade(rBorderLeft, gBorderLeft, bBorderLeft)) {
            element.style.borderLeftColor = 'blue'; // Reset left border color
        }
    });

    // Handle images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Apply a filter to make images with yellow hues appear blue
        img.style.filter = 'hue-rotate(180deg)';
    });
}

// Override console.log to handle custom inputs
(function() {
    const originalConsoleLog = console.log;

    console.log = function(message) {
        const number = Number(message);

        if (!isNaN(number)) {
            handleConsoleInput(number);
        }

        // Call the original console.log method
        originalConsoleLog.apply(console, arguments);
    };
})();
