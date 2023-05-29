const exportCSV = (contacts, filename) => {
    let csv = 'Name,Address,Email,Contact Number\n';
    contacts.forEach(row => {
        csv += `${row.Name},${row.Address.replace(/,/g, '.')},${row.Email},${row.ContactNo}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', window.URL.createObjectURL(blob));
    a.setAttribute('download', filename);
    a.click();
}

document.querySelector('#contactname').addEventListener('input', ({ target: { value } }) => {
    verifyName(value);
});

document.querySelector('#address').addEventListener('input', ({ target: { value } }) => {
    verifyAddress(value);
});

document.querySelector('#email').addEventListener('input', ({ target: { value } }) => {
    verifyEmail(value);
});

document.querySelector('#contactNumber').addEventListener('input', ({ target: { value } }) => {
    verifyContactNumber(value);
});

const verifyContactNumber = (value) => {
    let val = value.replace(/\-/g, '');
    if ((val.startsWith('09') && val.length === 11) || (val.startsWith('9') && val.length === 10)) {
        document.querySelector('#contactindicator').classList.remove('hidden');
        document.querySelector('#contactindicator').classList.add('fa-mobile');
        document.querySelector('#contactindicator').classList.remove('fa-phone');
    } else if (val.length === 7 && !val.startsWith('9') && !val.startsWith('09')) {
        document.querySelector('#contactindicator').classList.remove('hidden');
        document.querySelector('#contactindicator').classList.add('fa-phone');
        document.querySelector('#contactindicator').classList.remove('fa-mobile');
    } else {
        document.querySelector('#contactindicator').classList.add('hidden');
    }
}

const verifyName = (value) => {
    if (value !== '' && value.length > 2) {
        document.querySelector('#nameindicator').classList.remove('hidden');
    } else {
        document.querySelector('#nameindicator').classList.add('hidden');
    }
}

const verifyAddress = (value) => {
    if (value.length > 5) {
        document.querySelector('#addressindicator').classList.remove('hidden');
    } else {
        document.querySelector('#addressindicator').classList.add('hidden');
    }
}

const verifyEmail = (value) => {
    // create a regex to check if the email is valid
    const emailRegex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,5}$');
    if (emailRegex.test(value)) {
        document.querySelector('#emailindicator').classList.remove('hidden');
        document.querySelector('#emailindicator').classList.remove('fa-asterisk');
        document.querySelector('#emailindicator').classList.add('fa-check');
        document.querySelector('#emailindicator').style.color = 'green';
    } else {
        document.querySelector('#emailindicator').classList.add('hidden');
        if (value.length > 0) {
            document.querySelector('#emailindicator').classList.remove('hidden');
            document.querySelector('#emailindicator').classList.remove('fa-check');
            document.querySelector('#emailindicator').classList.add('fa-xmark');
            document.querySelector('#emailindicator').style.color = 'red';
        }
        if (value.includes('@') && value.includes('.')) {
            document.querySelector('#emailindicator').classList.remove('hidden');
            document.querySelector('#emailindicator').classList.remove('fa-xmark');
            document.querySelector('#emailindicator').classList.add('fa-asterisk');
            document.querySelector('#emailindicator').style.color = 'orange';
        }
    }
}

const runFormValidator = () => {
    verifyName(document.querySelector('#contactname').value);
    verifyAddress(document.querySelector('#address').value);
    verifyEmail(document.querySelector('#email').value);
    verifyContactNumber(document.querySelector('#contactNumber').value);
}

try {
    document.getElementById('splashScreen').addEventListener('click', (e) => {
        document.getElementById('splashScreen').classList.add('hidden');
    });
} catch (e) {
    console.log("Splash screen not found :: "+e);
}

