
const salary=document.querySelector('#salary');
const output=document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function(){
    output.textContent = salary.value;
});

const text=document.querySelector('#name');
const textError=document.querySelector('.error-text-output');
text.addEventListener('input', function(){
    if (text.value.length==0){
        textError.textContent="";
    }
    else{
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}\\s[A-Za-z]{3,}$');
    if(nameRegex.test(text.value))
    textError.textContent ="";
    else textError.textContent = "Name is INcorrect";
    }
});