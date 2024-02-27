document.addEventListener('DOMContentLoaded', function () {
    // Function to add a new checkbox
    function addCheckbox(labelText, isChecked) {
        var checkboxLabel = document.createElement('label');
        checkboxLabel.textContent = labelText;
        checkboxLabel.className = 'checkboxLabel';

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = isChecked || false; // Set checked state based on input

        checkboxLabel.appendChild(checkbox);

        document.getElementById('checkboxContainer').appendChild(checkboxLabel);
    }

    // Event listener for the add checkbox button
    document.getElementById('addCheckboxBtn').addEventListener('click', function () {
        var labelText = document.getElementById('labelInput').value.trim();
        if (labelText === "") {
            alert("Please enter label text.");
            return;
        }
        addCheckbox(labelText);
        saveCheckboxStates(); // Save checkbox states after adding new checkbox
        document.getElementById('labelInput').value = ''; // Clear input field after adding checkbox
    });

    // Function to delete checked checkboxes
    function deleteCheckedCheckboxes() {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

        checkboxes.forEach(function (checkbox) {
            checkbox.parentNode.remove();
        });
        saveCheckboxStates(); // Save checkbox states after deleting checked checkboxes
    }

    // Event listener for the delete checked checkboxes button
    document.getElementById('deleteCheckedBtn').addEventListener('click', function () {
        deleteCheckedCheckboxes();
    });

    // Function to save checkbox states
    function saveCheckboxStates() {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        var checkboxStates = {};

        checkboxes.forEach(function (checkbox) {
            checkboxStates[checkbox.parentNode.textContent.trim()] = checkbox.checked;
        });

        localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates)); // Save checkbox states in localStorage
    }

    // Function to load checkbox states
    function loadCheckboxStates() {
        var checkboxStates = JSON.parse(localStorage.getItem('checkboxStates')) || {};

        for (var labelText in checkboxStates) {
            addCheckbox(labelText, checkboxStates[labelText]);
        }
    }

    // Load checkbox states when the page loads
    loadCheckboxStates();
});
