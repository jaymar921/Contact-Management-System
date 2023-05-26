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

