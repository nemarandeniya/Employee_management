
//create function for validate texxt feild
const textValidator=(inputElement, pattern, object, property)=>{

    if (inputElement.value != '') {
        
          const regPattern = new RegExp(pattern); //
          if (regPattern.test(inputElement.value)) {
            //valid
                window[object][property] = inputElement.value; // data binding
              inputElement.classList.remove('is-invalid');
              inputElement.classList.add('is-valid');
          } else {
            //invalid
            window[object][property] = null;  // null binding
              inputElement.classList.remove('is-valid');
              inputElement.classList.add('is-invalid');
          }
      } else {
        window[object][property] = null;  // null binding
          if (inputElement.required) {
              inputElement.classList.remove('is-valid');
              inputElement.classList.add('is-invalid');
          } else {
              inputElement.classList.remove('is-valid');
              inputElement.classList.remove('is-invalid');
          }
      }
}
//define function for select Dynamic element validation
const selectDynamicValidator = (selectElement,pattern,object,property)=>{
  
  if (selectElement.value != '') {
    //valid
    selectElement.style.border = '2px solid green';
    window[object][property] = JSON.parse(selectElement.value);
  } else {
    //invalid
    selectElement.style.border = '2px solid red';
    window[object][property] = null;
  }
}

//define function for select static element validation
const selectStaticValidator = (selectElement,pattern,object,property)=>{
  if (selectElement.value != '') {
    selectElement.style.border = '2px solid green';
    window[object][property] = selectElement.value;
  }else{
    selectElement.style.border = '2px solid red';
    window[object][property] = null;
  }
}

//define function radioValidator
const radioValidator = (radioElement,pattern,object,property)=>{
  if(radioElement.checked){
    window[object][property] = radioElement.value
  }else{
    window[object][property] = null
  }
}