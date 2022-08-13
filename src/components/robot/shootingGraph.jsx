import { Component } from "preact"

export default class ShootingGraph extends Component {
    constructor(props) {
        super(props)

        this.shootingMap = "/Commands/shootingMap"

        // this.rawTestValue = "{\"3.0\": [2400, 1550], \"3.7\": [2800, 1550], \"3.9\": [2900, 1550], \"4.45\": [3200, 1650], \"5.1\": [3900, 2000]}"

        this.svgHeightRange = {min: 40, max: 15}
    }

    calculateShooterValueRange(shootingMap) {
        const sortedValues = Object.values(shootingMap).flat().sort()

        return {min: sortedValues[0], max: sortedValues[sortedValues.length - 1]}
    }

    mapRange(input, min1, max1, min2, max2) {
        const t1 = (input - min1) / (max1 - min1)
        
        return min2 + t1 * (max2 - min2)
    }

    createDistanceColumn(shooterMap, distanceString, index, numberOfDistances) {
        const xValue = ((index + 1) / (numberOfDistances + 1)) * 120 - 10

        const rearShooterHeight = this.mapRange(shooterMap[distanceString][0],
                                        this.shooterValueRange.min,
                                        this.shooterValueRange.max, 
                                        this.svgHeightRange.min, 
                                        this.svgHeightRange.max)

        const frontShooterHeight = this.mapRange(shooterMap[distanceString][1],
                                        this.shooterValueRange.min,
                                        this.shooterValueRange.max, 
                                        this.svgHeightRange.min, 
                                        this.svgHeightRange.max)

        return (
            <>
                <text x={xValue} y="5" textAnchor="middle" className="font-sans font-light text-svg-xs">{distanceString}</text>
                <text x={xValue} y={rearShooterHeight} textAnchor="middle" className="font-sans font-medium text-svg-s">{shooterMap[distanceString][0]}</text>
                <text x={xValue} y={frontShooterHeight} textAnchor="middle" className="font-sans font-thin text-svg-xs">{shooterMap[distanceString][1]}</text>
            </>
        )
    }

    render() {
        try {
            this.value = JSON.parse(this.props.nt[this.shootingMap])
        } catch (error) {
            this.value = {}
        }

        this.shooterValueRange = this.calculateShooterValueRange(this.value)

        return (
            <div className="col-span-1 p-2 flex flex-row h-max">
                <svg viewBox="0 0 100 40">
                    {Object.keys(this.value).sort().map((distanceString, i) => this.createDistanceColumn(this.value, distanceString, i, Object.keys(this.value).length))}
                </svg>
            </div>
        )
    }
}