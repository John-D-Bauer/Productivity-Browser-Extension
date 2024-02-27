var checkboxCount = 0;


document.addEventListener("DOMContentLoaded", function() {
    // Load checkboxes from localStorage if available
    loadCheckboxes();

    // Add event listener to the "Add Checkbox" button
    document.getElementById('addCheckboxBtn').addEventListener('click', function() {
        // Get the label entered by the user
        var label = document.getElementById('labelInput').value.trim();

        // Check if the label is not empty
        if (label !== '') {
            // Create a new checkbox
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'checkbox-' + Date.now(); // Unique ID for each checkbox

            // Create a label for the checkbox
            var checkboxLabel = document.createElement('label');
            checkboxLabel.setAttribute('for', checkbox.id);
            checkboxLabel.textContent = label;

            // Append the checkbox and label to the checkboxDiv
            var checkboxDiv = document.getElementById('checkboxDiv');
            checkboxDiv.appendChild(checkbox);
            checkboxDiv.appendChild(checkboxLabel);

            // Add event listener to the checkbox for removing the parent node when checked
            checkbox.addEventListener('change', function() {
                // Check if the checkbox is checked
                if (checkbox.checked) {
                    // Remove the parent node (which contains both the checkbox and its label)
                    checkboxDiv.removeChild(checkbox.nextSibling); // Remove label
                    checkboxDiv.removeChild(checkbox); // Remove checkbox
                    // Save updated checkboxes to localStorage
                    saveCheckboxes();
                    // Update the number of checkboxes displayed
                    updateCheckboxCount();
                }
            });

            // Save the new checkbox to localStorage
            saveCheckboxes();

            // Update the number of checkboxes displayed
            updateCheckboxCount();

            // Clear the input field
            document.getElementById('labelInput').value = '';
        } else {
            // If the label is empty, alert the user
            alert('Please enter a label for the checkbox.');
        }
    });

    // Function to load checkboxes from localStorage
    function loadCheckboxes() {
        var checkboxes = JSON.parse(localStorage.getItem('checkboxes'));
        if (checkboxes) {
            checkboxes.forEach(function(checkboxData) {
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = checkboxData.id;

                var checkboxLabel = document.createElement('label');
                checkboxLabel.setAttribute('for', checkboxData.id);
                checkboxLabel.textContent = checkboxData.label;

                var checkboxDiv = document.getElementById('checkboxDiv');
                checkboxDiv.appendChild(checkbox);
                checkboxDiv.appendChild(checkboxLabel);

                checkbox.checked = checkboxData.checked;

                checkbox.addEventListener('change', function() {
                    if (checkbox.checked) {
                        checkboxDiv.removeChild(checkbox.nextSibling); // Remove label
                        checkboxDiv.removeChild(checkbox); // Remove checkbox
                        saveCheckboxes();
                        updateCheckboxCount();
                    }
                });
            });
            updateCheckboxCount();
        }
    }

    // Function to save checkboxes to localStorage
    function saveCheckboxes() {
        var checkboxes = [];
        var checkboxDiv = document.getElementById('checkboxDiv');
        var checkboxInputs = checkboxDiv.querySelectorAll('input[type="checkbox"]');
        checkboxInputs.forEach(function(checkbox) {
            checkboxes.push({
                id: checkbox.id,
                label: checkbox.nextSibling.textContent,
                checked: checkbox.checked
            });
        });
        localStorage.setItem('checkboxes', JSON.stringify(checkboxes));
    }

    function updateCheckboxCount() {
        checkboxCount = document.querySelectorAll('#checkboxDiv input[type="checkbox"]').length;
        document.getElementById('checkboxCount').textContent = checkboxCount;
    }

updateCheckboxCount();

});