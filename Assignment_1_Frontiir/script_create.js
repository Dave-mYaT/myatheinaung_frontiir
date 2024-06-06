document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.getElementById('dropdown');
    const priceInput = document.getElementById('Price');
    const form = document.getElementById('PurchaseForm');
    let editingId = null; // To keep track of the entry being edited

    const urlParams = new URLSearchParams(window.location.search);
    editingId = urlParams.get('id');

    dropdown.addEventListener('change', function() {
        const selectedOption = dropdown.options[dropdown.selectedIndex].id;
        const price = getPrice(selectedOption);
        priceInput.value = formatPrice(price);
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Gather form data
        const name = document.getElementById('Name').value;
        const nric = document.getElementById('NRIC').value;
        const phone = document.getElementById('PhNum').value;
        const selectedOption = dropdown.options[dropdown.selectedIndex].id;
        const price = getPrice(selectedOption);
        const formattedPrice = formatPrice(price);

        // Create a new form entry object
        const formData = {
            name: name,
            nric: nric,
            phone: phone,
            selectedOption: selectedOption,
            price: formattedPrice
        };

        // Retrieve existing entries array from local storage (if any)
        const existingEntries = JSON.parse(localStorage.getItem('formEntries')) || [];

        if (editingId) {
            // Update the existing entry
            for (let i = 0; i < existingEntries.length; i++) {
                if (existingEntries[i].id === editingId) {
                    existingEntries[i] = { ...formData, id: editingId };
                    break;
                }
            }
            editingId = null; // Reset the editing ID
        } else {
            // Check if the new entry already exists by name, NRIC, or phone
            const duplicateEntry = existingEntries.find(entry => (
                entry.name === formData.name ||
                entry.nric === formData.nric ||
                entry.phone === formData.phone
            ));

            if (duplicateEntry) {
                alert('This data already exists.');
                return;
            } else {
                // Generate a unique ID for this entry
                const entryId = generateUniqueId();
                formData.id = entryId;

                // Add the new form entry to the existing entries array
                existingEntries.push(formData);
            }
        }

        // Store the updated entries array back into local storage
        localStorage.setItem('formEntries', JSON.stringify(existingEntries));

        alert('Form entry saved.');
        window.location.href = "index.html"; // Redirect to index.html after saving
    });

    function generateUniqueId() {
        return Date.now().toString();
    }

    function formatPrice(price) {
        return '$' + price.toFixed(2);
    }

    function getPrice(option) {
        switch (option) {
            case 'p1':
                return 100;
            case 'p2':
                return 200;
            case 'p3':
                return 300;
            default:
                return 0;
        }
    }

    function populateForm(id) {
        const existingEntries = JSON.parse(localStorage.getItem('formEntries')) || [];

        let entry;
        for (let i = 0; i < existingEntries.length; i++) {
            if (existingEntries[i].id === id) {
                entry = existingEntries[i];
                break;
            }
        }

        if (entry) {
            // Check which fields are present in the entry and update the corresponding form fields
            if ('name' in entry) document.getElementById('Name').value = entry.name;
            if ('nric' in entry) document.getElementById('NRIC').value = entry.nric;
            if ('phone' in entry) document.getElementById('PhNum').value = entry.phone;
            if ('selectedOption' in entry) document.getElementById('dropdown').value = entry.selectedOption;
            if ('price' in entry) document.getElementById('Price').value = entry.price;

            editingId = entry.id;
        } else {
            console.error('Entry not found for ID:', id); // Log an error message if entry is not found
        }
    }

    if (editingId) {
        populateForm(editingId);
    }
});
