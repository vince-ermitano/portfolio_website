function promptTag(strings, ssn) {
    let str0 = strings[0];

    return `${str0}${ssn}`;
}

document.addEventListener('DOMContentLoaded', (e) => {
    //setup the alert button event
    document.getElementById('alert-button').addEventListener('click', () => {
        window.alert('The alert worked!!');
    });

    //setup confirm button event
    let bClickedOk;
    document.getElementById('confirm-button').addEventListener('click', (e) => {
        bClickedOk = confirm("Click either Ok or Cancel");
        console.log(`Value of bClickedOk is ${bClickedOk}`);
        document.querySelector('output').textContent = `The value returned by the confirm method is : ${bClickedOk}`;
    });

    document.getElementById('prompt-button').addEventListener('click', (e) => {
        let sPromptInput = prompt("What is your Social Security #?");

        if (sPromptInput) {
            let myOutput = promptTag`Prompt says that your Social Security # is ${sPromptInput}`;
            document.querySelector('output').textContent = myOutput;
        } else {
            document.querySelector('output').textContent = `Prompt: User didn't enter anything`;
        }
    });

    document.getElementById('safer-prompt-button').addEventListener('click', (e) => { 
        let sSaferPromptInput = prompt("What is your Credit Card #?");

        if (sSaferPromptInput) {
            let cleanInput = DOMPurify.sanitize(sSaferPromptInput);
            let myOutput = promptTag`Safer prompt says that your Credit Card # is ${cleanInput}`;
            document.querySelector('output').textContent = myOutput;
        } else {
            document.querySelector('output').textContent = `Safer Prompt: User didn't enter anything`;
        }
    });
});