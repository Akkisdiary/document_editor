$(document).ready(function () {
    var $editorContainer = $('.editor-container');
    var $textarea = $('.custom-editor');
    var $backdrop = $('.backdrop');
    var $highlights = $('.highlights');
    var $popUps = $('.popUps');
    var words = [['banana', 'yellow'], ['strawberry', 'pink'], ['orange', 'orange'], ['blueberry', 'blue'], ['apple', 'red']];

    $('html').on('click', '.pupUpsCard', function (e) {
        e.stopPropagation();
    });

    $textarea.on({
        'input': handleInput,
        'scroll': handleScroll
    });

    function handleInput() {
        var text = $textarea.html();
        $("#accordion7").html("");
        $popUps.html('');
        $.each(words, function (i, w) {
            exp = new RegExp('(' + w[0] + ')', 'g');
            if (exp.test(text)) {
                text = applyHighlights(text, i, w[0]);
                alert(w);
            };
        });
        $highlights.html(text);
    }

    function applyHighlights(text, idx, word) {
        exp = new RegExp('(' + word + ')', 'g');
        text = text.replace(/\n$/g, '\n')
            .replace(exp, '<span id=' + idx + ' class="mouseover" style="background:' + words[idx][1] + ';">$1</span>');
        let popUp = `<div class="card pupUpsCard" id=popUp` + idx + ` style="position: fixed;display:none; width:20em; margin-left:2em;margin-top:2em;">
                        <div class="card-header" style="background:`+ words[idx][1] + `;">` + words[idx][0] + `</div>
                        <div class="card-body">
                            <p class="card-text">The word <strong>`+ words[idx][0] + `</strong> seems to be miswritten. You can replace it.</p>
                        </div>
                    </div>`;
        $popUps.append(popUp);
        return text;
    }

    function handleScroll() {
        var scrollTop = $textarea.scrollTop();
        $backdrop.scrollTop(scrollTop);
    }

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
                                    <button id="`+ i + `" type="button" class="btn btn-success shadow-success waves-effect waves-light m-1"
                                       style=" text-transform: none;" onclick="alertPressed(this)">` + data[0] + `</button>
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

    function alertPressed(elem) {
        var idx = elem.id;
        var alertId = elem.parentNode.parentNode.parentNode.parentNode.id;
        $('.historyViewCard').show()
        $(".historyViewCardScroller").append('<li class="list-group-item node-treeview1" data-nodeid="5"> <del>' + words[idx][0] + '</del>&nbsp&nbsp&nbsp->&nbsp&nbsp&nbsp' + words[idx][0] + '</li>');
        updateScroll();
        $('#' + alertId).remove();
        words.splice(idx, 1);
        handleInput();
    }

    function updateScroll() {
        var element = $(".historyViewCardScroller");
        element.scrollTop = element.scrollHeight;
    }

    $editorContainer.on('click', '.mouseover', showPopUp);

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


    $('html').on('click', function (e) {
        $('.pupUpsCard').hide();
    });

});

