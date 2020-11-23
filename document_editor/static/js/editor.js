$(document).ready(function () {
    // e = $('.document-editor__editable');
    // e.sortable();
    // e.sortable('disable')

    DecoupledEditor
        .create(document.querySelector('.document-editor__editable'))
        .then(editor => {
            const toolbarContainer = document.querySelector('.document-editor__toolbar');

            toolbarContainer.appendChild(editor.ui.view.toolbar.element);
        })
        .catch(error => {
            console.error(error);
        });

    // $('button#make-content-sortable').click(function () {
    //     var t = $(this);
    //     console.log('toggel');

    //     if (t.hasClass('active')) {
    //         e.sortable('disable');
    //         e.enableSelection();
    //     } else {
    //         e.sortable('enable');
    //         e.disableSelection()
    //     }
    //     t.toggleClass('active');
    // });
});
