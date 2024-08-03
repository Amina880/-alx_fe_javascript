//Write a JavaScript file (script.js) that handles the creation and manipulation of DOM elements based on user interactions.
//Manage an array of quote objects where each quote has a text and a category.
//Implement functions to display a random quote and to add new quotes called showRandomQuote and createAddQuoteForm` respectively

const quoteDisplay = document.getElementById('quoteDisplay')
const addQuote = document.getElementById('Addbutton')
const displayButton = document.getElementById('newQuote')
const newquoteInput = document.getElementById('newQuoteText')
const newcategoryInput = document.getElementById('newQuoteCategory')
const storedQuotesList = document.getElementById('storedQuotesList')
const exportQuotesButton = document.getElementById('export-quotes-btn')
const importbutton = document.getElementById('importFile')
const categoryFilter = document.getElementById('categoryFilter')

const api_URL = 'https://jsonplaceholder.typicode.com/posts'

let quoteArray = JSON.parse(localStorage.getItem('quotes')) || [];


fetchQuotesFromServer();
startPeriodicSync()

function loadLastViewedQuote() {
    const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastViewedQuote) {
        quoteDisplay.textContent = lastViewedQuote;
    }
}
restoreLastSelectedCategory();

displayButton.addEventListener('click', (displayRandomQuote));
addQuote.addEventListener('click', createAddQuoteForm);
exportQuotesButton.addEventListener('click', exportQuotesAsJSON);
importbutton.addEventListener('click', importFromJsonFile);

function startPeriodicSync() {
    setInterval(syncWithServer, 30000); // Sync every 30 seconds
}


function fetchQuotesFromServer(){
    fetch(api_URL)
    .then(response => response.json())
    .then(data => {
        // For demo purposes, let's assume each post has a 'title' as the quote and 'body' as the author
        quoteArray = data.slice(0, 10).map(post => ({
            text: post.title,
            category: post.body,
            uniquekey: post.id
        }));

        localStorage.setItem('quotes', JSON.stringify(quoteArray));
        storedQuotesList.innerHTML = '';
        quoteArray.forEach(quotee => {
            const listitem = document.createElement('li')
            listitem.textcontent = `"${quotee.quoteText}" - Category: ${quotee.category}`
            storedQuotesList.appendChild(listitem);
        });
        populateCategories();
    })
    .catch(error => console.error('Error fetching quotes:', error));
}
const resp = await fetch('https://jsonplaceholder.typicode.com/todos/1');

if (!resp.ok){
    throw new Error ('Network response was not ok');
}
console.log(resp);
const data7 = await resp.json();
// Function to sync data with the server
async function syncQuotes() {
    const resp = await fetch(api_URL{
        method: 'POST',
        headers: {
            'Authorization': 'Bearer <7878>',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'New Data',
            description: 'Important information'
        })
    })
    const Data = await response.json()
        .then(serverQuotes => {
            const serverQuotesMapped = serverQuotes.slice(0, 10).map(post => ({
                text: post.title,
                category: post.body,
                uniquekey: post.id
            }));

            if (JSON.stringify(quoteArray) !== JSON.stringify(serverQuotesMapped)) {
                quoteArray = serverQuotesMapped;
                localStorage.setItem('quotes', JSON.stringify(quoteArray));

                storedQuotesList.innerHTML = '';
                quoteArray.forEach(quotee => {
                const listitem = document.createElement('li')
                listitem.textcontent = `"${quotee.quoteText}" - Category: ${quotee.category}`
                storedQuotesList.appendChild(listitem);
                });

                populateCategories();
                notifyUser('Data updated from server.');
            }
            // Update sync status
            updateSyncStatus('Synced with server at ' + new Date().toLocaleTimeString());
        })
        .catch(error => {
            console.error('Error syncing with server:', error);
            updateSyncStatus('Failed to sync with server');
        });
}
function updateSyncStatus(message) {
    syncStatus.textContent = message;
}
function notifyUser(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000); // Remove after 5 seconds
}


function displayRandomQuote(){

if(quoteArray.length === 0){
    quoteDisplay.innerHTML = '<P>No quotes available. Please add some!</P>'
    return;
}
const randomIndex = Math.floor(Math.random()* quoteArray.length);
const selectedQuote = quoteArray[randomIndex];

const quoteDisplayText =  `"${selectedQuote.text}" - Category: ${selectedQuote.category}`
quoteDisplay.textContent = quoteDisplayText;

sessionStorage.setItem('lastViewedQuote', quoteDisplayText);
}


function createAddQuoteForm() {
    const newquoteText = newquoteInput.value.trim();
    const newcategory = newcategoryInput.value.trim();
    
    if(newquoteText === '' || newcategory === ''){
    alert('Both fields are required');
    return;
    }
    const newQuote = {
        quoteText: newquoteText,
        category: newcategory
    }
    quoteArray.push(newQuote);

    localStorage.setItem('qus', JSON.stringify(quoteArray));
    
    const listitem = document.createElement('li')
    listitem.textcontent = `"${newQuote.quoteText}" - Category: ${newQuote.category}`
    storedQuotesList.appendChild(listitem);

    newquoteInput.value = '';
    newcategoryInput.value = '';
    alert("Quote added successfully!")

    populateCategories();
}
// Function to export quotes as JSON
function exportQuotesAsJSON() {
    if (quoteArray.length === 0) {
        alert("No quotes to export.");
        return;
    }

    const json = JSON.stringify(quoteArray, null, 2); // Pretty print JSON
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }

function populateCategories() {
    const categories = Array.from(new Set(quoteArray.map(quote => quote.category)));
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}
function filterQuote() {
    const selectedCategory = categoryFilter.value;
    localStorage.setItem('selectedCategory', selectedCategory);

    storedQuotesList.innerHTML = '';

    const filteredQuotes = selectedCategory === 'all' 
        ? quoteArray 
        : quoteArray.filter(quote => quote.category === selectedCategory);

    filteredQuotes.forEach(filteredquote => {
        const listitem = document.createElement('li')
        listitem.textcontent = `"${filteredquote.quoteText}" - Category: ${filteredquote.category}`
        storedQuotesList.appendChild(listitem);

    });
}
function restoreLastSelectedCategory() {
    const selectedCategory = localStorage.getItem('selectedCategory');
    if (selectedCategory) {
        categoryFilter.value = selectedCategory;
        filterQuote();
    }
}