const text = document.getElementById("text");
const author = document.getElementById("author");
const twitterBtn = document.getElementById("tweet-quote");
const newQuote = document.getElementById("new-quote");
let quotesList = [];


// Get Quote from API
async function getQuotes() {
  let url = "https://type.fit/api/quotes";
  try {
    let response = await fetch(url);
    quotesList = await response.json();
  } catch (error) {
    console.log(error);
  }
}
getQuotes();

// Share on Twitter
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${text.textContent} - ${author.textContent}`;
  window.open(twitterUrl, "_blank");
}

twitterBtn.addEventListener("click", tweetQuote);

// New quote
function getNewQuote() {
  // Pick a random quote from apiQuotes array
  let randomNum = Math.floor(Math.random() * quotesList.length);
  let quote = quotesList[randomNum];
  if (quote.text.length > 120) {
    text.classList.add("long-quote");
  } else {
    text.classList.remove("long-quote");
  }
  text.textContent = quote.text;
  if (!quote.author) {
    author.textContent = "Unknown";
  } else {
    author.textContent = quote.author;
  }
}

newQuote.addEventListener("click", getNewQuote);
