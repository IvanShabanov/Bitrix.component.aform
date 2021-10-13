<? if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

echo '<div id="FRONTEND_FORM_'.$arResult['FORM_ID'].'" class="FRONTEND_FORM '.$arResult['CLASS'].'">';

if ($arResult['SUCCESS'] == 'Y') {?>
   <div class="alert alert-success" role="alert"><?=$arResult['SUCSESS_TEXT']?></div>
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
    foreach ($arResult['FIELDS'] as $field) {?>
        <?if ($field['required'] != '') {
            $required = ' required = "required" ';
        } else {
            $required = '';
        }?>
        <?if (in_array($field['type'], array('hidden'))) {?>
            <input
                type="<?=$field['type']?>"
                id="<?=$field['id']?>"
                name="<?=$field['name']?>"
                value="<?=htmlspecialchars($field['value']);?>"
            >
        <?} else if (in_array($field['type'], array('html'))) {?>
            <?=$field['html']?>
        <?} else {?>
            <div class="form-group row">
            <?if (in_array($field['type'], array('text','date', 'tel', 'email', 'password', 'file'))) {?>
                <label for="<?=$field['id']?>" class="col-sm-2 col-form-label"><?=$field['title']?></label>
                <div class="col-sm-10">
                    <input
                        class="form-control"
                        type="<?=$field['type']?>"
                        id="<?=$field['id']?>"
                        name="<?=$field['name']?>"
                        placeholder="<?=htmlspecialchars($field['title']);?>"
                        value="<?=htmlspecialchars($field['posted_value']);?>"
                        <?=$field['extra']?>
                        <?=$required?>
                    >
                </div>
            <?} elseif (in_array($field['type'], array('textarea'))) {?>
                <label for="<?=$field['id']?>" class="col-sm-2 col-form-label"><?=$field['title']?></label>
                <div class="col-sm-10">
                    <textarea
                        class="form-control"
                        id="<?=$field['id']?>"
                        name="<?=$field['name']?>"
                        placeholder="<?=htmlspecialchars($field['title']);?>"
                        <?=$field['extra']?>
                        <?=$required?>
                    ><?=htmlspecialchars($field['posted_value']);?></textarea>
                </div>
            <?} elseif (in_array($field['type'], array('select'))) {?>
                <label for="<?=$field['id']?>" class="col-sm-2 col-form-label"><?=$field['title']?></label>
                <div class="col-sm-10">
                    <select
                        class="custom-select mr-sm-2"
                        id="<?=$field['id']?>"
                        name="<?=$field['name']?>"
                        <?=$field['extra']?>
                        <?=$required?>
                        >
                        <?foreach ($field['values'] as $val) {
                            $selected = '';
                            if ($field['posted_value'] == $val) {
                                $selected = ' selected="selected" ';
                            }?>
                            <option value="<?=$val?>"<?=$selected?>><?=$val?></option>';
                        <?}?>
                    </select>
                </div>
            <?} elseif (in_array($field['type'], array('checkbox'))) {?>
                <input
                    class="form-check-input"
                    type="checkbox"
                    name="<?=$field['name']?>"
                    id="<?=$field['id']?>"
                    <?=$field['extra']?>
                    value="<?=htmlspecialchars($field['value']);?>"
                    <?=$required?>
                >
                <label class="form-check-label" for="<?=$field['id']?>">
                    <?=$field['title']?>
                </label>
            <?} elseif (in_array($field['type'], array('submit'))) {?>
                <div class="col-sm-12">
                    <button
                        type="submit"
                        class="btn btn-primary"
                        <?=$field['extra']?>
                    >
                        <?=$field['title']?>
                    </button>
                </div>
            <?}?>
            </div>
        <?}?>
    <?}?>
    <?=$arResult['REQURED_TEXT_WARNING'];?>
    <p><?=$arResult['DESCRIPTION_AFTER']?></p>
    <?=$arResult['FORM_END'];?>
<?}?>
</div>
