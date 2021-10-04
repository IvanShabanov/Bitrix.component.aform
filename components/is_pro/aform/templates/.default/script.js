function Default_CheckForm() {
    let content_div = document.querySelectorAll('.FRONTEND_FORM');
    if (content_div.length > 0) {
        content_div.forEach(function (form, index) {
            let this_div = form;
            let this_div_id = form.getAttribute('id');
            console.log(this_div_id);
            if (!form.classList.contains('inited')) {
                form.classList.add('inited');
                form.addEventListener('submit', function (event) {
                    event.preventDefault();
                    let action_url = form.getAttribute('action');
                    if ((action_url == null) || (typeof action_url == 'undefined')) {
                        action_url = window.location;
                    }
                    let data = new FormData();

                    const fields = form.querySelectorAll('input, select, textarea');
                    fields.forEach(function (field) {
                        let input_type = field.getAttribute('type');
                        let input_name = field.getAttribute('name');
                        if (input_type == 'file') {
                            for (let i = 0; i < field.files.length; i++) {
                                data.append(input_name, field.files[i]);
                            };
                        } else if (input_type == 'checkbox') {
                            if (field.checked) {
                                data.append(input_name, field.value);
                            };
                        } else if (input_type == 'radio') {
                            if (field.checked) {
                                data.append(input_name, field.value);
                            };
                        } else {
                            data.append(input_name, field.value);
                        }
                    });
                    fetch(action_url, {
                        method: 'POST',
                        body: data,
                    }).then(function (response) {
                        return response.text();
                    }).then(function (html) {
                        let parser = new DOMParser();
                        let doc = parser.parseFromString(html, 'text/html');
                        let msg = doc.querySelector('#' + this_div_id);
                        console.log(this_div_id);
                        this_div.innerHTML = msg.innerHTML;
                    })
                    .catch(function (err) {
                        console.log('Something went wrong. ', err);
                    });

                });
            };
        });
    };
}


document.addEventListener('DOMContentLoaded', function(){
    /*
    const doc = $('body')[0];
    const MutationObserver = window.MutationObserver;
    const myObserver = new MutationObserver(Default_CheckForm);
    const obsConfig = { childList: true, characterData: true, attributes: true, subtree: true };
    myObserver.observe(doc, obsConfig);
    */
    Default_CheckForm();
});