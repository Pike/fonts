/*global */

function create_test() {
    var val = $("textarea").val();
    var hex = /0x[0-9a-f]{4}/gi;
    var i, ii, j, code, char, hash = {}, codepoints;
    var cp, b, r, col;
    var loc = $("#locale").val();
    var fname = (function() {
        var d = new Date();
        var rv = (new Date()).toISOString().split('T')[0] + '-';
        rv += loc + '.textile';
        return rv;
    })();
    var outdoc = ['---\n',
        'layout: post\n',
        'title: ' + $("#language").val() + '\n',
        'locale: ' + loc + '\n'];
    while ((code = hex.exec(val))) {
        char = String.fromCharCode(Number(code));
        hash[char] = true;
    }
    codepoints = Object.keys(hash);
    codepoints.sort();
    outdoc.push('missing: ' + codepoints.length + '\n');
    outdoc.push('---\ntable(data).\n');
    outdoc.push('|A|A|\n');
    for (i=0, ii=codepoints.length; i < ii; ++i) {
        char = codepoints[i];
        outdoc.push('|!' + getImage(char) + '!|');
        outdoc.push(char);
        outdoc.push('|\n');
    }
    b = new Blob(outdoc, {type:'text/plain;charset=utf-8'});
    $("#download").attr({
        download: fname,
        href: window.URL.createObjectURL(b)
    });
}

var getImage = (function(){
    var canvas = document.createElement('canvas');
    canvas.width = 18;
    canvas.height = 18;
    var ctx = canvas.getContext('2d');
    ctx.font = '12px sans-serif';
    return function _getImage(codepoint) {
        ctx.clearRect(0, 0, 18, 18);
        ctx.fillText(codepoint, 3, 15);
        return canvas.toDataURL();
    };
})();

function enableButton() {
  $("button").removeAttr("disabled");
}

$(function() {
    $("#create_test").click(create_test);
    $("input").change(enableButton);
    $("textarea").change(enableButton);
    enableButton();
});
