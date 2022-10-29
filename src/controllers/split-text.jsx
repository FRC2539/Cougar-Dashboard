export default function splitNewLines (text, X, Y) {
    const splitText = text.match(/.{1,13}/g)
    let output = []
    let nextY = Y

    for (let segment of splitText) {
        output.push(<text x={X} y={nextY} font-size="larger">{segment}</text>)
        nextY = nextY + 21
    }
    return output
}