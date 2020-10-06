const forms = () => {

    if (document.querySelector(".form")) {

        const ajaxSend = async (url, formData) => {
            const fetchResponse = await fetch(url, {
                method: 'POST',
                body: formData
            });
            if (!fetchResponse.ok) {
                throw new Error(`Ошибка по адресу ${url}, статус ошибки ${fetchResponse.status}`);
            }
            return await fetchResponse.text();
        }

        document.querySelectorAll('.form').forEach(el => {
            el.addEventListener('submit', function (e) {
                e.preventDefault();
                const formData = new FormData(this);

                ajaxSend('/mail.php', formData)
                    .then(function (data) {
                        // document.querySelector('.fancybox-close-small').click(); // close fancy popup
                        swal({
                            title: 'Спасибо!',
                            text: 'Данные отправлены.',
                            icon: 'success',
                            button: 'Ok'
                        });
                        el.reset();
                    }).catch(function (error) {
                        swal({
                            title: error,
                            icon: 'error',
                            button: 'Ok'
                        });
                    });
            });
        });

    }

}

export default forms;