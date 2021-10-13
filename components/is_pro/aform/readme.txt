Компонент форм
Автор: Шабанов Иван https://github.com/IvanShabanov

###################################
#  Возможности                    #
###################################


Форма по умолчанию использует простую невидимую каптчу ( https://github.com/IvanShabanov/EasyNoCaptcha )
Можно подключить Google Recaptcha ( https://www.google.com/recaptcha/about/ )
Поля формы создаются и настраиваются в параметрах конпонента *
Сохранять данные в инфоблоке *
Отправлять по почте, использую почтовые события *
Отправлять по смс, использую смс события *
Возможность сделать свою проверку входных данных. **
Возможность сделать свою отправку/сохранение/анализ данных после отправки. **
* - все параметры настраиваются либо массивом через код, или в Эмитаже (будет json)
** - надо создавать свои функции в init.php

В настроках отправки/сохранения можно подставлять данные отправленые пользователем
Например %name% - замениться значением из поля name, отправленным пользователем
Есть спецальные слова для подставновки
%FIELDS% - это html текст со всеми данными из формы
%MESSAGE% - аналог %FIELDS%


###################################
#  Параметры                      #
###################################

FORM_ID                 Идентификатор формы - необязательный параметр,
                        если  не указан, то формируется автоматически

TITLE                   Заголовок формы

DESCRIPTION             Описание формы - текст послу заголовка и до полей

DESCRIPTION_AFTER       Текст после формы

SHOW_REQUERED_TEXT      Y/N -  показывать ли текст об эбязательных полях после формы

RECAPTCHA_SITE_KEY      Google Recaptcha SITE_KEY

RECAPTCHA_SECRET_KEY    Google Recaptcha SECRET_KEY

FIELDS                  Массив полей формы
                            каждое поле массив
                                type            Тип поля (text, date, tel, email, password, textarea, checkbox, select, file, hidden, html, submit)
                                name            Аттрибут name для поля
                                title           Наименование-подпись к полю
                                extra           Допольнительные аттрибуты к тегу
                                before          Html текст перед полем
                                after           Html текст после поля
                                html            Если тип поля html - по бедт подставлен этот html текст
                                values          Если тип поля select - то тут массив значений
                                value           Значение поля для типов hidden и checkbox
                                default_value   Значение по умолчанию
                                required        Обязательное ли поле
                                strip_tags      Удалять ли теги из данных введенных пользователем

SUCSESS_TEXT            Текст показываемый при успешном отправлении формы

IBLOCK_ID               ID Инфоблока куда будет сохраняться данные с формы

NEW_ELEMENT             Массив для создания нового элемента в инфоблоке
                        по сути это параметр arFields для метода CIBlockElement::Add
                        по умолчанию он такой
                            array(
                                "MODIFIED_BY"    => 1,
                                "IBLOCK_SECTION_ID" => false,
                                "IBLOCK_ID"      => $arParams['IBLOCK_ID'],
                                "NAME"           => 'FORM RESULT '.date('Y-m-d H:i:s'),
                                "ACTIVE"         => "Y",
                                'PREVIEW_TEXT'   => '%FIELDS%',
                                'DETAIL_TEXT'    => '%FIELDS%',
                            );

EMAIL_EVENT             Тип события отправки почтовые

EMAIL_FIELDS            Параметры события отправки почта
                        по сути параметр fields для метода  CEvent::SendImmediate

SMS_EVENT               Тип события отправки смс

SMS_FIELDS              Параметры события отправки СМС
                        по сути параметр fields для метода  \Bitrix\Main\Sms\Event

CUSTOM_FUNCTION_VALIDATION
                        Наименованием функция проверки отправленых данных.
                        Должна вернуть массив ошибок или ничего.

CUSTOM_FUNCTION_SAVE    Наименованием функции которая выполниться
                        после успешной отправки данных




###################################
# Пример вызова                   #
###################################

$APPLICATION->IncludeComponent(
	"is_pro:aform",
	"",
    array (
        'FORM_ID' => '',                                    //ID формы, Лучше оставьте пустым (само сгенериться)
        'TITLE' => 'Form Title',                            //Заголовок формы
        'DESCRIPTION' => 'DESCRIPTION',                     //Текст после заголовка формы
        'DESCRIPTION_AFTER' => 'DESCRIPTION_AFTER',         //Текст после заголовка формы
        'SHOW_REQUERED_TEXT' => 'Y',                        //Показывать сообщение об обязательных полях
        'RECAPTCHA_SITE_KEY' => '',                         //Если хотите использовать рекаптчу заполните
        'RECAPTCHA_SECRET_KEY' => '',
        'FIELDS' => array (                                 //Поля формы
                        array(
                            'type' => 'html',
                            'html' => '<img src="people.png">',
                        ),
                        array(
                            'type' => 'text',
                            'name' => 'name',
                            'title' => 'Ваше имя',
                            'before' => '<img src="people.png">',
                            'after' => '<img src="people.png">',
                        ),
                        array(
                            'type' => 'text',
                            'name' => 'phone',
                            'title' => 'Номер телефона',
                            'required' => 'required'
                        ),
                        array(
                            'type' => 'select',
                            'name' => 'typeoforder',
                            'title' => 'Тип заявки',
                            'values' => array('Покупка', 'Письмо'),
                        ),
                        array(
                            'type' => 'text',
                            'name' => 'extra',
                            'title' => 'Тип заявки',
                            'default_value' => 'Письмо',
                            'extra' => 'readonly="readonly"',
                        ),
                        array(
                            'type' => 'textarea',
                            'name' => 'fulltext',
                            'title' => 'Сообщение',
                            'strip_tags' => 'N',
                        ),
                        array(
                            'type' => 'checkbox',
                            'name' => 'agriements',
                            'title' => 'Согласен на обработку персональных данных',
                            'required' => 'required'
                        ),
                    ),
        'SUCSESS_TEXT' => 'Ваше сообщение отправлено',                  //Текст показываемый пользователю при успешной отправке
        'IBLOCK_ID' => '',                      //IBLOCK Куда сохраниться информация с формы
        'NEW_ELEMENT' => array(                 //Массив Нового элемента в инфоблоке (в каком виде будет сохраняться информация)
            'NAME' => '%name% %phone%',
            'PREVIEW_TEXT' => '%FIELDS%',
            'DETAIL_TEXT' => '%FIELDS%',
            'ACTIVE' => 'Y',
        ),
        'EMAIL_EVENT' => 'FORM_send',      //Событие отправки email сообщения
        'EMAIL_FIELDS' => array(                            //Поля этого события
            'FIELDS' => '%FIELDS%',
        ),
        'SMS_EVENT' => 'FORM_send',      //Событие отправки SMS сообщения
        'SMS_FIELDS' => array(
            'PHONE_NUMBER' => '%phone%',                       //Поля этого события
            'FIELDS' => '%FIELDS%',
        ),
        'CUSTOM_FUNCTION_VALIDATION' => 'CheckMyData',  //Имя PHP функции, для проверки данных (должна вернуть массив ошибок)
        'CUSTOM_FUNCTION_SAVE' => 'SaveMyData',   //Имя PHP функции, которая вызовиться после успешной отправки
        'DEBUG' => 'N',
    )
);

###################################
# Пример кастомных функций проверки и отправки
###################################

function CheckMyData($arResult) {
    $result = array();
    foreach ($arResult['FIELDS'] as $field) {
        if ($field['posted_value'] == '') {
            $result[$field['name']] = 'Поле '.$field['title']. ' не заполнено'.
        };
    }
    return $result;
}


function SaveMyData($arResult) {
    file_put_contents('result.txt'. print_r($arResult, true), FILE_APPEND);
}

