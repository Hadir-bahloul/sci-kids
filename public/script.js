let originalStyles = new Map(); // To store original styles

// Function to handle changes based on the injected number
function handleConsoleInput(input) {
    if (input === 1) {
        removeYellowShades();
        increaseFontSize(); // Increase the font size of the whole page
    } else if (input === 0) {
        restoreOriginalStyles();
    }
}

// Function to generate all possible yellow shades
const generateAllYellowShades = () => {
    const yellowShades = [];
    for (let r = 100; r <= 255; r++) { // Red component from 100 to 255
        for (let g = 100; g <= 255; g++) { // Green component from 100 to 255
            for (let b = 0; b < 180; b++) { // Blue component from 0 to 179
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
    return (r >= 100 && g >= 100 && b < 180);
};

// Function to store original styles
const storeOriginalStyle = (element, property, value) => {
    if (!originalStyles.has(element)) {
        originalStyles.set(element, {});
    }
    originalStyles.get(element)[property] = value;
};

// Function to remove all yellow shades from the page
function removeYellowShades() {
    const elements = document.querySelectorAll('*'); // Select all elements

    elements.forEach(element => {
        const computedStyle = window.getComputedStyle(element);

        const bgColor = computedStyle.backgroundColor;
        const textColor = computedStyle.color;
        const borderTopColor = computedStyle.borderTopColor;
        const borderRightColor = computedStyle.borderRightColor;
        const borderBottomColor = computedStyle.borderBottomColor;
        const borderLeftColor = computedStyle.borderLeftColor;

        const [rBg, gBg, bBg] = parseRGB(bgColor);
        const [rText, gText, bText] = parseRGB(textColor);
        const [rBorderTop, gBorderTop, bBorderTop] = parseRGB(borderTopColor);
        const [rBorderRight, gBorderRight, bBorderRight] = parseRGB(borderRightColor);
        const [rBorderBottom, gBorderBottom, bBorderBottom] = parseRGB(borderBottomColor);
        const [rBorderLeft, gBorderLeft, bBorderLeft] = parseRGB(borderLeftColor);

        // Check if the element's background or text color is a yellow shade
        if (isYellowShade(rBg, gBg, bBg)) {
            storeOriginalStyle(element, 'backgroundColor', bgColor);
            element.style.backgroundColor = 'blue'; // Reset background color
        }
        if (isYellowShade(rText, gText, bText)) {
            storeOriginalStyle(element, 'color', textColor);
            element.style.color = 'red'; // Reset text color
        }
        // Check if the element's border color is a yellow shade
        if (isYellowShade(rBorderTop, gBorderTop, bBorderTop)) {
            storeOriginalStyle(element, 'borderTopColor', borderTopColor);
            element.style.borderTopColor = 'blue'; // Reset top border color
        }
        if (isYellowShade(rBorderRight, gBorderRight, bBorderRight)) {
            storeOriginalStyle(element, 'borderRightColor', borderRightColor);
            element.style.borderRightColor = 'blue'; // Reset right border color
        }
        if (isYellowShade(rBorderBottom, gBorderBottom, bBorderBottom)) {
            storeOriginalStyle(element, 'borderBottomColor', borderBottomColor);
            element.style.borderBottomColor = 'blue'; // Reset bottom border color
        }
        if (isYellowShade(rBorderLeft, gBorderLeft, bBorderLeft)) {
            storeOriginalStyle(element, 'borderLeftColor', borderLeftColor);
            element.style.borderLeftColor = 'blue'; // Reset left border color
        }
    });

    // Handle images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        storeOriginalStyle(img, 'filter', img.style.filter);
        // Apply a filter to make images with yellow hues appear blue
        img.style.filter = 'hue-rotate(180deg)';
    });
}

// Function to increase the font size of all text on the page
function increaseFontSize() {
    const elements = document.querySelectorAll('*'); // Select all elements

    elements.forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        const fontSize = computedStyle.fontSize;

        storeOriginalStyle(element, 'fontSize', fontSize);

        const newSize = parseFloat(fontSize) * 1.5 + 'px'; // Increase font size by 50%
        element.style.fontSize = newSize;
    });
}

// Function to restore original styles
function restoreOriginalStyles() {
    originalStyles.forEach((styles, element) => {
        for (const property in styles) {
            element.style[property] = styles[property];
        }
    });
    originalStyles.clear();
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
