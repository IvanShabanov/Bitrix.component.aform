function Check_this_value_empty(el) {
    if (el.value == '') {
        $(el).closest('.field').removeClass('active');
    } else {
        $(el).closest('.field').addClass('active');
    }
}


function InitAxiForm() {
    const doc = $('body')[0];
    const MutationObserver = window.MutationObserver;
    const myObserver = new MutationObserver(CheckAxiForm);
    const obsConfig = { childList: true, characterData: true, attributes: true, subtree: true };
    myObserver.observe(doc, obsConfig);
    CheckAxiForm();
}

function initFilesField() {
    let fields = document.querySelectorAll('.field__file');
    Array.prototype.forEach.call(fields, function (input) {
        let label = input.nextElementSibling,
            labelVal = label.querySelector('.field__file-fake').innerText;

        input.addEventListener('change', function (e) {
            let countFiles = '';
            if (this.files && this.files.length >= 1)
                countFiles = this.files.length;

            if (countFiles)
                label.querySelector('.field__file-fake').innerText = 'Выбрано файлов: ' + countFiles;
            else
                label.querySelector('.field__file-fake').innerText = labelVal;
        });
    });
}

function CheckAxiForm() {
    var content_div = $('.FRONTEND_FORM');
    $(content_div).each(function () {
        var this_div = $(this);
        var this_div_id = $(this).attr('id');
        if (!$(this).find('form').hasClass('inited')) {
            $(this).find('form').addClass('inited');
            initFilesField();
            /*
            $(this).find(' input, textarea').each(function () {
                Check_this_value_empty(this);
                $(this).on('keyup', function () {
                    Check_this_value_empty(this);
                })
                $(this).on('focus', function () {
                    $(this).closest('.field').addClass('active');
                });
                $(this).on('focusout', function () {
                    Check_this_value_empty(this);
                });
            });
            */


            $(this).find('form').submit(function (event) {
                event.preventDefault();
                var action_url = $(this).attr('action');
                var data = new FormData();
                /* Собираем все поля */
                $(this).find('input, select, textarea').each(function () {
                    var input_type = $(this).attr('type');
                    var input_name = $(this).attr('name');
                    if (input_type == 'file') {
                        data.append(input_name, $(this)[0].files[0]);
                    } else if (input_type == 'checkbox') {
                        if ($(this).prop('checked')) {
                            data.append(input_name, $(this).val());
                        };
                    } else if (input_type == 'radio') {
                        if ($(this).prop('checked')) {
                            data.append(input_name, $(this).val());
                        };
                    } else {
                        data.append(input_name, $(this).val());
                    }
                });
                $.ajax({
                    type: "POST",
                    processData: false,
                    contentType: false,
                    url: action_url,
                    data: data,
                    success: function (data) {
                        var msg = '';
                        msg = $(data).find('#' + this_div_id).html();
                        $(this_div).html(msg);
                    }
                });
            });
        };
    });
}


$(document).ready(function () {
    InitAxiForm();
});

