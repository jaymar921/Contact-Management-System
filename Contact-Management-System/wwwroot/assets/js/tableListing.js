const api_key = 'api-vm3875y285982m35mn45b674';

const closeAddContactModal = () => {
    document.getElementById('addContactModal').classList.add('hidden');
    console.log(clearAddContactModal());
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

document.querySelector('#contactname').addEventListener('input', ({target:{value}}) => {
    if(value !== '') {
        document.querySelector('#nameindicator').classList.remove('hidden');
    }else{
        document.querySelector('#nameindicator').classList.add('hidden');
    }
});

document.querySelector('#address').addEventListener('input', ({target:{value}}) => {
    if(value.length > 5) {
        document.querySelector('#addressindicator').classList.remove('hidden');
    }else{
        document.querySelector('#addressindicator').classList.add('hidden');
    }
});

document.querySelector('#email').addEventListener('input', ({target:{value}}) => {
    // create a regex to check if the email is valid
    const emailRegex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,5}$');
    if(emailRegex.test(value)) {
        document.querySelector('#emailindicator').classList.remove('hidden');
        document.querySelector('#emailindicator').classList.remove('fa-asterisk');
        document.querySelector('#emailindicator').classList.add('fa-check');
        document.querySelector('#emailindicator').style.color = 'green';
    }else{
        document.querySelector('#emailindicator').classList.add('hidden');
        if(value.length > 0) {
            document.querySelector('#emailindicator').classList.remove('hidden');
            document.querySelector('#emailindicator').classList.remove('fa-check');
            document.querySelector('#emailindicator').classList.add('fa-xmark');
            document.querySelector('#emailindicator').style.color = 'red';
        }
        if(value.includes('@') && value.includes('.')) {
            document.querySelector('#emailindicator').classList.remove('hidden');
            document.querySelector('#emailindicator').classList.remove('fa-xmark');
            document.querySelector('#emailindicator').classList.add('fa-asterisk');
            document.querySelector('#emailindicator').style.color = 'orange';
        }
    }
});

document.querySelector('#contactNumber').addEventListener('input', ({target:{value}}) => {
    let val = value.replace(/\-/g, '');
    console.log(val)
    if((val.startsWith('09') && val.length === 11) || (val.startsWith('9') && val.length === 10)) {
        document.querySelector('#contactindicator').classList.remove('hidden');
        document.querySelector('#contactindicator').classList.add('fa-mobile');
        document.querySelector('#contactindicator').classList.remove('fa-phone');
    }else if(val.length === 7 && !val.startsWith('9') && !val.startsWith('09')){
        document.querySelector('#contactindicator').classList.remove('hidden');
        document.querySelector('#contactindicator').classList.add('fa-phone');
        document.querySelector('#contactindicator').classList.remove('fa-mobile');
    }else{
        document.querySelector('#contactindicator').classList.add('hidden');
    }
});



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

        let deleteButton = document.createElement('a');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener('click', () => {
            deleteContact(contact);
        });

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        let row = document.createElement('tr');
        row.appendChild(name);
        row.appendChild(address);
        row.appendChild(email);
        row.appendChild(contactNumber);
        row.appendChild(actions);

        tableBody.appendChild(row);
    });

    setTimeout(() => {
        document.querySelector('#splashScreen').classList.add('hidden');
    }, 500);
}

const deleteContact = (contact) => {
    console.log(contact)
    fetch(`/api/data/DeleteContact/${contact.ID}`, {
        method: 'DELETE',
        headers: {
            'api-key': api_key
        }
    }).then(r => r.json()).then(data => { grabAllContacts() });
    
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