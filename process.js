fetch('Table_Input.csv')
    .then(response => response.text())
    .then(data => {

        // skip header row
        const rows = data.split('\n').slice(1); 
        const values = {};

        // populate values object with data from CSV
        rows.forEach(row => {
            const cols = row.split(',');
            if (cols.length == 2) {
                values[cols[0].trim()] = parseFloat(cols[1].trim());
            }
        });

        // insert data from csv into table 1
        const dataTableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
        rows.forEach(row => {
            const cols = row.split(',');
            if (cols.length == 2) {
                const newRow = dataTableBody.insertRow();
                newRow.insertCell(0).textContent = cols[0].trim();
                newRow.insertCell(1).textContent = cols[1].trim();
            }
        });

        // calculate values for Alpha, Beta, and Charlie
        const alphaValue = values['A5'] + values['A20'];
        const betaValue = values['A15'] + values['A7'];
        const charlieValue = values['A13'] * values['A12'];

        // display calculated values for Table 2
        document.getElementById('value-alpha').textContent = alphaValue;
        document.getElementById('value-beta').textContent = betaValue;
        document.getElementById('value-charlie').textContent = charlieValue;
    })

    // display if error occur
    .catch(error => console.error('File not found :', error));