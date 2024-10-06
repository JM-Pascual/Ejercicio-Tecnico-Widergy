// Otra posible versión utilizando RegEx

function FormatStringRegex(sentence) {
    let result = sentence.replace(/[^a-zA-Z0-9 _-]/g, '');

    if (result.length === 0) {
        return 'ERROR';
    }

    return result;
}

module.exports = FormatStringRegex;