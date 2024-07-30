document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('searchBox');
    const searchButton = document.getElementById('searchButton');

    // Set initial button text
    searchButton.textContent = 'Dice!';

    // Update button text based on search box input
    searchBox.addEventListener('input', () => {
        if (searchBox.value.trim() === '') {
            searchButton.textContent = 'Dice!';
        } else {
            searchButton.textContent = 'Find!';
        }
    });

    // Add event listener for the button
    searchButton.addEventListener('click', async () => {
        if (searchBox.value.trim() === '') {
            await showRandomWord();
        } else {
            await searchWord();
        }
    });
});

async function searchWord() {
    const searchBox = document.getElementById('searchBox');
    const query = searchBox.value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = ''; // Clear previous result

    if (query === '') {
        resultDiv.innerHTML = '<h3 class="error">Önce bir söz girmeyi denesen?</h3>';
        return;
    }
    
    try {
        const response = await fetch('semantic.json');
        const words = await response.json();
        
        if (words[query]) {
            const wordDetails = words[query];
            resultDiv.innerHTML = `
                <div class="word">
                    <h3>${query}</h3>
                </div>
                <div class="details">
                    <p>${wordDetails.type}</p>
                </div>
                <p class="description"><b class='green'>I.</b> ${wordDetails.description}</p>
            `;
        } else {
            resultDiv.innerHTML = '<h3 class="error">No results found.</h3>';
        }
    } catch (error) {
        console.error('Error fetching the words:', error);
        resultDiv.innerHTML = '<h3 class="error">No results found.</h3>';
    }
}

async function showRandomWord() {
    const resultDiv = document.getElementById('result');
    
    try {
        const response = await fetch('semantic.json');
        const words = await response.json();
        
        // Get all keys (words) from the JSON object
        const wordKeys = Object.keys(words);
        
        if (wordKeys.length === 0) {
            resultDiv.innerHTML = '<h3 class="error">No words available.</h3>';
            return;
        }
        
        // Pick a random key from the array
        const randomWordKey = wordKeys[Math.floor(Math.random() * wordKeys.length)];
        const wordDetails = words[randomWordKey];
        
        resultDiv.innerHTML = `
            <div class="word">
                <h3>${randomWordKey}</h3>
            </div>
            <div class="details">
                <p>${wordDetails.type}</p>
            </div>
            <p class="description"><b class='green'>I.</b> ${wordDetails.description}</p>
        `;
    } catch (error) {
        console.error('Error fetching the words:', error);
        resultDiv.innerHTML = '<h3 class="error">Error retrieving random word.</h3>';
    }
}

$(function() {
    $('#searchBox').keypress(function(e) {
        var txt = String.fromCharCode(e.which);
        console.log(txt + ' : ' + e.which);
        if(!txt.match(/[a-zA-ZçÇğĞıİöÖşŞüÜ]/) || txt.match(/[jJxXqQwW]/)) {
            return false;
        }
    });
});
