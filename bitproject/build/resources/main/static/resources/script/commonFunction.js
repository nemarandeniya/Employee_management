//create function for get service request
const getajaxServiceajaxRequest = () =>{
    employees = [];

    //call jquary ajax function
    //ajax("URL" , option)
    $.ajax("/employee/alldata", {
        contentType: 'json',
        type: "GET", async: false, //true dmmoth fill dtaintotable function eka methana call krnwa
        success: function (data) {
            console.log("Success " + data);
            employees = data;
        },

        error: function (resData) {
            console.log("Error " + resData);
            employees = [];
        }
    });
}



//create function filldatainto select element

const fillDataIntoSelect = (feildId, message , dataList , propertyName,selectedValue) =>{

    feildId.innerHTML = '';

    if (message != '') {
        const optionMsgD = document.createElement('option');
        optionMsgD.innerText = message;
        optionMsgD.selected = 'selected';
        optionMsgD.disabled = 'disabled';
        feildId.appendChild(optionMsgD);

    }
    
    dataList.forEach(element => {
        const option = document.createElement('option');
        option.value = JSON.stringify(element);
        option.innerText = element[propertyName];
        if (selectedValue == element[propertyName]) {
            option.selected = true;
        }
        feildId.appendChild(option);
    });

}