const api_key = 'api-vm3875y285982m35mn45b674';

const closeAddContactModal = () => {
    document.getElementById('addContactModal').classList.add('hidden');
}

const openAddContactModal = () => {
    document.getElementById('addContactModal').classList.remove('hidden');
}

const clearAddContactModal = () => {
    const inputs = document.querySelectorAll('#addContactModal input');
    let data = [];
    for (let i = 0; i < inputs.length; i++) {
        data.push(inputs[i].value);
        inputs[i].value = '';
    }
    return data;
}



let cachedContactData = [];

const grabAllContacts = (search = '') => {
    document.querySelector('#splashScreen').classList.remove('hidden');
    fetch('/api/data', {
        method: 'GET',
        headers: {
            'api-key': api_key
        }
    }).then(r => r.json()).then(data => {
        console.log(data);
        updateTableData(data, search);
    });
}

grabAllContacts();

const updateTableData = (data, search = '') => {
    const tableBody = document.querySelector('#tableData-contacts');
    tableBody.innerHTML = '';


    let sortingOption = document.querySelector('#sortingOption').value;
    let contactData = data.data.sort(function (a, b) {
        const nameA = a.Name.toUpperCase();
        const nameB = b.Name.toUpperCase();

        if (sortingOption === 'asc') {
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        }
        else {
            if (nameA < nameB) {
                return 1;
            }
            if (nameA > nameB) {
                return -1;
            }
            return 0;
        }
    });

    if (search !== '') {
        contactData = contactData.filter(contact => contact.Name.toLowerCase().includes(search.toLowerCase()))
    }

    cachedContactData = contactData;

    document.querySelector('#result-count').innerHTML = `Found: ${contactData.length} result${contactData.length>1?'s':''}`;
    contactData.forEach(contact => {

        let name = document.createElement('td');
        name.classList.add('w300');
        name.innerText = capitalizeFirstLetter(contact.Name);

        let address = document.createElement('td');
        address.classList.add('w200');
        address.innerText = contact.Address;

        let email = document.createElement('td');
        email.innerText = contact.Email;

        let contactNumber = document.createElement('td');
        contactNumber.innerText = contact.ContactNo;

        let actions = document.createElement('td');
        actions.classList.add('actionCol', 'w100');

        let editButton = document.createElement('a');
        editButton.classList.add('btn', 'btn-primary', 'btn-sm', 'mr-2');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.addEventListener('click', () => {
            editContact(contact);
        });
        editButton.title = "Edit Contact or View Details";


        let deleteButton = document.createElement('a');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener('click', () => {
            deleteContact(contact);
        });
        deleteButton.title = "Delete Contact";

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        let hiddenCol = document.createElement('td');

        let row = document.createElement('tr');
        row.classList.add('hoverable');
        row.addEventListener('click', (e) => {
            if (!e.target.classList.contains('fa-trash'))
                editContact(contact);
        });

        row.appendChild(name);
        row.appendChild(address);
        row.appendChild(email);
        row.appendChild(contactNumber);
        row.appendChild(actions);
        row.appendChild(hiddenCol);


        tableBody.appendChild(row);
    });

    setTimeout(() => {
        document.querySelector('#splashScreen').classList.add('hidden');
    }, 500);
}

const deleteContact = (contact) => {
    if (confirm(`Delete Contact ${contact.Name}`)) {
        fetch(`/api/data/DeleteContact/${contact.ID}`, {
            method: 'DELETE',
            headers: {
                'api-key': api_key
            }
        }).then(r => r.json()).then(data => { grabAllContacts() });
    }
    
    
}

const editContact = (contact) => {
    window.location.href = `/detail?id=${contact.ID}`;
}


document.querySelector('#sortingOption').addEventListener('change', () => { grabAllContacts(); })

const searchContact = () => {
    const search = document.querySelector('#searchInput').value;
    if (search !== null)
        grabAllContacts(search);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function downloadCSV() {
    exportCSV(cachedContactData, 'contacts.csv');
}


/*
UPDATE - IMPORT CONTACTS
*/

const tempdata = {
    numberOfFiles: 0,
    numberOfContacts: 0,
    numberOfInvalid: 0,
    datas: []
}


const uploadJSON = () => {
    document.getElementById('uploadJSONUI').classList.remove('hidden');
}

document.getElementById('uploadJSONUI').addEventListener('click', function (e) {
    if (!e.target.classList.contains('btn'))
        document.getElementById('uploadJSONUI').classList.add('hidden');
});


async function startImport(){
    let completedCounter = 0;
    document.getElementById('uploadUIInfo').textContent = `Importing in progress...`;

    fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': api_key
        },
        body: JSON.stringify(tempdata.datas)
    }).then(r => r.json()).then(data => {
        if (data.Status === 200) {
            document.getElementById('uploadUIInfo').textContent = `Importing completed.`;
            grabAllContacts();
        }
    });
    for (const contact of tempdata.datas) {
        /* Call the upload fetch */
        await sleep(100);

        
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


function incrementTempdataNofC() {
    tempdata.numberOfContacts++;
}

function incrementTempdataNoI() {
    tempdata.numberOfInvalid++;
}

function pushContactToDatas(contact) {
    tempdata.datas.push(contact);
}

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.
    tempdata.numberOfFiles = files.length;
    tempdata.numberOfContacts = 0;
    tempdata.numberOfInvalid = 0;
    tempdata.datas = [];

    for (const file of files) {
        var reader = new FileReader();

        reader.onload = function (event) {
            let p_element = document.createElement('p');
            p_element.classList.add('hidden');
            p_element.innerHTML = event.target.result;
            const data = JSON.parse(p_element.innerText);
            for (const contact of data) {
                if (contact.Name !== undefined && contact.Address !== undefined && contact.Email !== undefined && contact.ContactNo !== undefined) {
                    pushContactToDatas(contact);
                    incrementTempdataNofC();
                } else {
                    incrementTempdataNoI();
                }

            }
            p_element.remove();
        }
        if (file.type === 'application/json') {
            reader.readAsText(file);
        }
        else
            alert(`Invalid file type. Please upload a JSON file. [${file.name}]`)
    }

    setTimeout(() => {
        document.getElementById('uploadUIInfo').textContent = `Read ${tempdata.numberOfFiles} file(s) containing ${tempdata.numberOfContacts} contact(s). ${tempdata.numberOfInvalid} invalid data.`;
    }, 100);
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);