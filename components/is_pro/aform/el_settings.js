function AForm_OnElEdit(arParams) {

    class AForm_params {

        constructor(el) {
            let fields = JSON.parse(el.value);
            this.fields = fields;
            this.el = el;

            let d = new Date();
            this.id = 'Aform_' + this.el.name +  d.getTime();
        }

        show() {
            let result = '';
            if (document.querySelector('#' + this.id)) {
                document.querySelector('#' + this.id).remove();
            };
            result += '<table id="' + this.id + '">';
            result += '<tr>';
            result += '<td>';
            result += 'Parametr / Field';
            result += '</td>';
            result += '<td>';
            result += 'Value (%field_nme%, %FIELDS% - all fields)';
            result += '</td>';
            result += '<td style="min-width: 100px;">';
            result += '</td>';
            result += '</tr>';
            for (let k in this.fields) {
                result += '<tr data-key="' + k + '">';
                result += '<td>';
                result += '<input name="AForm_params_key" value="' + k + '">';
                result += '</td>';
                result += '<td>';
                result += '<input name="AForm_params_value" value="' + this.fields[k] + '">';
                result += '</td>';
                result += '<td>';
                result += '<button class="up" role="button">&#x2191;</button>';
                result += '<button class="down" role="button">&#x2193;</button>';
                result += '<button class="add" role="button">+</button>';
                result += '<button class="del" role="button">&times;</button>';
                result += '</td>';
                result += '</tr>';
            }
            if (this.fields.length == 0) {
                result += '<tr data-key="">';
                result += '<td>';
                result += '<input name="AForm_params_key" value="">';
                result += '</td>';
                result += '<td>';
                result += '<input name="AForm_params_value" value="">';
                result += '</td>';
                result += '<td>';
                result += '<button class="add" role="button">+</button>';
                result += '</td>';
                result += '</tr>';
            }

            result += '</table>';
            return result;
        }

        update_fields() {
            const table = document.querySelector('#' + this.id);
            let fields = {};
            table.querySelectorAll('tr').forEach(function (item) {
                if (item.querySelector('input[name="AForm_params_key"]')) {
                    const key = item.querySelector('input[name="AForm_params_key"]').value;
                    const val = item.querySelector('input[name="AForm_params_value"]').value;
                    if (key != '') {
                        fields[key] = val;
                    }
                }
            })
            this.fields = fields;
            this.el.value = JSON.stringify(this.fields);
        }

        up(key) {
            let prevkey = '';
            let prevval = '';
            let fields = {};
            for (let k in this.fields) {
                if (k == key) {
                    fields[k] = this.fields[k];
                } else {
                    if (prevkey != '') {
                        fields[prevkey] = prevval;
                    }
                    prevkey = k;
                    prevval = this.fields[k];
                }
            }
            fields[prevkey] = prevval;
            this.fields = fields;
        }

        down(key) {
            let prevkey = '';
            let prevval = '';
            let fields = {};
            for (let k in this.fields) {

                if (k == key) {
                    prevkey = k;
                    prevval = this.fields[k];
                } else {
                    fields[k] = this.fields[k];
                    if (prevkey != '') {
                        fields[prevkey] = prevval;
                        prevkey = '';
                        prevval = '';
                    }
                }
            }
            if (prevkey != '') {
                fields[prevkey] = prevval;
            }
            this.fields = fields;
        }

        add(key) {
            let fields = {};
            let d = new Date();

            for (let k in this.fields) {
                fields[k] = this.fields[k];
                if (k == key) {
                    fields['_' + d.getTime()] = '';
                }
            }
            this.fields = fields;
        }

        del(key) {
            let fields = {};
            for (let k in this.fields) {
                if (k != key) {
                    fields[k] = this.fields[k];
                }
            }
            this.fields = fields;
        }


    }


    /********************************************************* */

    const tr = arParams.oInput.closest('tr');
    if (tr.querySelector('.bxcompprop-cont-table-l')) {
        tr.querySelector('.bxcompprop-cont-table-l').remove();
        tr.querySelector('.bxcompprop-cont-table-r').setAttribute('colspan', '2');;
    }

    let AformFields = new AForm_params(arParams.oInput);

    let obLabel = arParams.oCont.appendChild(BX.create('DIV', {
        html: AformFields.show()
    }));



    initUpdate();

    function initUpdate() {

        document.querySelectorAll('#' + AformFields.id + ' input[name="AForm_params_key"]').forEach(function (item) {
            item.addEventListener(
                'change',
                function () {
                    setTimeout(function () {
                        AformFields.update_fields();
                    }, 100);
                },
                false
             );
        });

        document.querySelectorAll('#' + AformFields.id + ' input[name="AForm_params_value"]').forEach(function (item) {
            item.addEventListener(
                'change',
                function () {
                    setTimeout(function () {
                        AformFields.update_fields();
                    }, 100);
                },
                false
             );
        });

        document.querySelectorAll('#' + AformFields.id + ' button.up').forEach(function (item) {
            item.addEventListener(
                'click',
                function (event) {
                    event.preventDefault();
                    let n = item.closest('tr').dataset.key;
                    AformFields.update_fields();
                    AformFields.up(n);
                    let obLabel = arParams.oCont.appendChild(BX.create('DIV', {
                        html: AformFields.show()
                    }));
                    AformFields.update_fields();
                    initUpdate();
                },
                false
             );
        });
        document.querySelectorAll('#' + AformFields.id + ' button.down').forEach(function (item) {
            item.addEventListener(
                'click',
                function (event) {
                    event.preventDefault();
                    let n = item.closest('tr').dataset.key;
                    AformFields.update_fields();
                    AformFields.down(n);
                    let obLabel = arParams.oCont.appendChild(BX.create('DIV', {
                        html: AformFields.show()
                    }));
                    AformFields.update_fields();
                    initUpdate();
                },
                false
             );
        });

        document.querySelectorAll('#' + AformFields.id + ' button.add').forEach(function (item) {
            item.addEventListener(
                'click',
                function (event) {
                    event.preventDefault();
                    let n = item.closest('tr').dataset.key;
                    AformFields.update_fields();
                    AformFields.add(n);
                    let obLabel = arParams.oCont.appendChild(BX.create('DIV', {
                        html: AformFields.show()
                    }));
                    AformFields.update_fields();
                    initUpdate();
                },
                false
            );
        });

        document.querySelectorAll('#' + AformFields.id + ' button.del').forEach(function (item) {
            item.addEventListener(
                'click',
                function (event) {
                    event.preventDefault();
                    let n = item.closest('tr').dataset.key;
                    AformFields.update_fields();
                    AformFields.del(n);
                    let obLabel = arParams.oCont.appendChild(BX.create('DIV', {
                        html: AformFields.show()
                    }));
                    AformFields.update_fields();
                    initUpdate();
                },
                false
             );
        });
    }


    /****************************************************** */


}


