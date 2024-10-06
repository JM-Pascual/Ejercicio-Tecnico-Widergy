const FormatStringRegex = require('../src/FormatStringRegex');

test('A special sentence is being modified', () => {
    let sentence = 'Hello, World!';
    let result = FormatStringRegex(sentence);
    expect(result).not.toBe('Hello, World!');
});

test('Hello world example', () => {
    let sentence = 'Hello, World!';
    let result = FormatStringRegex(sentence);
    expect(result).toBe('Hello World');
});

test('Example case N°1', () => {
    let sentence = 'Lavese las manos, por favor!';
    let result = FormatStringRegex(sentence);
    expect(result).toBe('Lavese las manos por favor');
});

test('Example case N°2', () => {
    let sentence = 'Consultar al #0800-999-100.';
    let result = FormatStringRegex(sentence);
    expect(result).toBe('Consultar al 0800-999-100');
});

test('Mixed string case --> Numbers, Letters and forbidden and non forbidden special chars', () => {
    let sentence = '¡¡H3-ll0,,, _W0-rLd!! '
    let result = FormatStringRegex(sentence);
    expect(result).toBe('H3-ll0 _W0-rLd ');
});

test('Error case --> All special chars', () => {
    let sentence = '.,:;{}[]()';
    let result = FormatStringRegex(sentence);
    expect(result).toBe('ERROR');
});

test('Error case --> Empty string', () => {
    let sentence = '';
    let result = FormatStringRegex(sentence);
    expect(result).toBe('ERROR');
});

test('Error case --> All special chars and a space', () => {
    let sentence = '.,:;{}[]() ';
    let result = FormatStringRegex(sentence);
    expect(result).toBe(' ');
});

test('Error case --> All special but not forbidden chars', () => {
    let sentence = '- _';
    let result = FormatStringRegex(sentence);
    expect(result).toBe('- _');
});