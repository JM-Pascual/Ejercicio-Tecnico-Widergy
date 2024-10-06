// Funcion original sin modificaciones

function FormatString(sentence) {
    let result = [];

    sentence = sentence.toUpperCase();

    let i = 0;
    let j = 0;
    while (i < sentence.length) {
        if (
            (sentence.charCodeAt(i) >= 65 && sentence.charCodeAt(i) <= 90) ||
            (sentence.charCodeAt(i) >= 48 && sentence.charCodeAt(j) <= 57) ||
            //^sentence.charCodeAt(j) <= 57 --> Erróneo evaluar sobre el index j
            sentence.charCodeAt(i) == 32 ||
            sentence.charCodeAt(i) == 45
            //^
            //Falta el caracter ASCII '_' que corresponde al número 95 en decimal
        ) {
            sentence[j] = result[i];
            //^
            //Falla con: TypeError: Cannot assign to read only property '' of string 'foo'
            //Los strings son un tipo primitivo inmutable, únicamente se podría sustituir el valor completo, pero no de a caracteres.
            //^
            //Sumado al error previo, también la asignación de valores es inversa.
            //Nuestra lógica de double pointer apunta a que el valor de j sea el del index siguiente de nuestro string resultado.
            //i va a ser el index de nuestro string original.
            //Asignarle a sentence en j el valor de result en i no tiene sentido y abre la puerta a bugs ya que result puede no tener un index i en el primer lugar.
            //Por ejemplo cuando result está vacío, o cuando result tiene menos elementos que sentence.
            //^
            //Otro posible problema que podría surgir es que en la conversión a mayúsculas, se pierda la referencia a los valores originales que estaban en minúscula.
            //Es por eso que no es buena idea intentar modificar la oración original recibida por parámetro, sirve como referencia no mutada para consultar los index de interés.
            j += 1;
        }
        i += 1;
    }

    return result.join('');
    //^
    //No se cubre el caso donde el resultado final es un string vacío --> Se debería retornar 'ERROR'
}

module.exports = FormatString;