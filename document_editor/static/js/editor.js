$(document).ready(function () {
    DecoupledEditor
        .create(document.querySelector('.document-editor__editable'), {
            toolbar: ['heading', '|', 'bold', 'italic', 'underline', 'strikethrough', '|', 'fontFamily', 'fontSize', '|', "alignment:left", "alignment:center", "alignment:right", "alignment:justify", '|', 'bulletedList', 'numberedList', "insertTable"],
        })
        .then(editor => {
            const toolbarContainer = document.querySelector('.document-editor__toolbar');

            toolbarContainer.appendChild(editor.ui.view.toolbar.element);
            // console.log(Array.from(editor.ui.componentFactory.names()));
        })
        .catch(error => {
            console.error(error);
        });
});
