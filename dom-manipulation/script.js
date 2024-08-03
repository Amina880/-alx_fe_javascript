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


displayButton.addEventListener('click', (displayRandomQuote));
addQuote.addEventListener('click', createAddQuoteForm);
exportQuotesButton.addEventListener('click', exportQuotesAsJSON);
importbutton.addEventListener('click', importFromJsonFile);



function loadLastViewedQuote() {
    const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastViewedQuote) {
        quoteDisplay.textContent = lastViewedQuote;
    }
}


let quoteArray = JSON.parse(localStorage.getItem('quotes')) || [];


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