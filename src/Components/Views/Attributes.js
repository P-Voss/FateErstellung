import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';

import Element from './Attributes/Element'
import Odo from './Attributes/Odo'
import Luck from './Attributes/Luck'
import Circuit from './Attributes/Circuit'

import Typography from "@material-ui/core/Typography/Typography"

const styles = {
    explanation: {
        margin: '10px 0',
    },
    points: {
        textAlign: 'center',
        margin: '15px auto',
    },
    explBlock: {
        marginBottom: 20
    },
    attrBlock: {
        marginBottom: 25
    },
    elementCard: {
        width: 193
    },
    chosen: {
        background: 'linear-gradient(to right, #065274, #DE5952)',
        color: 'white'
    },
    cardContent: {
        lineHeight: "2em",
        color: 'inherit'
    },
};

class Attributes extends Component {
    changeElement(id) {
        this.props.handleElementChange(id)
    }
    changeOdo(id) {
        this.props.handleOdoChange(id)
    }
    changeLuck(id) {
        this.props.handleLuckChange(id)
    }
    changeCircuit(id) {
        this.props.handleCircuitChange(id)
    }
    render() {
        const {classes, attributesToChoose, choices, creationPoints, chosenClass} = this.props
        const {elements, odo, luck, circuits} = attributesToChoose
        let circuitElement
        if (chosenClass === 1) {
            circuitElement = <div className={classes.attrBlock}>
                    <Circuit circuits={circuits} chosenCircuit={choices.circuit} onPick={circuitId => this.changeCircuit(circuitId)}/>
                </div>
        }
        return <div>
            <div className={classes.explBlock}>
                <Typography className={classes.explanation} variant="body1">
                    In diesem Schritt müsst ihr euch für die spirituellen Eigenschaften eures Charakters entscheiden.
                    Dabei wählt ihr die Stufe eures Odos, eures Glücks und eures Naturelementes aus.
                    Als Magi müsst ihr zudem die Stufe eures Magic Circuits festlegen.
                </Typography>
                <Typography className={classes.explanation} variant="body1">
                    Beachtet dass euch 30 Punkte für die Erstellung eures Charakters zur Verfügung stehen, die nicht nur
                    für die spirituellen Eigenschaften, sondern auch eure Traits sowie eure Unterklassen ausreichen müssen.
                    Falls euch die Punkte später ausgehen, könnt ihr jederzeit zu dieser Seite zurückkehren und eure Punkte umverteilen.
                </Typography>
                <Typography className={[classes.explanation, classes.points].join(' ')} variant="h4">
                    Verfügbare Punkte: {creationPoints}
                </Typography>
            </div>
            <div className={classes.attrBlock}>
                <Element elements={elements} chosenElement={choices.element} onPick={elementId => this.changeElement(elementId)}/>
            </div>
            <div className={classes.attrBlock}>
                <Odo odo={odo} chosenOdo={choices.odo} onPick={odoId => this.changeOdo(odoId)}/>
            </div>
            <div className={classes.attrBlock}>
                <Luck luck={luck} chosenLuck={choices.luck} onPick={luckId => this.changeLuck(luckId)}/>
            </div>
            {circuitElement}
        </div>
    }
}
export default withStyles(styles)(Attributes)