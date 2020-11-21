$(document).ready(function () {
    var $textarea = $('.custom-editor');
    var $popUps = $('.popUps');
    var words = [['banana', 'yellow'], ['strawberry', 'pink'], ['orange', 'orange'], ['blueberry', 'blue'], ['apple', 'red'], ['grape', 'yellow'], ['zPomegranate', 'pink'], ['mango', 'orange'], ['Blueberries', 'blue'], ['cherry', 'red']];

    $textarea.on({
        'input': handleInput,
        'scroll': handleScroll
    });

    function handleInput() {
        var text = $textarea.html();
        $("#accordion7").html("");
        $popUps.html('');

        updateCount();

        $.each(words, function (i, w) {
            exp = new RegExp('(' + w[0] + ')', 'g');
            if (exp.test(text)) {
                text = applyHighlights(text, i, w[0]);
                alert(w);
            };
        });
        $('.highlights').html(text);
    }

    function updateCount() {
        var count = 0;
        $.each($textarea.text().trim().replace(/\s+/g, ' ').split(' '), function (i, w) {
            if (w.length > 0) {
                count++;
            }
        });
        $('#word-count').html(count);
    }

    function applyHighlights(text, idx, word) {
        exp = new RegExp('(' + word + ')', 'gi');
        text = text.replace(/\n$/g, '\n')
            .replace(exp, '<span id=' + idx + ' class="mouseover" style="background:' + words[idx][1] + ';">$1</span>');
        let popUp = `<div class="card pupUpsCard" id=popUp` + idx + ` style="position: fixed;display:none; width:20em; margin-left:2em;margin-top:2em;">
                        <div class="card-header" id="` + idx + `" style="border-bottom: 4px solid ` + words[idx][1] + `;">` + words[idx][0] + `</div>
                        <div class="card-body">
                            <p class="card-text">The word <strong>`+ words[idx][0] + `</strong> seems to be miswritten. You can replace it.</p>
                        </div>
                    </div>`;
        $popUps.append(popUp);
        return text;
    }

    function handleScroll() {
        var scrollTop = $textarea.scrollTop();
        $('.backdrop').scrollTop(scrollTop);
    }

    function updateScroll() {
        var element = $(".historyViewCardScroller");
        element.scrollTop = element.scrollHeight;
    }

    $popUps.on('click', '.card-header', function (e) {
        e.stopPropagation();
        $('.historyViewCard').show()
        $(".historyViewCardScroller .simplebar-content").append('<li class="list-group-item node-treeview1" data-nodeid="5"> <del>' + words[this.id][0] + '</del>&nbsp&nbsp&nbsp->&nbsp&nbsp&nbsp' + words[this.id][0] + '</li>');
        words.splice(this.id, 1);
        handleInput();
        updateScroll();
    });

    function alert(data) {
        i = words.findIndex(function (w) {
            return w == data;
        });
        $("#accordion7").append(`
                        <div id=`+ data[0] + i + ` class="card mb-2 ">
                           <div class="card-header">
                              <button class="btn btn-link text-dark shadow-none collapsed" data-toggle="collapse"
                                 data-target="#collapse-`+ i + `" aria-expanded="false" aria-controls="collapse-` + i + `">
                                 <small style="text-transform: none; font-size: 100%;">`+ data[0] + ` - found in dictionary</small>
                              </button>
                           </div>
                           <div id="collapse-`+ i + `" class="collapse" data-parent="#accordion7">
                              <div class="card-body">
                                <div>
                                    <del>`+ data[0] + `</del> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button id="`+ i + `" type="button" class="replacer btn btn-success shadow-success waves-effect waves-light m-1"
                                       style=" text-transform: none;">` + data[0] + `</button>
                                    <br><br>
                                    <p>The word <strong>`+ data[0] + `</strong> seems to be miswritten. You can replace it.</p>
                                    <br>
                                    <a href="javascript:void();" data-toggle="modal" data-target="#defaultsizemodal"><i
                                          aria-hidden="true" class="fa fa-info-circle"></i>
                                       <span class="sr-only"></span>more info</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <a href="javascript:void();"><i aria-hidden="true" class="fa fa-book"></i> <span
                                          class="sr-only"></span> Add to Dictionary</a>
                                 </div>
                              </div>
                           </div>
                        </div>`);
    }

    $("#accordion7").on('click', 'button.replacer', function () {
        var idx = this.id;
        $('.historyViewCard').show()
        $(".historyViewCardScroller .simplebar-content").append('<li class="list-group-item node-treeview1" data-nodeid="5"> <del>' + words[idx][0] + '</del>&nbsp&nbsp&nbsp->&nbsp&nbsp&nbsp' + words[idx][0] + '</li>');
        words.splice(idx, 1);
        updateScroll();
        handleInput();
    });

    $('.editor-container').on('click', '.mouseover', showPopUp);

    function showPopUp(event) {
        $('.pupUpsCard').hide();
        var left = event.clientX + "px";
        var top = event.clientY + "px";
        event.stopPropagation();
        var divToShow = document.getElementById('popUp' + this.id);
        divToShow.style.left = left;
        divToShow.style.top = top;
        divToShow.style.zIndex = 980;
        $('#popUp' + this.id).toggle();
    }

    $('#clear-editor').on('click', function () {
        $textarea.html("");
        handleInput();
    });

    $('html').on('click', '.pupUpsCard', function (e) {
        e.stopPropagation();
    });

    $('html').on('click', function (e) {
        $('.pupUpsCard').hide();
    });
});