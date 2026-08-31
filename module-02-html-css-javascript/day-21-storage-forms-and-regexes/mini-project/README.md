### 📝 Interactive Signup Form

A clean and responsive signup form built to practice **form validation**, client-side security checks, and dynamic UI error handling. 

### 🚀 Features & Learning Goals

* **Client-Side Validation:** Form checks if user inputs meet specific requirements (e.g., character length, correct formats) before processing.
* **Dynamic Error Messaging:** If a field fails validation, a precise error message appears instantly right next to the invalid input field.
* **Data Processing:** Once all inputs are clean and valid, the form safely processes the data.

### 📂 Project Structure

text

mini-project/
├── JS/
│   └── app.js       # Form validation logic & error handling
├── styles/
│   └── style.css       # Layout, form styling, and error states
└── index.html          # Main HTML form structure

Use code with caution.

### 🛠️ Built With

* HTML5 (Semantic form elements)
* CSS3 (Form styling and validation indicators)
* Vanilla JavaScript (ES6+ Form Events & Validation)

### 💻 Core Logic Overview

When the form is submitted, JavaScript intercepts the event to validate the fields: 

javascript

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Stop form submission to check inputs
  
  if (!validateInputs()) {
    // Show error messages next to fields if requirements aren't met
    displayErrors(); 
  } else {
    // Safely process data if everything is valid
    processFormData();
  }
});

Use code with caution.

### ⚙️ How to Run

1. Download the mini-project folder.
2. Open the index.html file directly in your web browser.
3. Test out the validation by filling out the form or hitting submit on empty fields!

