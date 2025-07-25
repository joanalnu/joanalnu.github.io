document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.querySelector('.language-select');
    const validPaths = [
        'sites/en.html', 'sites/es.html', 'sites/ca.html', 'sites/de.html',
        'sites/fr.html', 'sites/it.html', 'sites/pt.html', 'sites/zh.html',
        'sites/ja.html', 'sites/ko.html', 'sites/ar.html', 'sites/ru.html',
        'sites/hi.html', 'sites/bn.html', 'sites/tr.html', 'sites/vi.html',
        'sites/th.html', 'sites/fa.html', 'sites/ms.html', 'sites/tl.html',
        'sites/sw.html', 'sites/pl.html', 'sites/uk.html'
    ];

    languageSelect.addEventListener('change', function() {
        const selectedValue = this.value;
        if (validPaths.includes(selectedValue)) {
            window.location.href = selectedValue;
        }
    });
});