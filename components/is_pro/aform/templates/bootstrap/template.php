<? if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

echo '<div id="FRONTEND_FORM_'.$arResult['FORM_ID'].'" class="FRONTEND_FORM '.$arResult['CLASS'].'">';

if ($arResult['SUCCESS'] == 'Y') {?>
   <div class="alert alert-success" role="alert"><?=$arResult['SUCSESS_TEXT']?></div>';
<?
} else {
    if (is_array($arResult['ERRORS'])) {
        foreach ($arResult['ERRORS'] as $error) {?>
            <div class="alert alert-danger" role="alert"><?=$error?></div>
        <?
        };
    };
    ?>
    <?=$arResult['FORM_START'];?>
    <h4><?=$arResult['TITLE'];?></h4>
    <p><?=$arResult['DESCRIPTION'];?></p>
    <?
    print_r_tree($arResult['FIELDS']);
    foreach ($arResult['FIELDS'] as $field) {?>
        <div class="form-group row">

        <?if (in_array($field['type'], array('text','date', 'tel', 'email', 'password'))) {?>
            <label for="<?=$field['id']?>" class="col-sm-2 col-form-label"><?=$field['title']?></label>
            <div class="col-sm-10">
                <input
                    class="form-control"
                    type="<?=$field['type']?>"
                    id="<?=$field['id']?>"
                    placeholder="<?=htmlspecialchars($field['title']);?>"
                    value="<?=htmlspecialchars($field['posted_value']);?>"
                >
            </div>
        <?} elseif (in_array($field['type'], array('textarea'))) {?>
            <label for="<?=$field['id']?>" class="col-sm-2 col-form-label"><?=$field['title']?></label>
            <div class="col-sm-12">
                <textarea
                    class="form-control"
                    id="<?=$field['id']?>"
                    placeholder="<?=htmlspecialchars($field['title']);?>"
                ><?=htmlspecialchars($field['posted_value']);?></textarea>
            </div>
        <?} elseif (in_array($field['type'], array('textarea'))) {?>
            <label for="<?=$field['id']?>" class="col-sm-2 col-form-label"><?=$field['title']?></label>
            <div class="col-sm-10">
                <textarea
                    class="form-control"
                    id="<?=$field['id']?>"
                    placeholder="<?=htmlspecialchars($field['title']);?>"
                ><?=htmlspecialchars($field['posted_value']);?></textarea>
            </div>
        <?} elseif (in_array($field['type'], array('submit'))) {?>
            <div class="col-sm-12">
                <button type="submit" class="btn btn-primary"><?=$field['title']?></button>
            </div>
        <?}?>
        </div>
    <?
    }
    echo  $arResult['REQURED_TEXT_WARNING'];
    echo  '<p>'.$arResult['DESCRIPTION_AFTER'].'</p>';
    echo  $arResult['FORM_END'];
}
echo '</div>'
?>