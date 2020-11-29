$(document).ready(function () {
    let ed;
    DecoupledEditor
        .create(document.querySelector('.document-editor__editable'), {
            toolbar: ['heading', '|', 'bold', 'italic', 'underline', 'strikethrough', '|', 'fontFamily', 'fontSize', '|', "alignment:left", "alignment:center", "alignment:right", "alignment:justify", '|', 'bulletedList', 'numberedList', "insertTable"],
        })
        .then(editor => {
            const toolbarContainer = document.querySelector('.document-editor__toolbar');
            toolbarContainer.appendChild(editor.ui.view.toolbar.element);

            editor.setData($('input#file_content').val());

            ed = editor;
        })
        .catch(error => {
            console.error(error);
        });

    $('#file-save-form').submit(function () {
        $('input#file_content').val(ed.getData());
    });
});
