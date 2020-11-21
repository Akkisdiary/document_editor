$(document).ready(function () {

    $("#file-upload-btn").change(function () {
        var fd = new FormData();
        fd.append('file', this.files[0]);

        $.ajax({
            url: '/handle_files',
            type: 'POST',
            data: fd,
            contentType: false,
            processData: false,
            beforeSend: function () {
                $('.file-upload-spinner').show();
            },
            success: function (response) {
                $('.custom-editor').html(response.contents).trigger('input');
                $('.file-upload-spinner').hide();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown + ": An Error Occurred");
                $('.file-upload-spinner').hide();
            }
        });

    });

    $('#submit-editor-content').click(function () {
        $('.editor-content-preview').html($('.custom-editor').html());
    });

    $("#file-save-form").submit(function () {
        $('input#file_content').val($('.custom-editor').html());
    });

    $('.delete-file').click(function () {
        var idx = this.id;
        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this  file!",
            icon: "warning",
            buttons: true,
            showCancelButton: true,
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: '/delete_file',
                    type: 'POST',
                    dataType: 'json',
                    data: { id: idx },
                    success: function (response) {
                        if (response == 'True') {
                            $(".file-card#" + idx).remove();
                            Swal.fire("Your file has been deleted!", {
                                icon: "success",
                            });
                        } else {
                            Swal.fire("Something went wrong", {
                                icon: "error",
                            });
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        Swal.fire(errorThrown, "An error occured while deleting your file", {
                            icon: "error",
                        });
                    }
                });
            }
        });

    });

    // $('.download-filexxx').click(function () {
    //     var idx = this.id;
    //     $.ajax({
    //         url: '/download_file',
    //         type: 'POST',
    //         data: { id: idx },
    //         beforeSend: function () {
    //             Swal.fire({
    //                 title: 'Preparing your writing project',
    //             });
    //             Swal.showLoading();
    //         },
    //         success: function (response) {
    //             if (response) {
    //                 console.log(response);
    //                 Swal.fire({
    //                     title: "Download started",
    //                     icon: "success",
    //                 });
    //                 return response
    //             } else {
    //                 Swal.fire("Something went wrong", {
    //                     icon: "error",
    //                 });
    //             }
    //         },
    //         error: function (XMLHttpRequest, textStatus, errorThrown) {
    //             Swal.fire(errorThrown, "An error occured while downloading your file", {
    //                 icon: "error",
    //             });
    //         }
    //     });
    // });
}); 