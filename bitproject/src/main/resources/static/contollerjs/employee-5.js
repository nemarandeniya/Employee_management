//browser onload
window.addEventListener('load', () => {

    // console.log('onload');

    // tooltip enable
    $('[data-bs-toggle="tooltip"]').tooltip();

    // call table refresh function
    refreshEmployeeTable();

    //call form refresh function
    refreshEmployeeForm();



})

const refreshEmployeeTable = () => {



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

    // text-> number , string , date
    // function -> object , array , boolean
    const displayPropertyList = [
        { dataType: 'text', propertyName: 'fullname' },
        { dataType: 'text', propertyName: 'nic' },
        { dataType: 'text', propertyName: 'mobile' },
        { dataType: 'function', propertyName: getHasUserAccount },
        { dataType: 'text', propertyName: 'email' },
        { dataType: 'function', propertyName: getDesignation },
        { dataType: 'function', propertyName: getEmployeeStatus }
    ];

    // call filldatainto Table function
    // (tableid, dataArrayVariableName , displayPropertyList , refillFunction , deleteFunction, printFunction)
    // fillDataIntoTable1(tableEmployee, employees ,displayPropertyList, employeeFormRefill , deleteEmployee , printEmployee, false );

    fillDataIntoTable5(tableEmployee, employees, displayPropertyList, employeeFormRefill, divModifyButton);

    $('#tableEmployee').dataTable();

    divModifyButton.className = 'd-none';
}

// create function get status name
const getEmployeeStatus = (ob) => {
    // return 'ss';
    // return ob.employeeStatus_id.name;
    if (ob.employeestatus_id.name == 'Working') {
        return '<p class="status-working">' + ob.employeestatus_id.name + '</p>'
    }

    if (ob.employeestatus_id.name == 'Resign') {
        return '<p  class="status-resign">' + ob.employeestatus_id.name + '</p>'
    }

    if (ob.employeestatus_id.name == 'Deleted') {
        return '<p  class="status-delete">' + ob.employeestatus_id.name + '</p>'
    } else {
        return '<p  class="status-other">' + ob.employeestatus_id.name + '</p>'
    }


}

// create function get designation name
const getDesignation = (ob) => {
    return ob.designation_id.name;
}

// create function get has user account
const getHasUserAccount = (ob) => {
    if (ob.hasUserAccount) {
        // return ' Has Account';
        return '<i class="fa-solid fa-circle-check  fa-2x text-success"></i>' + ' Has Account';
    } else {
        //return 'Have not Account';
        return '<i class="fa-solid fa-circle-xmark fa-2x text-danger"></i>' + ' Have not Account';
    }

}

//employee print function
const printEmployee = (ob, rowIndex) => {
}

