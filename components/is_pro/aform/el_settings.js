function AForm_OnElEdit(arParams) {

    class AForm_params {

        constructor(el) {
            let fields = JSON.parse(el.value);
            this.fields = fields;
            this.el = el;
        }

        show() {
            let result = '';
            const id = 'Aform_' + this.el.name;
            result += '<table id="' + id + '">';
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
                result += '<tr>';
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
                result += '<tr>';
                result += '<td>';
                result += '<input name="AForm_params_key" value="">';
                result += '</td>';
                result += '<td>';
                result += '<input name="AForm_params_value" value="">';
                result += '</td>';
                result += '<td>';
                result += '<button class="up" role="button">&#x2191;</button>';
                result += '<button class="down" role="button">&#x2193;</button>';
                result += '<button class="add" role="button">+</button>';
                result += '<button class="del" role="button">&times;</button>';
                result += '</td>';
                result += '</tr>';
            }

            result += '</table>';
            return result;
        }

        update_fields() {
            const id = 'Aform_' + this.el.name;
            this.el.value = JSON.stringify(this.fields);
        }

    }


    /********************************************************* */

    let AformFields = new AForm_params(arParams.oInput);

    var obLabel = arParams.oCont.appendChild(BX.create('DIV', {
        html: AformFields.show()
    }));

    const tr = arParams.oInput.closest('tr');
    if (tr.querySelector('.bxcompprop-cont-table-l')) {
        tr.querySelector('.bxcompprop-cont-table-l').remove();
        tr.querySelector('.bxcompprop-cont-table-r').setAttribute('colspan', '2');;
    }

    initUpdate();

    function initUpdate() {
        /*
        document.querySelectorAll('.AForm_field .field_value').forEach(function (item) {
            item.addEventListener(
                'change',
                function () {
                    setTimeout(function () {
                        AformFields.update_fields();
                        document.querySelector('.AformFields').remove();
                        arParams.oCont.appendChild(BX.create('DIV', {
                            html: AformFields.show()
                        }));
                        initUpdate();
                    }, 100);
                },
                false
             );
        });
        */
    }


    /****************************************************** */


}


