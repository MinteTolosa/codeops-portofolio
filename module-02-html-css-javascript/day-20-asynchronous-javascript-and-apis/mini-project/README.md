### 🌍 Mini Country Finder

A simple web app I built to practice handling **Asynchronous JavaScript** and working with **REST APIs**. 

### 🚀 Features & Learning Goals

* **Async/Await & Fetch:** Mastered fetching live data from an external server asynchronously.
* **Error Handling:** Implemented try...catch blocks to gracefully handle network or data errors.
* **DOM Manipulation:** Dynamically rendered JSON API data straight into the UI.

### 📂 Project Structure

text

mini-project/
├── JS/
│   └── script.js       # Fetch logic & DOM manipulation
├── styles/
│   └── style.css       # Layout & UI styling
└── index.html          # Main HTML structure

Use code with caution.

### 🛠️ Built With

* HTML5 & CSS3
* Vanilla JavaScript (ES6+)
* **API Used:** [countries.dev](https://countries.dev) (Free, keyless geographic data API)

### 💻 Core JS Logic

javascript

async function getCountryData(code) {
  try {
    const res = await fetch(`https://countries.dev/alpha/${code}`);
    if (!res.ok) throw new Error('Country not found');
    
    const data = await res.json();
    displayCountry(data); 
  } catch (err) {
    console.error(err.message);
  }
}

Use code with caution.

### ⚙️ How to Run

1. Download the mini-project folder.
2. Open index.html in your browser (or use VS Code **Live Server**).
