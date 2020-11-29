$(document).ready(function () {
    $(".delete-file").on('click', function () {
        idx = this.value;
        $.ajax({
            url: '/delete_file',
            type: 'POST',
            dataType: 'json',
            data: { id: idx },
            success: function (response) {
                if (response == 'True') {
                    $(".file-card#" + idx).remove();
                } else {
                    alert("Something went wrong");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown, "An error occured while deleting your file");
            }
        });
    })
});