// employee form refill
const employeeFormRefill = (ob, rowIndex) => {
    //open modal
    $('#employeeAddModal').modal('show');
    employee = JSON.parse(JSON.stringify(ob));
    oldemployee = JSON.parse(JSON.stringify(ob)); //for compare updates
    // need to get full object

    textFullName.value = ob.fullname; // data bind ob.property --> input feild
    textCallingName.value = ob.callingname;//elementid.value = ob.releventPropertyname(only valid static element)
    textNIC.value = ob.nic;
    textEmail.value = ob.email;
    textMobileNo.value = ob.mobile;
    dateDateOfBirth.value = ob.dob;
    textAddress.value = ob.address;

    if (ob.note != null) {
        textNote.value = ob.note;
    } else {
        textNote.value = "";
    }

    if (ob.landno != null) {
        textLandNo.value = ob.note;
    } else {
        textLandNo.value = "";
    }

    console.log("hbhbhbhb");

    selectCivilStatus.value = ob.civilstatus;

    if (ob.gender == "Male") {
        radioMale.checked = true;
    } else {
        radioFemale.checked = true;
    }

    employeeStatuses = [{ id: 1, name: 'Working' }, { id: 2, name: 'Resign' }, { id: 3, name: 'Deleted' }];
    fillDataIntoSelect(selectStatus, 'Plz Select', employeeStatuses, 'name', ob.employeestatus_id.name);

    designations = [{ id: 1, name: 'Manager' }, { id: 2, name: 'Cashier' }, { id: 3, name: 'Store-manager' }];
    fillDataIntoSelect(selectDesignation, 'Select Designation', designations, 'name', ob.designation_id.name);
}
//define checkEmployeeFormUpdates function
const checkEmployeeFormUpdates = () => {
    let updates = "";
    if (employee.fullname != oldemployee.fullname) {
        updates = updates + "Employee Fullname is Changed. \n";
    }
    if (employee.callingname != oldemployee.callingname) {
        updates = updates + "Employee Callingname is Changed. \n";
    }
    if (employee.nic != oldemployee.nic) {
        updates = updates + "Employee NIC is Changed. \n";
    }
    if (employee.gender != oldemployee.gender) {
        updates = updates + "Employee Gender is Changed. \n";
    }
    if (employee.email != oldemployee.email) {
        updates = updates + "Employee email is Changed. \n";
    }
    if (employee.mobile != oldemployee.mobile) {
        updates = updates + "Employee mobile is Changed. \n";
    }
    if (employee.landno != oldemployee.landno) {
        updates = updates + "Employee landno is Changed. \n";
    }
    if (employee.note != oldemployee.note) {
        updates = updates + "Employee note is Changed. \n";
    }
    if (employee.civilstatus != oldemployee.civilstatus) {
        updates = updates + "Employee civilstatus is Changed. \n";
    }
    if (employee.employeestatus_id.id != oldemployee.employeestatus_id.id) {
        updates = updates + "Employee Employee Status is Changed. \n";
    }
    if (employee.designation_id.id != oldemployee.designation_id.id) {
        updates = updates + "Employee Designation is Changed. \n";
    }
    return updates;
}
//define function for employee update buttopn
const buttonEmployeeUpdate = () => {
    console.log("update");
    //check form error
    let errors = getErrors();
    if (errors == "") {
        //check form updates
        let updates = checkEmployeeFormUpdates();
        if (updates == "") {
            alert("Nothing Updated");
        } else {
            //user confirmation
            let userConfirm = confirm("Are you sure to update following changes..? \n" + updates);
            if (userConfirm) {
                //call put service request
                let putServiceResponce;

                $.ajax("/employee", {
                    type: "PUT",
                    async: false,
                    contentType: "application/json",
                    data: JSON.stringify(employee),

                    success: function (successResponceOb) {
                        putServiceResponce = successResponceOb;
                    },

                    error: function (failResponceOb) {
                        putServiceResponce = failResponceOb;

                    }
                });
                //check put service responce
                if (putServiceResponce == "OK") {
                    alert("Update Successfully..!");
                    $('#employeeAddModal').modal('hide');
                    refreshEmployeeTable();
                    formEmployee.reset();
                    refreshEmployeeForm();
                } else {
                    alert("Update Not Completed..!" + putServiceResponce)
                }

            }


        }
    } else {
        alert(" Form has following errors \n" + errors);
    }
}

// employee delete function
const deleteEmployee = (ob, rowIndex) => {

    //user confirmation
    let userConfirm = confirm('Are you sure to delete following employee \n' + ob.fullname);

    if (userConfirm) {
        let deleteServiceResponce;

        $.ajax("/employee", {
            type: "DELETE",
            contentType: "application/json",
            data: JSON.stringify(ob),
            async: false,
            success: function (data) {
                deleteServiceResponce = data;
            },
            error: function (resData) {
                deleteServiceResponce = errorData;
            }

        })
        if (deleteServiceResponce == "OK") {
            alert("Delete successfully..!");
            $('#employeeAddModal').modal('hide');
            refreshEmployeeTable();
        }
    }

    // confirm('Are you sure to delete following employee \n' 
    //             +ob.fullName);
    // refreshEmployeeTable();
}


//create function for validate full name name generate callingname data list
const textFullNameValidator = (feildId) => {
    const fullNameValue = feildId.value;
    const regPettern = new RegExp('^([A-Z][a-z]{2,20}[\\s])+([A-Z][a-z]{2,20})$');

    if (fullNameValue != '') {
        if (regPettern.test(fullNameValue)) {
            //valid value 
            feildId.style.border = '2px solid green';
            employee.fullname = fullNameValue;

            // generate callingname list
            dlFullNameParts.innerHTML = '';
            callingnameList = fullNameValue.split(' ');
            callingnameList.forEach(element => {
                const option = document.createElement('option');
                option.value = element;
                dlFullNameParts.appendChild(option);
            });

        } else {
            //invalid
            dlFullNameParts.innerHTML = '';
            employee.fullname = null;
            employee.callingname = null;
            feildId.style.border = '2px solid red';
        }
    } else {
        dlFullNameParts.innerHTML = '';
        employee.fullname = null;
        employee.callingname = null;
        feildId.style.border = '2px solid red';
    }
}


