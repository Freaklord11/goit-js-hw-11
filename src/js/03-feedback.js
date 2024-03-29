import throttle from "lodash.throttle";

//initialize

const form = document.querySelector('form.feedback-form')
const emailTxt = document.querySelector('label [name="email"]');
const msgTxt = document.querySelector('label [name = "message"]');

const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(){
    const email = emailTxt.value;
    const message = msgTxt.value;

    const formData= {email,message,};

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

onReload();
function onReload(){
    const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedState){
        emailTxt.value = savedState.email;
        msgTxt.value = savedState.message;
    }
}

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e){
    e.preventDefault(); //prevent reload

    const email = emailTxt.value;
    const message = msgTxt.value;
    
    if (email == '' || message ==''){
        alert("Enter Both Items!");
        form.reset();
        return;
    }
    
    const formData = {email, message};
    console.log(formData);
    form.reset();  

    localStorage.removeItem(STORAGE_KEY);//last
}

