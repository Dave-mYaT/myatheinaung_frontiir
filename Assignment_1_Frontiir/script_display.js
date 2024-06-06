document.addEventListener("DOMContentLoaded", function() {
    const outputArea = document.getElementById('outputArea');
    let editingId = null; // To keep track of the entry being edited

    function displayTable() {
        const existingEntries = JSON.parse(localStorage.getItem('formEntries')) || [];
        const searchInput = document.getElementById('searchInput').value.toLowerCase();

        // Clear the previous output
        outputArea.innerHTML = '';

        if (existingEntries.length > 0) {
            const filteredEntries = existingEntries.filter(entry => {
                return entry.name.toLowerCase().includes(searchInput);
            });

            if (filteredEntries.length > 0) {
                const table = document.createElement('table');
                table.style.width = '100%';
                table.style.borderCollapse = 'collapse';

                const headerRow = document.createElement('tr');
                const headers = ['Name', 'NRIC', 'Phone', 'Product', 'Price', 'ID'];
                headers.forEach(headerText => {
                    const header = document.createElement('th');
                    header.style.border = '1px solid black';
                    header.style.padding = '8px';
                    header.style.textAlign = 'left';
                    header.appendChild(document.createTextNode(headerText));
                    headerRow.appendChild(header);
                });

                table.appendChild(headerRow);

                filteredEntries.forEach(entry => {
                    const row = document.createElement('tr');

                    Object.keys(entry).forEach(key => {
                        const cell = document.createElement('td');
                        cell.style.border = '1px solid black';
                        cell.style.padding = '8px';
                        cell.appendChild(document.createTextNode(entry[key]));
                        if (key === 'id') {
                            cell.style.cursor = 'pointer';
                            cell.addEventListener('click', function() {
                                populateForm(entry.id);
                            });
                        }
                        row.appendChild(cell);
                    });

                    table.appendChild(row);
                });

                outputArea.appendChild(table);
            } else {
                outputArea.textContent = 'No matching entries found.';
            }
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

    // Display the table when the page loads
    displayTable();
});
