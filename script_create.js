document.addEventListener("DOMContentLoaded", function() { //what is addEventLister and why do i use DomContentLoaded
    const dropdown = document.getElementById('dropdown'); //why do i getElementById and what is  const dropdown = document. and why do i use it
    const priceInput = document.getElementById('Price'); //same here ^
    const form = document.getElementById('PurchaseForm'); //same here again ^
    let editingId = null; // To keep track of the entry being edited

    const urlParams = new URLSearchParams(window.location.search); // what is urlParams
    editingId = urlParams.get('id'); //i think it change or connect the id with editingId
    console.log("Response For ID :", editingId);
    dropdown.addEventListener('change', function() {
        const selectedOption = dropdown.options[dropdown.selectedIndex].value; //
        const price = getPrice(selectedOption);
        priceInput.value = formatPrice(price);
    });

    form.addEventListener('submit', function(event) {
    
    event.preventDefault(); // Prevent form submission
        // Gather form data
        const name = document.getElementById('Name').value;
        const nric = document.getElementById('NRIC').value;
        const phone = document.getElementById('PhNum').value;
        const selectedOption = dropdown.options[dropdown.selectedIndex].value;
        const price = getPrice(selectedOption);
        const formattedPrice = formatPrice(price);
        const id = generateUniqueId();

        // Create a new form entry object
        var formData = {
            name: name,
            nric: nric,
            phone: phone,
            selectedOption: selectedOption,
            price: formattedPrice
        };
        if(editingId === null)
        {
            formData.id = id
            // get connection to send data to database
            console.log("Payload :", formData);
            var request = $.ajax({
                                url: './create.php',
                                type: 'POST',
                                data: JSON.stringify(formData),
                                dataType: 'json'
                            });
            request.done(function (res) {
                console.log("response :", res);
            });
            request.fail(function (jqXHR, error) {
                console.log("Request Failed: " + error);
            });
            window.location.href= "http://localhost/serverside/Assignment_1_Frontiir/index.html";
        } else{
            formData.id = editingId;
            // get connection to send data to database
            console.log("Payload :", formData);
            var request = $.ajax({
                                url: './update.php',
                                type: 'POST',
                                data: JSON.stringify(formData),
                                dataType: 'json'
                            });
            request.done(function (res) {
                console.log("response :", res);
                window.location.href = 'index.html';
            });
            request.fail(function (jqXHR, error) {
                console.log("Request Failed: " + error);
            });
            window.location.href= "http://localhost/serverside/Assignment_1_Frontiir/index.html";
        }
    });
    if(editingId != null)
    {
    //for fetching data to display it in the form to edit
    fetch('./fetch.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: editingId })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON response
    })
    .then(data => {
        console.log('Data received from server:', data);

        // Update form fields with fetched data
        document.getElementById('Name').value = data.Name;
        document.getElementById('NRIC').value = data.NRIC;
        document.getElementById('PhNum').value = data.Phone;
        document.getElementById('dropdown').value = data.Product;
        document.getElementById('Price').value = data.Price;
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });

}
});

function generateUniqueId() {
    return Date.now().toString();
}

function formatPrice(price) {
    return price.toFixed(2);
}

function getPrice(option) {
    switch (option) {
        case 'Apple':
            return 100;
        case 'Banana':
            return 200; 
        case 'Mango':
            return 300;
        default:
            return 0;
    }
}
        // Retrieve existing entries array from local storage (if any)
        // const existingEntries = JSON.parse(localStorage.getItem('formEntries')) || [];

        // if (editingId) {
        //     // Update the existing entry
        //     for (let i = 0; i < existingEntries.length; i++) {
        //         if (existingEntries[i].id === editingId) {
        //             existingEntries[i] = { ...formData, id: editingId };
        //             break;
        //         }
        //     }
        //     editingId = null; // Reset the editing ID
        // } else {
        //     // Check if the new entry already exists by name, NRIC, or phone
        //     const duplicateEntry = existingEntries.find(entry => (
        //         entry.name === formData.name ||
        //         entry.nric === formData.nric ||
        //         entry.phone === formData.phone
        //     ));

        //     if (duplicateEntry) {
        //         alert('This data already exists.');
        //         return;
        //     } else {
        //         // Generate a unique ID for this entry
        //         const entryId = generateUniqueId();
        //         formData.id = entryId;

        //         // Add the new form entry to the existing entries array
        //         existingEntries.push(formData);
        //     }
        // }

        // Store the updated entries array back into local storage
        // localStorage.setItem('formEntries', JSON.stringify(existingEntries));

        // alert('Form entry saved.');
        // window.location.href = "index.html"; // Redirect to index.html after saving
    // });
//     function populateForm(id) {
//         const existingEntries = JSON.parse(localStorage.getItem('formEntries')) || [];

//         let entry;
//         for (let i = 0; i < existingEntries.length; i++) {
//             if (existingEntries[i].id === id) {
//                 entry = existingEntries[i];
//                 break;
//             }
//         }

//         if (entry) {
//             // Check which fields are present in the entry and update the corresponding form fields
//             if ('name' in entry) document.getElementById('Name').value = entry.name;
//             if ('nric' in entry) document.getElementById('NRIC').value = entry.nric;
//             if ('phone' in entry) document.getElementById('PhNum').value = entry.phone;
//             if ('selectedOption' in entry) document.getElementById('dropdown').value = entry.selectedOption;
//             if ('price' in entry) document.getElementById('Price').value = entry.price;

//             editingId = entry.id;
//         } else {
//             console.error('Entry not found for ID:', id); // Log an error message if entry is not found
//         }
//     }

//     if (editingId) {
//         populateForm(editingId);
//     }
// });
