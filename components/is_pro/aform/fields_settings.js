function AForm_OnFieldsEdit(arParams) {

    class Aform {

        fields = {};
        inputs_field = {
            'type':     '<td>TYPE:</td><td>%SELECTTYPE%</td>',
            'name':     '<td>NAME:</td><td><input class="field_value" type="text" data-name="name" value="%VALUE%" title="Name [A-Z0-9_]" placeholder="Name [A-Z0-9_]"></td>',
            'title':    '<td>TITLE:</td><td><input class="field_value" type="text" data-name="title" value="%VALUE%" title="Title / Label" placeholder="Title / Label"></td>',
            'extra':    '<td>Extra input attribute:</td><td><input class="field_value" type="text" data-name="extra" value="%VALUE%" title="extra input attribute" placeholder="extra input attribute"></td>',
            'before':   '<td>HTML before input:</td><td><input class="field_value" type="text" data-name="before" value="%VALUE%" title="HTML before input" placeholder="HTML before input"></td>',
            'after':    '<td>HTML after input:</td><td><input class="field_value" type="text" data-name="after" value="%VALUE%" title="HTML after input" placeholder="HTML after input"></td>',
            'html':     '<td>HTML code:</td><td><textarea class="field_value" data-name="html" title="HTML code" placeholder="HTML code" >%VALUE%</textarea></td>',
            'values':   '<td>Values one by line:</td><td><textarea class="field_value" data-name="values" title="Values one by line" placeholder="Values one by line" >%VALUE%</textarea></td>',
            'value':    '<td>Value:</td><td><input class="field_value" type="text" data-name="value" value="%VALUE%" title="Value" placeholder="Value"></td>',
            'default_value': '<td>Default value:</td><td><input class="field_value" type="text" data-name="default_value" value="%VALUE%" title="Default value" placeholder="Default value"></td>',
            'required': '<td>Required</td><td><input class="field_value" type="checkbox" data-name="required" value="Y" title="required" placeholder="required"></td>',
            'strip_tags': '<td>Posted value not be striped tags</td><td><input class="field_value" type="checkbox" data-name="strip_tags" value="N" title="Not strip_tags" placeholder="Not strip_tags"></td>'
        };

        types = {
            "text": {
                'disable_fields': ['html', 'values', 'value'],
            },
            "date": {
                'disable_fields': ['html', 'values', 'value'],
            },
            "tel": {
                'disable_fields': ['html', 'values', 'value'],
            },
            "email": {
                'disable_fields': ['html', 'values', 'value'],
            },
            "password": {
                'disable_fields': ['html', 'values', 'value', 'default_value'],
            },
            "textarea": {
                'disable_fields': ['html', 'values', 'value'],
            },
            "checkbox": {
                'disable_fields': ['html', 'values', 'default_value'],
            },
            "select": {
                'disable_fields': ['html', 'value'],
            },
            "file": {
                'disable_fields': ['html', 'values', 'value', 'default_value', 'strip_tags'],
            },
            "hidden": {
                'disable_fields': ['html', 'extra', 'before', 'after', 'values', 'values', 'default_value', 'strip_tags'],
            },
            "html": {
                'disable_fields': ['extra', 'before', 'after', 'values', 'value', 'default_value', 'required', 'strip_tags'],
            },
            "submit": {
                'disable_fields': ['html', 'name', 'values', 'value', 'default_value', 'required', 'strip_tags'],
            },
            "": {
                'disable_fields': ['name', 'title', 'extra', 'before', 'after', 'html', 'values', 'value', 'default_value', 'required', 'strip_tags'],
            }
        }

        constructor(el) {
            let fields = JSON.parse(el.value);
            if (typeof fields == 'undefined') {
                fields = [];
            };
            let field = 0
            for (field in fields) {
                for (let k in this.inputs_field) {
                    if (typeof fields[field][k] == 'undefined') {
                        fields[field][k] = '';
                    };
                };
            };
            this.fields = fields;
            this.el = el;
        }

        show() {
            let result = '';
            let fields = this.fields;
            if (fields.length == 0) {
                fields[0] = [];
                for (let k in this.inputs_field) {
                    if (typeof fields[0][k] == 'undefined') {
                        fields[0][k] = '';
                    };
                };
                this.fields = fields;
            }
            result += '<div class="AformFields">';

            for (let field in fields) {
                result += '<div class="AForm_field id' + field + '" data-key="' + field + '" style="padding: 10px; border-bottom: 1px solid #000;">';
                result += this.params(fields[field]);
                result += '<button class="up" role="button">&#x2191;</button>';
                result += '<button class="down" role="button">&#x2193;</button>';
                result += '<button class="add" role="button">+</button>';
                result += '<button class="del" role="button">&times;</button>';
                result += '</div>';
            };


            result += '</div>';


            return result;
        }

        up(n) {
            let fields = this.fields;
            let temp = [];
            let prev = -1;
            for (let field in fields) {
                if ((n == field) && (prev > -1)) {
                    temp = fields[field];
                    fields[field] = fields[prev];
                    fields[prev] = temp;
                };
                prev = field;
            };
            this.fields = fields;
        }

        down(n) {
            let fields = this.fields;
            let temp = {};
            let prev = -1;
            for (let field in fields) {
                if ((n == prev) && (prev > -1)) {
                    temp = fields[field];
                    fields[field] = fields[prev];
                    fields[prev] = temp;
                };
                prev = field;
            };
            this.fields = fields;
        }

        del(n) {
            let fields = {};
            let i = 0;
            for (let field in this.fields) {
                if (n != field) {
                    fields[i] = this.fields[field];
                    i++;
                };
            };
            if (i == 0) {
                fields[i] = [];
                for (let k in this.inputs_field) {
                    if (typeof fields[i][k] == 'undefined') {
                        fields[i][k] = '';
                    };
                };
            };
            this.fields = fields;
        }

        add(n) {
            let fields = {};
            let i = 0;
            for (let field in this.fields) {
                fields[i] = this.fields[field];
                i++;
                if (n == field) {
                    fields[i] = [];
                    for (let k in this.inputs_field) {
                        if (typeof fields[i][k] == 'undefined') {
                            fields[i][k] = '';
                        };
                    };
                    i++;
                };
            };
            this.fields = fields;
        }

        update_fields() {
            let fields = {};
            let i = 0;
            document.querySelectorAll('.AForm_field').forEach(function (field) {
                fields[i] = {};
                field.querySelectorAll('.field_value').forEach(function (item) {
                    if (item.value != '') {
                        let name = item.dataset.name;
                        if (item.type != 'checkbox') {
                            fields[i][name] = item.value;
                        } else {
                            if (item.checked) {
                                fields[i][name] = item.value;
                            };
                        };
                    }
                });
                i++;
            });

            this.fields = fields;
            this.el.value = JSON.stringify(fields);
        }

        selector_types(curtype) {
            let result = '';
            result += '<select class="field_value" data-name="type" style="min-width: 70px;" title="Type">';
            for (let k in this.types) {
                result += '<option value="' + k + '"';
                if (k == curtype) {
                    result += ' selected="selected" ';
                };
                result += '> ' + k + '</option > ';
            }
            result += '</select>';
            return result;
        }

        params(field) {
            let result = '<table>';
            let select_type = this.selector_types(field['type']);
            for (let k in this.inputs_field) {
                if (this.types[field['type']]['disable_fields'].indexOf(k) == -1) {
                    if (typeof field[k] == 'undefined') {
                        field[k] = '';
                    };
                    if ((k == 'required') || (k == 'strip_tags')) {
                        let checked = 'value=';
                        if (field[k] != '') {
                            checked = 'checked="checked" value='
                        }
                        result += '<tr>' + this.inputs_field[k].replace('value=', checked) + '</tr>';
                    } else {
                        result += '<tr>' + this.inputs_field[k].replace('%VALUE%', field[k]).replace('%SELECTTYPE%', select_type) + '</tr>';
                    }
                }
            };
            result += '</table>';
            return result;
        }

        inArray(needle, haystack) {
            for(let i in haystack) {
                if (haystack[i] == needle) return true;
            }
            return false;
        }

    }



    /*************************************************************** */

    let AformFields = new Aform(arParams.oInput);

    const tr = arParams.oInput.closest('tr');
    if (tr.querySelector('.bxcompprop-cont-table-l')) {
        tr.querySelector('.bxcompprop-cont-table-l').remove();
        tr.querySelector('.bxcompprop-cont-table-r').setAttribute('colspan', '2');;
    }

    draw();
    initUpdate();

    function draw() {
        if (document.querySelector('.AformFields')) {
            document.querySelector('.AformFields').remove();
        }
        arParams.oCont.appendChild(BX.create('DIV', {
            html: AformFields.show()
        }));
    }

    function initUpdate() {
        document.querySelectorAll('.AForm_field .field_value').forEach(function (item) {
            item.addEventListener(
                'change',
                function () {

                    AformFields.update_fields();
                    draw();
                    initUpdate();
                },
                false
             );
        });
        document.querySelectorAll('.AForm_field button.up').forEach(function (item) {
            item.addEventListener(
                'click',
                function (event) {
                    event.preventDefault();
                    let n = item.closest('.AForm_field').dataset.key;
                    AformFields.update_fields();
                    AformFields.up(n);
                    draw();
                    AformFields.update_fields();
                    initUpdate();
                },
                false
             );
        });
        document.querySelectorAll('.AForm_field button.down').forEach(function (item) {
            item.addEventListener(
                'click',
                function (event) {
                    event.preventDefault();
                    let n = item.closest('.AForm_field').dataset.key;
                    AformFields.update_fields();
                    AformFields.down(n);
                    draw();
                    AformFields.update_fields();
                    initUpdate();
                },
                false
             );
        });
        document.querySelectorAll('.AForm_field button.add').forEach(function (item) {
            item.addEventListener(
                'click',
                function (event) {
                    event.preventDefault();
                    let n = item.closest('.AForm_field').dataset.key;
                    AformFields.update_fields();
                    AformFields.add(n);
                    draw();
                    AformFields.update_fields();
                    initUpdate();
                },
                false
             );
        });
        document.querySelectorAll('.AForm_field button.del').forEach(function (item) {
            item.addEventListener(
                'click',
                function (event) {
                    event.preventDefault();
                    let n = item.closest('.AForm_field').dataset.key;
                    AformFields.update_fields();
                    AformFields.del(n);
                    draw();
                    AformFields.update_fields();
                    initUpdate();
                },
                false
             );
        });
    }

    /*********************************************************** */


}



