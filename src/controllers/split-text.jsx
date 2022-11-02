export default function splitNewLines(text, X, Y) {
    const limit = 13

    let splitText = []
    while (text.length > limit) {
        var pos = text.substring(0, limit).lastIndexOf(' ');
        pos = pos <= 0 ? limit : pos;
        splitText.push(text.substring(0, pos));
        var i = text.indexOf(' ', pos) + 1;
        if (i < pos || i > pos + limit)
            i = pos;
        text = text.substring(i);
    }
    splitText.push(text);
    // https://stackoverflow.com/a/7624821 :)



    let output = []
    let nextY = Y
    for (let segment of splitText) {
        output.push(<text x={X} y={nextY} font-size="25px">{segment}</text>)
        nextY = nextY + 21
    }
    return output
}