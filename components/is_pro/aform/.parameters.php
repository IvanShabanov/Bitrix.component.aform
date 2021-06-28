<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

use Bitrix\Main\Loader;

if(!Loader::includeModule("iblock"))
	return;

use Bitrix\Main\Localization\Loc;
Loc::loadMessages(__FILE__);

//IBLOCK_TYPE//
$arIBlockType = CIBlockParameters::GetIBlockTypes();

//IBLOCK_ID//
$arIBlock = array();
$rsIBlock = CIBlock::GetList(array("sort" => "asc"), array("TYPE" => $arCurrentValues["IBLOCK_TYPE"], "ACTIVE" => "Y"));
while($arr = $rsIBlock->Fetch()) {
	$arIBlock[$arr["ID"]] = "[".$arr["ID"]."] ".$arr["NAME"];
}


//Email events

$arFilter = array('LID' => LANGUAGE_ID);
$rsET = CEventType::GetList($arFilter);
while ($arET = $rsET->Fetch())
{
    if ($arET['EVENT_TYPE'] == 'sms') {
        $arSMS[$arET['EVENT_NAME']] = '['.$arET['EVENT_NAME'].'] '.$arET['NAME'];
    } else {
        $arEmail[$arET['EVENT_NAME']] = '['.$arET['EVENT_NAME'].'] '.$arET['NAME'];
    }

}


$arComponentParameters = array(
    "GROUPS" => array(
        "FIELDS" => array(
            "NAME" => GetMessage('FIELDS');
        ),
        "SAVE" => array(
           "NAME" => GetMessage('SAVE_TO_IBLOCK'),
        ),
        "EMAIL" => array(
           "NAME" => GetMessage('SEND_MAIL'),
        ),
        "SMS" => array(
            "NAME" => GetMessage('SEND_SMS')
        ),

    ),
	"PARAMETERS" => array(

        'FORM_ID' => Array(
			'NAME' => GetMessage("FORM_ID"),
			'TYPE' => 'STRING',
			'DEFAULT' => '',
			'PARENT' => 'BASE',
		),
        "TITLE" => Array(
            "PARENT" => "BASE",
            "NAME" => GetMessage('FORM_TITLE'),
            'DEFAULT' => '',
            "TYPE" => "STRING",
        ),
        'DESCRIPTION' => Array(
            "PARENT" => "BASE",
            "NAME" => GetMessage("FORM_DESCRIPTION"),
            'DEFAULT' => '',
            "TYPE" => "STRING",
        ),                     //Текст после заголовка формы
        'DESCRIPTION_AFTER' => Array(
            "PARENT" => "BASE",
            "NAME" => GetMessage("DESCRIPTION_AFTER_FORM"),
            'DEFAULT' => '',
            "TYPE" => "STRING",
        ),
        'SHOW_REQUERED_TEXT' => Array(
            "PARENT" => "BASE",
            "NAME" => GetMessage("SHOW_REQUERED_TEXT"),
            'DEFAULT' => 'Y',
            "TYPE" => "CHECKBOX",
        ),
        'SUCSESS_TEXT' => Array(
            "PARENT" => "BASE",
            "NAME" => GetMessage("SUCSESS_TEXT"),
            'DEFAULT' => 'Ваше сообщение отправлено',
            "TYPE" => "STRING",
        ),
        'RECAPTCHA_SITE_KEY' => Array(
            "PARENT" => "BASE",
            "NAME" => GetMessage("RECAPTCHA_SITE_KEY"),
            'DEFAULT' => '',
            "TYPE" => "STRING",
        ),
        'RECAPTCHA_SECRET_KEY' =>  Array(
            "PARENT" => "BASE",
            "NAME" => GetMessage("RECAPTCHA_SECRET_KEY"),
            'DEFAULT' => '',
            "TYPE" => "STRING",
        ),
        'FIELDS' => Array(
            "PARENT" => "FIELDS",
            "NAME" => GetMessage("FIELDS"),
            'DEFAULT' => json_encode(
                array(
                    array(
                        'type' => 'text',
                        'name' => 'name',
                        'title' => 'Ваше имя',
                    ),
                    array(
                        'type' => 'tel',
                        'name' => 'phone',
                        'title' => 'Номер телефона',
                        'required' => 'required'
                    )
                )
            ),
            "TYPE" => "CUSTOM",
            'JS_FILE' => '/local/components/axi/form/fields_settings.js',
            'JS_EVENT' => 'AForm_OnFieldsEdit',
            'JS_DATA' => '',
        ),
        "IBLOCK_ID" => Array(
			"PARENT" => "SAVE",
			"NAME" => GetMessage("IBLOCK"),
			"TYPE" => "LIST",
			"VALUES" => $arIBlock,
			"ADDITIONAL_VALUES" => "Y",
			"REFRESH" => "N",
			"MULTIPLE" => "N",
		),
        'NEW_ELEMENT' => Array(
            "PARENT" => "SAVE",
            "NAME" => GetMessage("PARAMS_NEW_ELEMENT"),
            'DEFAULT' => json_encode(
                array(
                    'NAME' => '%name% %phone%',
                    'PREVIEW_TEXT' => '%FIELDS%',
                    'DETAIL_TEXT' => '%FIELDS%',
                    'ACTIVE' => 'Y',
                )
            ),
            "TYPE" => "CUSTOM",
            'JS_FILE' => '/local/components/axi/form/el_settings.js',
            'JS_EVENT' => 'AForm_OnElEdit',
            'JS_DATA' => '',
        ),
        'EMAIL_EVENT' =>  Array(
            "PARENT" => "EMAIL",
            "NAME" => GetMessage("EMAIL_EVENT"),
			"TYPE" => "LIST",
			"VALUES" => $arEmail,
			"ADDITIONAL_VALUES" => "Y",
			"REFRESH" => "N",
			"MULTIPLE" => "N",
        ),
        'EMAIL_FIELDS' =>  Array(
            "PARENT" => "EMAIL",
            "NAME" => GetMessage("EMAIL_FIELDS"),
            'DEFAULT' => json_encode(
                array(                            //Поля этого события
                    'FIELDS' => '%FIELDS%',
                )
            ),
            "TYPE" => "CUSTOM",
            'JS_FILE' => '/local/components/axi/form/el_settings.js',
            'JS_EVENT' => 'AForm_OnElEdit',
            'JS_DATA' => '',
        ),
        'SMS_EVENT' =>  Array(
            "PARENT" => "SMS",
            "NAME" => GetMessage("SMS_EVENT"),
			"TYPE" => "LIST",
			"VALUES" => $arSMS,
			"ADDITIONAL_VALUES" => "Y",
			"REFRESH" => "N",
			"MULTIPLE" => "N",
        ),
        'SMS_FIELDS' =>  Array(
            "PARENT" => "SMS",
            "NAME" => GetMessage("SMS_FIELDS"),
            'DEFAULT' => json_encode(
                array(
                    'PHONE_NUMBER' => '%phone%',
                    'FIELDS' => '%FIELDS%',
                )
            ),
            "TYPE" => "CUSTOM",
            'JS_FILE' => '/local/components/axi/form/el_settings.js',
            'JS_EVENT' => 'AForm_OnElEdit',
            'JS_DATA' => '',
        ),
	)
);?>