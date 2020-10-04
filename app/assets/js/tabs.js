const tabsInit = () => {
    const tabs = document.querySelectorAll('.radio__input');
    const tabs_content = document.querySelectorAll('.pharmacyes');

    tabs.forEach(el => {
        el.addEventListener('click', function () {
            let target = this.getAttribute('data-target');

            tabs.forEach(tab => tab.classList.remove('active'));
            tabs_content.forEach(item => item.classList.remove('show'));

            this.classList.add('active');
            document.querySelector('.pharmacyes--' + target).classList.add('show');
        });
    });

}

export default tabsInit;