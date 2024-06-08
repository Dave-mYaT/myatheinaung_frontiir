document.addEventListener("DOMContentLoaded", function() {
    const table_body = document.querySelector('#tablefield tbody');
    const data_entry = JSON.parse(localStorage.getItem('formEntries')) || [];

    data_entry.forEach( keys => { 
        const row = document.createElement('tr');
        row.innerHTML=`
                        <td id="name">${keys.name}</td>
                        <td id="nric">${keys.nric}</td>
                        <td id="phone">${keys.phone}</td>
                        <td id="options">${keys.selectedOption}</td>
                        <td id="price">${keys.price}</td>
                        <td id="id"><a href="file:///Users/davidjhones/HTML%20stuff/Assignment_1_Frontiir/create.html?id=${keys.id}">${keys.id}</a> 
                        </td>
                        `;
        table_body.appendChild(row);
        
    });
    
});
function searchTable(){
 const table_body = document.querySelector('#tablefield tbody');
 table_body.innerHTML=``;
 const search_name = document.getElementById("searchInput").value.toLowerCase();
 const data_entry = JSON.parse(localStorage.getItem('formEntries')) || [];
    data_entry.forEach( c_info => {
        if(c_info.name.toLowerCase() === search_name )
        {
                const row = document.createElement('tr');
                row.innerHTML=`
                                <td id="name">${c_info.name}</td>
                                <td id="nric">${c_info.nric}</td>
                                <td id="phone">${c_info.phone}</td>
                                <td id="options">${c_info.selectedOption}</td>
                                <td id="price">${c_info.price}</td>
                                <td id="id"><a href="file:///Users/davidjhones/HTML%20stuff/Assignment_1_Frontiir/create.html?id=${c_info.id}">${c_info.id}</a> 
                                </td>
                                `;
                table_body.appendChild(row);

        }
    })
    }