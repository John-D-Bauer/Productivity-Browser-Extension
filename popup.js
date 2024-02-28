document.addEventListener('DOMContentLoaded', function () {

    // Function to update popup UI with checkbox count
    function updatePopupUI() {
        // Update popup HTML to display checkbox count
        document.getElementById('checkboxCount').textContent = countCheckboxes();
    }

    // Function to count checkboxes in the popup
    function countCheckboxes() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]'); // Gets all checkboxes in the popup
        return checkboxes.length;
    }

    // Function to add a new checkbox
    function addCheckbox(labelText, isChecked) {

        // Creates a checkbox label, assigns the text onto it, and names the class
        var checkboxLabel = document.createElement('label');
        checkboxLabel.textContent = labelText;
        checkboxLabel.className = 'checkboxLabel';

        // Creates a checkbox
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = isChecked || false; // Set checked state based on input

        checkboxLabel.prepend(checkbox); // Adss checkboxs to front of checkboxLabel

        document.getElementById('checkboxContainer').appendChild(checkboxLabel); // Puts checkbox and label in appropiate spot in popup
        updatePopupUI(); // Updates checkbox count on the popup

    }

    // Event listener for the add checkbox button
    document.getElementById('addCheckboxBtn').addEventListener('click', function () {

        // Gets checkbox label from input box
        var labelText = document.getElementById('labelInput').value.trim();
        if (labelText === "") {
            alert("Please enter label text.");
            return;
        }
        addCheckbox(labelText);
        saveCheckboxStates(); // Save checkbox states after adding new checkbox

        // Send a message to the content script
        browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            browser.tabs.sendMessage(tabs[0].id, { num: countCheckboxes() });
        });


        // Send message saying how many checkboxes are left
        document.body.style.color = "blue";


        document.getElementById('labelInput').value = ''; // Clear input field after adding checkbox
    });

    // Function to delete checked checkboxes
    function deleteCheckedCheckboxes() {

        // Gets all checked checkboxes
        var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

        // Delets each checked checkbox
        checkboxes.forEach(function (checkbox) {
            checkbox.parentNode.remove();
        });

        updatePopupUI();
    }

    // Event listener for the delete checked checkboxes button
    document.getElementById('deleteCheckedBtn').addEventListener('click', function () {
        deleteCheckedCheckboxes();
        saveCheckboxStates(); // Save checkbox states after deleting checked checkboxes

        // Send a message to the content script
        browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            browser.tabs.sendMessage(tabs[0].id, { num: countCheckboxes() });
        });


        // Send message saying how many checkboxes are left
        document.body.style.color = "red";


    });

    // Function to save checkbox states
    // TODO: CHANGE VARIABLE NAMES AND PROGRAM DESIGN TO BETTER REFLECT WHAT IS GOING ON.
    function saveCheckboxStates() {

        // Gets all checkboxes
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        var checkboxStates = {};

        // For each checkbox, put it into the checkboxStates object
        checkboxes.forEach(function (checkbox) {
            checkboxStates[checkbox.parentNode.textContent.trim()] = checkbox.checked;
        });

        localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates)); // Save checkbox states in localStorage

        //localStorage.setItem('checkboxNum', countCheckboxes().toString());

    }

    // Function to load checkbox states
    function loadCheckboxStates() {
        // Get each checkbox state from localStorage
        var checkboxStates = JSON.parse(localStorage.getItem('checkboxStates')) || {};

        // Add each previous checkbox again
        for (var labelText in checkboxStates) {
            addCheckbox(labelText, checkboxStates[labelText]);
        }
    }

    updatePopupUI();

    // Load checkbox states when the page loads
    loadCheckboxStates();

});