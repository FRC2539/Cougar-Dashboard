import { Component } from "preact"
import DebugInput from "./debug-input"
import DebugCheckbox from "./debug-checkbox"
import TunableInput from "./tunable-input"

export default class ConfigurableAutos extends Component {
    constructor(props) {
        super(props)

        this.startPositionOptions = "/Autonomous/Start Position Options"
        this.startPosition = "/Autonomous/Start Position"
        this.waitDuration = "/Autonomous/Wait Duration"
        this.shouldClimb = "/Autonomous/Should Climb"
        this.gamePieceOptions = "/Autonomous/Game Piece Options"
        this.gamePieces = "/Autonomous/Game Pieces"
    }

    getGamePiecesButtonColorClass(value) {
        if(this.props.nt[this.gamePieces] == value) return "bg-orange-dark"
        
        return "bg-orange"
    }

    getStartPositionButtonColorClass(value) {
        if(this.props.nt[this.startPosition] == value) return "bg-orange-dark"
        
        return "bg-orange"
    }

    setCurrentGamePiece(newGamePiece) {
        this.props.putValueNT(this.gamePieces, newGamePiece)
    }

    setCurrentStartPosition(newStartPosition) {
        this.props.putValueNT(this.startPosition, newStartPosition)
    }

    toggleClimb(value) {
        this.props.putValueNT(this.shouldClimb, value)
    }

    getGamePieceOptionsButtonHTML() {
        if(this.props.nt[this.gamePieceOptions] == null || this.props.nt[this.gamePieceOptions] == undefined) return []
        
        return this.props.nt[this.gamePieceOptions].map((value) => {
            return <a onClick={() => this.setCurrentGamePiece(value)} class={this.getGamePiecesButtonColorClass(value) + " cursor-pointer p-1 text-center text-xs border border-gray flex justify-center items-center rounded-lg mx-2"}><p>{value}</p></a>
        })
    }

    getStartPositionOptionsButtonHTML() {
        if(this.props.nt[this.startPositionOptions] == null || this.props.nt[this.startPositionOptions] == undefined) return []
        
        return this.props.nt[this.startPositionOptions].map((value) => {
            return <a onClick={() => this.setCurrentStartPosition(value)} class={this.getStartPositionButtonColorClass(value) + " cursor-pointer p-1 text-center text-xs border border-gray flex justify-center items-center rounded-lg mx-2"}><p>{value}</p></a>
        })
    }

    render() {
        let gamePieceOptionsButtonHTML = this.getGamePieceOptionsButtonHTML()
        let startPositionOptionsButtonHTML = this.getStartPositionOptionsButtonHTML()

        return (
            <div className= "flex flex-col justify-between bg-orange rounded-lg mt-2 p-2">
                <p className="text-lg font-bold">Auto Configuration</p>

                <hr className="mb-1"></hr>

                <div className="w-full flex flex-row justify-between flex-wrap bg-orange rounded-lg">
                    <div>Wait</div>
                    <div>
                        <TunableInput type={"number"} title={"Autonomous"} key={this.waitDuration} value={0.0} ntkey={this.waitDuration} putValueNT={this.props.putValueNT} nt={this.props.nt} ntMap={this.props.ntMap}/>
                    </div>
                </div>

                <div className= "w-full flex flex-row justify-between flex-wrap bg-orange rounded-lg">
                    <div>Start</div>
                    <div className= "grid grid-cols-3 col-span-2 row-span-2 mt-2 ml-2">
                        {startPositionOptionsButtonHTML}
                    </div>
                </div>

                <div className= "w-full flex flex-row justify-between flex-wrap bg-orange rounded-lg">
                    <div>Game Pieces</div>
                    <div className= "grid grid-cols-5 col-span-2 row-span-2 mt-2 ml-2">
                        {gamePieceOptionsButtonHTML}
                    </div>
                </div>

                <div className= "w-full flex flex-row justify-between flex-wrap bg-orange rounded-lg">
                    <div>Climb</div>
                    <div>
                        <DebugCheckbox title={"Autonomous"} key={this.shouldClimb} value={true} ntkey={this.shouldClimb} putValueNT={this.props.putValueNT} nt={this.props.nt} ntMap={this.props.ntMap}/>
                    </div>
                </div>
            </div>
        )
    }
}