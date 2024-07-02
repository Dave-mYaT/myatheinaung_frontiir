document.addEventListener("DOMContentLoaded", function() {
    let get_data;
    fetch('./index.php')
        .then(response => {
            if (!response.ok) {
                throw new Error("response not okay");
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            console.log('Data received from server:', data);
            get_data = data;
            // Example: Update HTML content with fetched data
            const tableBody = document.querySelector('#tablefield tbody');

            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.Name}</td>
                    <td>${item.NRIC}</td>
                    <td>${item.Phone}</td>
                    <td>${item.Product}</td>
                    <td>${item.Price}</td>
                    <td><a href="http://localhost/serverside/Assignment_1_Frontiir/create.html?id=${item.ID}">${item.ID}</a></td>
                    <td><button id="BtnDelete" onclick="buttonClicked(${item.ID})">Delete</button></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Fetch error:', error.error_response);
        });
    // const tableBody = document.querySelector('#tablefield tbody');
    // tableBody.innerHTML = "";
    // const search_button = document.getElementById("searchButton");
    // search_button.addEventListener("click", function() {
    //     var searchQuery = document.getElementById("searchInput").value;
    //     const filtered_result = get_data.filter(search=> search.Name == searchQuery);
    //     if (filtered_result>0){
    //         filteredData.forEach(item => {
    //             const row = document.createElement('tr');
    //             row.innerHTML = `
    //                 <td>${item.Name}</td>
    //                 <td>${item.NRIC}</td>
    //                 <td>${item.Phone}</td>
    //                 <td>${item.Product}</td>
    //                 <td>${item.Price}</td>
    //                 <td><a href="http://localhost/serverside/Assignment_1_Frontiir/create.html?id=${item.ID}">${item.ID}</a></td>
    //             `;
    //             tableBody.appendChild(row);
    //         });
    //     } else {
    //         // If no matching items, display a message
    //         alert("No name found.");
    //     }
    // });
});
function buttonClicked(id){
    console.log("Delete ID", id);
    var request = $.ajax({
        url: './delete.php',
        type: 'POST',
        data: JSON.stringify(id),
        dataType: 'json'
    });
    request.done(function (res) {
    console.log("response :", res);
    
    });
    request.fail(function (jqXHR, error) {
    console.log("Request Failed: " + error);
    });
    window.location.reload(true);
};
$(document).ready(function() {
    $('#BtnDeleteAll').click(function(id) {
        if (confirm('Are you sure you want to delete all data?')) {
            $.ajax({
                url: 'delete_all.php',
                type: 'POST',
                data: JSON.stringify(id),
                dataType: 'json',
                success: function(response) {
                    alert('All data has been deleted.');
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                    alert('An error occurred while deleting data.');
                }
            });
            window.location.reload(true);
        }
    });
});
// function searchTable(){
//  const table_body = document.querySelector('#tablefield tbody');
//  table_body.innerHTML=``;
//  const search_name = document.getElementById("searchInput").value.toLowerCase();
//  const data_entry = JSON.parse(localStorage.getItem('formEntries')) || [];
//     data_entry.forEach( c_info => {
//         if(c_info.name.toLowerCase() === search_name )
//         {
//                 const row = document.createElement('tr');
//                 row.innerHTML=`
//                                 <td id="name">${c_info.name}</td>
//                                 <td id="nric">${c_info.nric}</td>
//                                 <td id="phone">${c_info.phone}</td>
//                                 <td id="options">${c_info.selectedOption}</td>
//                                 <td id="price">${c_info.price}</td>
//                                 <td id="id"><a href="file:///Users/davidjhones/HTML%20stuff/Assignment_1_Frontiir/create.html?id=${c_info.id}">${c_info.id}</a> 
//                                 </td>
//                                 `;
//                 table_body.appendChild(row);

//         }
//     })
//     }
    // console.log("Payload :", formData);
    // var request = $.ajax({
    //                     url: './index.php',
    //                     type: 'POST',
    //                     data: JSON.stringify(formData),
    //                     dataType: 'json'
    //                 });
    // request.done(function (res) {
    //     console.log("response :", res);
    // });
    // request.fail(function (jqXHR, error) {
    //     console.log("Request Failed: " + error);
    // });

    //this is the reformatted display file