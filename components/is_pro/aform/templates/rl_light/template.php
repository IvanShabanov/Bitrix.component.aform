<? if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

echo '<div id="FRONTEND_FORM_'.$arResult['FORM_ID'].'" class="FRONTEND_FORM '.$arResult['CLASS'].'">';
if ($arResult['SUCCESS'] == 'Y') {
    echo '<div class="form_edem_light">';
    echo '<p class="succes_text">'.$arResult['SUCSESS_TEXT'].'</p>';
    echo '</div>';
} else {
    if (is_array($arResult['ERRORS'])) {
        foreach ($arResult['ERRORS'] as $error) {
            echo '<p class="error">'.$error.'</p>';
        };
    };
    echo  $arResult['FORM_START'];
    echo '<div class="form_edem_light">';
    echo '<div class="title_desc">';
    echo '<p class="title">'.$arResult['TITLE'].'</p>';
    echo '<p class="description">'.$arResult['DESCRIPTION'].'</p>';
    echo '</div>';

    echo '<div class="fields_place">';
    $havefile = false;
    foreach ($arResult['FIELDS'] as $field) {
        if ($field['type'] == 'file') {
            echo '<div class="field file">';
            echo '<div class="field__wrapper">';
            echo '<input type="file" name="'.$field['name'].'" id="'.$field['name'].$field['id'].'" accept="'.$field['accept'].'" class="field__file" multiple>';
            echo '<label class="field__file-wrapper" for="'.$field['name'].$field['id'].'">';
            echo '<div class="field__file-fake">'.$field['title'].'</div>';
            echo '<div class="field__file-button">Обзор</div>';
            echo '</label>';
            echo '</div>';
            echo '</div>';
            $havefile = true;
        } else {
            echo $field['html'];
        }
    };
    echo '</div>';
    echo '</div>';
    echo $arResult['FORM_END'];
}
echo '</div>';
?>