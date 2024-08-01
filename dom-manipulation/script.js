//Write a JavaScript file (script.js) that handles the creation and manipulation of DOM elements based on user interactions.
//Manage an array of quote objects where each quote has a text and a category.
//Implement functions to display a random quote and to add new quotes called showRandomQuote and createAddQuoteForm` respectively

const quoteDisplay = document.getElementById('quoteDisplay')
const displayButton = document.getElementById('newQuote')
const newquoteInput = document.getElementById('newQuoteText')
const newcategoryInput = document.getElementById('newQuoteCategory')


let quoteArray = [];

const quoteObject = {
    quoteText: quoteObj,
    category: categoryObj
} 

function displayRandomQuote(){

if(quoteArray.length === 0){
    quoteDisplay.innerHTML = '<P>No quotes available. Please add some!</P>'
    return;
}
const randomIndex = Math.floor(Math.random()* quoteArray.length);
const selectedQuote = quoteArray[randomIndex];
quoteDisplay.textContent =  `"${selectedQuote.text}" - Category: ${selectedQuote.category}`
}


function createAddQuoteForm(event){
    event.preventdefault();
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
    newquoteInput.value = '';
    newcategoryInput.value = '';
    alert("Quote added successfully!")
}