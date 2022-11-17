import { Component } from "preact";

export default class ShootingGraph extends Component {
  constructor(props) {
    super(props);

    this.shootingMap = "/Commands/shooterMap";

    // this.rawTestValue = "{\"1.9\": [1500, 1000], \"2.5\": [2000, 1200], \"3.0\": [2400, 1550], \"3.7\": [2800, 1550], \"3.9\": [2900, 1550], \"4.45\": [3200, 1650], \"5.1\": [3900, 2000], \"6.0\": [4000, 2500], \"6.5\": [4000, 3000]}"

    this.svgHeightRange = { min: 40, max: 15 };
  }

  calculateShooterValueRange(shootingMap) {
    const sortedValues = Object.values(shootingMap)
      .flat()
      .sort((a, b) => a - b);

    return { min: sortedValues[0], max: sortedValues[sortedValues.length - 1] };
  }

  mapRange(input, min1, max1, min2, max2) {
    const t1 = (input - min1) / (max1 - min1);

    return min2 + t1 * (max2 - min2);
  }

  createDistanceColumn(shooterMap, distanceString, index, numberOfDistances) {
    const xValue = ((index + 1) / (numberOfDistances + 1)) * 110 - 10;

    const rearShooterHeight = this.mapRange(
      shooterMap[distanceString][0],
      this.shooterValueRange.min,
      this.shooterValueRange.max,
      this.svgHeightRange.min,
      this.svgHeightRange.max
    );

    const frontShooterHeight = this.mapRange(
      shooterMap[distanceString][1],
      this.shooterValueRange.min,
      this.shooterValueRange.max,
      this.svgHeightRange.min,
      this.svgHeightRange.max
    );

    return (
      <>
        <text
          x={xValue}
          y="5"
          textAnchor="middle"
          className="font-sans font-light text-svg-xxs"
        >
          {distanceString}
        </text>
        <text
          x={xValue}
          y={rearShooterHeight}
          textAnchor="middle"
          className="font-sans font-medium text-svg-xxs"
        >
          {shooterMap[distanceString][0]}
        </text>
        <text
          x={xValue}
          y={frontShooterHeight}
          textAnchor="middle"
          className="font-sans font-thin text-svg-xxs"
        >
          {shooterMap[distanceString][1]}
        </text>
      </>
    );
  }

  render() {
    try {
      this.value = JSON.parse(this.props.nt[this.shootingMap]);
    } catch (error) {
      this.value = {};
    }

    this.shooterValueRange = this.calculateShooterValueRange(this.value);

    let body = <></>;
    if (Object.keys(this.value).length == 0) {
      body = (
        <div className="w-full h-full loader flex justify-center space-x-1 anima">
          <div className="flex-auto special-gray w-5 h-5 rounded-md"></div>
          <div className="flex-auto special-gray w-5 h-5 rounded-md"></div>
          <div className="flex-auto special-gray w-5 h-5 rounded-md"></div>
          <div className="flex-auto special-gray w-5 h-5 rounded-md"></div>
        </div>
      );
    } else {
      body = (
        <svg viewBox="0 0 100 40">
          {Object.keys(this.value)
            .sort()
            .map((distanceString, i) =>
              this.createDistanceColumn(
                this.value,
                distanceString,
                i,
                Object.keys(this.value).length
              )
            )}
        </svg>
      );
    }

    return <div className="col-span-1 p-2 flex flex-row h-max">
      {body}
      </div>;
  }
}
