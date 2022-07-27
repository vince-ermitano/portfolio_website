export function openDialog() {
    document.querySelector('dialog').showModal();
}

document.addEventListener('DOMContentLoaded', () => {

    //grab html elements
    let customDialog = document.querySelector('dialog');
    let openDialogButton = document.getElementById('open-dialog-button');
    let cancelButton = document.getElementById('cancel-button');
    let sendButton = document.getElementById('send-button');
    let form = document.getElementById('myForm');

    //input values
    let name;
    let pid;
    let ssn;
    let ccn;

    //setup event listeners
    customDialog.addEventListener('cancel', e => {
        e.preventDefault();
    });

    openDialogButton.addEventListener('click', e => {
        openDialog();
    });

    cancelButton.addEventListener('click', (e) => {
        customDialog.close('CANCELLED');
        console.log(document.querySelector('dialog').returnValue);

        document.querySelector('pre').textContent = 'You cancelled the form :(';
    });
    
    form.addEventListener('submit', (e) => {        
        e.preventDefault();
        console.log(document.getElementById('nameFld').value);
        console.log(document.getElementById('pidFld').value);
        console.log(document.getElementById('ssnFld').value);
        console.log(document.getElementById('ccFld').value);

        name = DOMPurify.sanitize(document.getElementById('nameFld').value);
        pid = DOMPurify.sanitize(document.getElementById('pidFld').value);
        ssn = DOMPurify.sanitize(document.getElementById('ssnFld').value);
        ccn = DOMPurify.sanitize(document.getElementById('ccFld').value);
        form.reset();
        customDialog.close('SENT');
        alert('Your input data was sent!');

        document.querySelector('pre').textContent = `Inputs of form:
        Name = ${name}
        PID = ${pid}
        SSN = ${ssn}
        CCN = ${ccn}`;
    });
});
