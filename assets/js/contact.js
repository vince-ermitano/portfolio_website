document.addEventListener('DOMContentLoaded', () => {
    let dialogSuccess = document.getElementById('success-dialog');
    let dialogFail = document.getElementById('fail-dialog');
    let form = document.querySelector('form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        emailjs.sendForm('service_p1ruetj','template_qg4g2uj', form)
            .then(() => {
                dialogSuccess.showModal();

                document.body.addEventListener('click', (e) => {
                    dialogSuccess.close('Clicked away');
                }, { once: true});
            }, (error) => {
                dialogFail.showModal();

                document.body.addEventListener('click', (e) => {
                    dialogFail.close('Clicked away');
                }, { once: true});
            });

        form.reset();
    });
});