// Breadcrums
{
    // var div = $('.custom-editor');
    // var alertButton = $('.alertButton');
    // var words = ['banana', 'strawberry', 'orange', 'blueberry', 'apple'];
    // var wordCount = $('#word-count');
    // var typingTimer;
    // var doneTypingInterval = 2000;

    // div.keyup(function () {
    //    clearTimeout(typingTimer);
    //    if (div.html()) {
    //       typingTimer = setTimeout(doneTyping, doneTypingInterval);
    //    }
    // });

    // div.on('input', function () {
    //    var text = this.textContent.trim().replace(/\s+/g, ' ').split(' ');
    //    var count = 0;
    //    $.each(text, function (i, w) {
    //       if (w.length > 0) {
    //          count++;
    //       }
    //    });
    //    wordCount.html(count);
    // });

    // function doneTyping() {
    //    var elem = document.querySelector(".custom-editor");
    //    if (document.querySelector('span[style*="background-color: yellow;"]') !== null) {
    //       elem.innerHTML = elem.innerText || elem.textContent;
    //    }
    //    $("#accordion7").html("");
    //    $.each(words, function (i, word) {
    //       autoHighlight(word);
    //    });
    //    // setEndOfContenteditable(div[0]);
    // }

    // function autoHighlight(word) {
    //    if (window.find && window.getSelection) {
    //       var sel = window.getSelection();
    //       sel.collapse(document.body, 0);
    //       if (window.find(word)) {
    //          document.execCommand("HiliteColor", false, "yellow");
    //          sel.collapseToEnd();
    //          alert(word);
    //       }
    //    } else if (document.body.createTextRange) {
    //       console.log('false');
    //       var textRange = document.body.createTextRange();
    //       if (textRange.findText(text)) {
    //          textRange.execCommand("BackColor", false, "yellow");
    //          textRange.collapse(false);
    //          alert(word);
    //       }
    //    }
    // }

    // function check_gram() {
    //    $.each(words, function (i, word) {
    //       exp = new RegExp(word, 'gi');
    //       if (exp.test(div.html())) {
    //          markWords();
    //          setEndOfContenteditable(div[0]);
    //       }
    //    });
    // }

    // function markWords() {
    //    var html = div.html().replace(/<\/?bug>/gi, ''),
    //       text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '),
    //       exp;
    //    $("#accordion7").html("");
    //    $.each(words, function (i, word) {
    //       exp = new RegExp(word, 'gi');
    //       if (exp.test(html)) {
    //          html = html.replace(exp, function (m) {
    //             return '<span style="background-color: yellow;">' + m + '</span>';
    //          });
    //          alert(word);
    //       }
    //    });
    //    div.html(html);
    // }

    // function alert(data) {
    //    i = words.findIndex(function (w) {
    //       return w == data;
    //    });
    //    $("#accordion7").append(`
    //                         <div class="card mb-2 ">
    //                            <div class="card-header">
    //                               <button class="btn btn-link text-dark shadow-none collapsed" data-toggle="collapse"
    //                                  data-target="#collapse-`+ i + `" aria-expanded="false" aria-controls="collapse-` + i + `">
    //                                  <small style="text-transform: none; font-size: 100%;">`+ data + ` - found in dictionary</small>
    //                               </button>
    //                            </div>
    //                            <div id="collapse-`+ i + `" class="collapse" data-parent="#accordion7">
    //                               <div class="card-body">
    //                                 <div>
    //                                     <del>`+ data + `</del> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //                                     <button id="`+ i + `" type="button" class="btn btn-success shadow-success waves-effect waves-light m-1"
    //                                        style=" text-transform: none;" onclick="alertPressed(this)">` + data + `</button>
    //                                     <br><br>
    //                                     <p>The word <strong>`+ data + `</strong> seems to be miswritten. You can replace it.</p>
    //                                     <br>
    //                                     <a href="javascript:void();" data-toggle="modal" data-target="#defaultsizemodal"><i
    //                                           aria-hidden="true" class="fa fa-info-circle"></i>
    //                                        <span class="sr-only"></span>more info</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //                                     <a href="javascript:void();"><i aria-hidden="true" class="fa fa-book"></i> <span
    //                                           class="sr-only"></span> Add to Dictionary</a>
    //                                  </div>
    //                               </div>
    //                            </div>
    //                         </div>`);
    // }

    // function setEndOfContenteditable(contentEditableElement) {
    //    var range, selection;
    //    if (document.createRange) {
    //       range = document.createRange();
    //       range.selectNodeContents(contentEditableElement);
    //       range.collapse(false);
    //       selection = window.getSelection();
    //       selection.removeAllRanges();
    //       selection.addRange(range);
    //    }
    //    else if (document.selection) {
    //       range = document.body.createTextRange();
    //       range.moveToElementText(contentEditableElement);
    //       range.collapse(false);
    //       range.select();
    //    }
    // }

    // function alertPressed(elem) {
    //    idx = elem.id;
    //    $('#historyViewCard').show()
    //    $("#historyView").append('<li class="list-group-item node-treeview1" data-nodeid="5">' + words[idx] + '</li>');
    //    updateScroll();
    // }

    // function updateScroll() {
    //    var element = document.getElementById("historyViewCardScroller");
    //    element.scrollTop = element.scrollHeight;
    // }
}