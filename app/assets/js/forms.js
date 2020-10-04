const forms = () => {

    if (document.querySelector(".form")) {

        // email ajax send forms
        const ajaxSend = async (url, formData) => {

            // ждём ответ, только тогда наш код пойдёт дальше
            let fetchResponse = await fetch(url, {
                method: 'POST',
                body: formData
            });

            // ждём окончания операции
            return await fetchResponse.text();
        }

        document.querySelectorAll('.form').forEach(el => {
            el.addEventListener('submit', function (e) {
                e.preventDefault();
                const formData = new FormData(this);

                ajaxSend('/mail.php', formData)
                    .then(function (fetchResponse) {
                        document.querySelector('.fancybox-close-small').click(); // close fancy popup
                        swal({
                            title: 'Спасибо!',
                            text: 'Данные отправлены.',
                            icon: 'success',
                            button: 'Ok'
                        });
                        console.log(fetchResponse);
                    }).catch(function (error) {
                        swal({
                            title: error,
                            icon: 'error',
                            button: 'Ok'
                        });
                    });

                // this.reset();
            });
        });

    }

}

export default forms;