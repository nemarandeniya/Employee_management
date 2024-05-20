
// creat function for fill data into table
const fillDataIntoTable5 = (tableId, dataList, displayPropertyList, refillFunction, divButton) => {

    const tableBody = tableId.children[1];
    tableBody.innerHTML = '';

    dataList.forEach((element, index) => {
        const tr = document.createElement('tr');

        const tdIndex = document.createElement('td');
        tdIndex.innerText = index + 1;
        tr.appendChild(tdIndex);

        displayPropertyList.forEach((ob, ind) => {
            const td = document.createElement('td');
            if (ob.dataType == 'text') {
                td.innerText = element[ob.propertyName];
            }
            if (ob.dataType == 'function') {
                td.innerHTML = ob.propertyName(element);
            }

            tr.appendChild(td);

        });


        tr.onclick = () => {
            refillFunction(element, index);
            window['editOb'] = element;
            window['editRow'] = index;
            divButton.className = '';
        }

        tableBody.appendChild(tr); // append tr into table body

    });

}