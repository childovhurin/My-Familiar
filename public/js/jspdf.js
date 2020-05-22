var doc = new jsPDF();

$(function () {

    var specialElementHandlers = {
        '#editor': function (element, renderer) {
            return true;
        }
    };
    $('#pdf').click(function () {
        var doc = new jsPDF();
        doc.fromHTML(
            $('#target').html(), 15, 15,
            { 'width': 170, 'elementHandlers': specialElementHandlers },
            function () { doc.save('sample-file.pdf'); }
        );

    });
});