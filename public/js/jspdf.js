$(document).ready(function () {

    var specialElementHandlers = {
        "#editor": function (element, renderer) {
            return true;
        }
    };

    $("#cmd").click(function () {
        var doc = new jsPDF();

        doc.fromHTML(($("#target").html(), 15, 15,{
            "width": 170,
            "elementHandler": specialElementHandlers
        })

        doc.save("sample-file.pdf");
    })

});

var doc = new jsPDF({ orientation: 'landscape', unit: 'in', format: [4, 2] })
doc.text('landscape text!', 1, 1)
doc.save('landscape.pdf')