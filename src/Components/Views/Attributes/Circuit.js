import React from "react"
import {withStyles} from "@material-ui/core/styles"

import Typography from "@material-ui/core/Typography/Typography"

import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"

import ChoiceButton from "./../Helper/ChoiceButton"

const styles = {
    explanation: {
        margin: "10px 0",
    },
    panel: {
        width: "100%"
    },
    chosen: {
        background: "linear-gradient(to right, #065274, #DE5952)",
        color: "white"
    },
    cardContent: {
        lineHeight: "2em",
        color: "inherit"
    },
}

const Circuit = ({
                     chosenCircuit, classes = {}, circuits = [], onPick = () => {
    }
                 }) => {
    return <div>
        <Typography variant={"h4"}>
            Magic Circuit
        </Typography>
        <Typography variant={"body2"}>
            Magi besitzen sogenannte Magic Circuits im Körper mit denen sie das Odo ihres
            Körpers und Mana ihrer Umgebung kontrollieren und davon profitieren können.
        </Typography>
        <div>
            {circuits.map((circuitCategory, key) => {
                let panelClasses = [classes.panel]
                if (chosenCircuit === circuitCategory.id) {
                    panelClasses.push(classes.chosen)
                }
                let actions
                if (circuitCategory.kosten !== null) {
                    actions = <ChoiceButton
                        isActive={circuitCategory.id === chosenCircuit}
                        onPick={() => onPick(circuitCategory.id)}
                    />
                }
                return <ExpansionPanel key={key} style={{width: "100%"}} className={panelClasses.join(" ")}>
                    <ExpansionPanelSummary>
                        <Typography variant={"h5"} className={classes.cardContent}>
                            Kategorie: {circuitCategory.kategorie}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography variant={"body1"}
                                    className={classes.cardContent}>{circuitCategory.beschreibung}</Typography>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                        {
                            circuitCategory.kosten !== null
                                ? <Typography
                                    variant={"body1"}
                                    className={classes.cardContent}>
                                    Kostet: {circuitCategory.kosten} Erstellungspunkte
                                </Typography>
                                : <Typography variant={"body1"} className={classes.cardContent}>Nur per Trait</Typography>
                        }
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                        {actions}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            })}
        </div>
    </div>
}

export default withStyles(styles)(Circuit)