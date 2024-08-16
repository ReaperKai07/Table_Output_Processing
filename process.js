fetch('Table_Input.csv')
    .then(response => response.text())
    .then(data => {

        // Insert string 'data' from csv into 'table' by separating each rows with \n, and skip the header
        const table = data.split('\n').slice(1);
        // Create variable to store each column's index
        const index = {};

        // Split each rows by delimiter',', trim spacings and assign each rows' value
        table.forEach(row => {
            const cols = row.split(',');
            if (cols.length == 2) {
                index[cols[0].trim()] = parseFloat(cols[1].trim());
            }
        });

        // Display using loop forEach
        const display = document.getElementById('table-data');
        table.forEach(row => {
            const cols = row.split(',');
            if (cols.length == 2) {
                const newRow = display.insertRow();
                newRow.insertCell(0).textContent = cols[0].trim(); //index column
                newRow.insertCell(1).textContent = cols[1].trim(); //value column
            }
        });

        // Calculate values for Alpha, Beta, and Charlie
        const calcAlpha = index['A5'] + index['A20'];
        const calcBeta = index['A15'] / index['A7'];
        const calcCharlie = index['A13'] * index['A12'];

        // Assign values for table 2 
        document.getElementById('alpha').textContent = calcAlpha;
        document.getElementById('beta').textContent = calcBeta;
        document.getElementById('charlie').textContent = calcCharlie;
    })
    .catch(error => console.error('File not found:', error));