//define function for close modal
const buttonModalClose = () => {

    const closeResponse = confirm('Are you sure to close the modal...? \n ');
    if (closeResponse) {
        // close modal
        $('#employeeAddModal').modal('hide');
        formEmployee.reset();
    }
}

//define function callingname validator
const textCallingNameValidator = (field) => {
    const fieldValue = field.value;

    const index = callingnameList.map(element => element).indexOf(fieldValue);

    if (index != -1) {
        //valid
        field.style.border = '2px solid green';//set valid color for element
        employee.callingname = fieldValue;
    } else {
        //invalid
        field.style.border = '2px solid red';//
        employee.callingname = null;
    }
}

//define function for check required field error
const getErrors = () => {
    let errors = '';
    if (employee.fullname == null) {
        //errors = errors + 'Full Name can not be null..! \n';
        textFullName.style.border = '2px solid Red'
    }
    if (employee.callingname == null) {
        //errors = errors + 'Please enter calling name..! \n';
        textCallingName.classList.add('is-invalid')
    }
    if (employee.designation_id == null) {
        errors = errors + 'designation can not be null..! \n';
    }
    if (employee.employeestatus_id == null) {
        errors = errors + 'please select employee status..! \n';
    }
    if (employee.mobile == null) {
        errors = errors + 'please enter mobile number..! \n';
    }
    if (employee.email == null) {
        errors = errors + 'please enter your email..! \n';
    }
    if (employee.address == null) {
        errors = errors + 'please enter your Address..! \n';
    }
    if (employee.dob == null) {
        errors = errors + 'please enter your Date of Bikrth..! \n';
    }
    if (employee.civilstatus == null) {
        errors = errors + 'please enter your civil status..! \n';
    }

    return errors;
}

//define function for refresh form
const refreshEmployeeForm = () => {


    //define new object for data binding(form eka fill krddi value eka valid nm me object ekta thma ewa collect krnne)
    employee = new Object();

    //

    employeeStatuses = [{ id: 1, name: 'Working' }, { id: 2, name: 'Resign' }, { id: 3, name: 'Delete' }];

    /*  const selectStatusElement = document.querySelector('#selectStatus');
     selectStatusElement.innerHTML = '';
  
     const optionMsg = document.createElement('option');
     optionMsg.innerText = 'Select Status';
     optionMsg.disabled = 'disabled';
     optionMsg.selected = 'selected';
     selectStatusElement.appendChild(optionMsg);
  
     employeeStatuses.forEach(element => {
         const option = document.createElement('option');
         option.innerText = element.name;
         option.value = element;
         selectStatusElement.appendChild(option);
     }); */


    fillDataIntoSelect(selectStatus, 'Plz Select', employeeStatuses, 'name')


    designations = [{ id: 1, name: 'Manager' }, { id: 2, name: 'Cashier' }, { id: 3, name: 'Store-Manager' }];



    //call function filldatantoselectelement
    fillDataIntoSelect(selectDesignation, 'Select Designation', designations, 'name');

    //form element need to det default color
    selectStatus.style.border = '1px solid #ced4da';
    selectDesignation.style.border = '1px solid #ced4da';

    textFullName.style.border = '1px solid #ced4da';
    textCallingName.style.border = '1px solid #ced4da';
    textNIC.style.border = '1px solid #ced4da';
    dateDateOfBirth.style.border = '1px solid #ced4da';
    textEmail.classList.remove('is-valid');
}



//define function employee submit
const buttonEmployeeSubmit = () => {
    //console.log('on submit');
    console.log(employee);
    //need to check errors -- required field value valid or not

    //can check optional field
    const errors = getErrors();
    if (errors == '') {
        //not ext need to get user confirmation
        //call post servise
        //check post service responce
        const userSubmitResponse = confirm('Are you sure to submit...?\n');


        if (userSubmitResponse) {
            //call post service

            let postServiceResponce;

            $.ajax("/employee", {
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(employee),
                async: false,

                success: function (data) {
                    console.log("success" + data);
                    postServiceResponce = data;
                },

                error: function (resData) {
                    console.log("Fail" + resData);
                    postServiceResponce = resData;
                }

            });

            if (postServiceResponce == "OK") {
                alert("Save successfully...!");
                $('#employeeAddModal').modal('hide');
                refreshEmployeeForm();
                formEmployee.reset();
                refreshEmployeeTable();
            } else {
                alert("Fail to submit employee form \n" + postServiceResponce);
            }

        }
    } else {
        //if error ext then set alert
        alert('form has following error...\n' + errors);
    }





}

