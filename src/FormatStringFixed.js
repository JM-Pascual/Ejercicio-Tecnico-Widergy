// Función limpiada de errores

function FormatStringFixed(sentence) {
    let result = [];

    let sentence_all_caps = sentence.toUpperCase();

    let i = 0;
    let j = 0;
    while (i < sentence.length) {
        if (
            (sentence_all_caps.charCodeAt(i) >= 65 && sentence_all_caps.charCodeAt(i) <= 90) ||
            (sentence_all_caps.charCodeAt(i) >= 48 && sentence_all_caps.charCodeAt(i) <= 57) ||
            sentence_all_caps.charCodeAt(i) == 32 ||
            sentence_all_caps.charCodeAt(i) == 45 ||
            sentence_all_caps.charCodeAt(i) == 95
        ) {
            result[j] = sentence[i];
            j += 1;
        }
        i += 1;
    }

    if (result.length === 0) {
        return 'ERROR';
    }

    return result.join('');
}

module.exports = FormatStringFixed;