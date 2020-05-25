function fotor() {
    html2canvas(document.getElementById('tela')).then(function(canvas) {
        document.body.appendChild(canvas);
    });
};