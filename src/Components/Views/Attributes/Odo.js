import React from 'react'
import { withStyles } from '@material-ui/core/styles';

import Typography from "@material-ui/core/Typography/Typography"
import Card from "@material-ui/core/Card/Card"
import CardContent from "@material-ui/core/CardContent/CardContent"
import CardActions from "@material-ui/core/CardActions/CardActions"
import Grid from "@material-ui/core/Grid"

import ChoiceButton from './../Helper/ChoiceButton'

const styles = {
    explanation: {
        margin: '10px 0',
    },
    odoCard: {
        width: 250
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

const Odo = ({chosenOdo, classes = {}, odo = [], onPick = () => {}}) => {
    return <div>
        <Typography variant={"h4"}>
            Odo
        </Typography>
        <Typography variant={"body2"}>
            Odo ist die Energie die Wesen für ihre magischen Fähigkeiten benötigen. Odo lässt
            sich nicht trainieren, wieviel man besitzt wird bei der Geburt entschieden und festgelegt.
            F ist der schlechteste, A der beste Wert.
        </Typography>
        <div>
            <Grid container spacing={8}>
                {odo.map((odoCategory, key) => {
                    let cardClasses = [classes.odoCard]
                    if (chosenOdo === odoCategory.id) {
                        cardClasses.push(classes.chosen)
                    }
                    let raised = chosenOdo === odoCategory.id
                    let actions
                    if (odoCategory.kosten !== null) {
                        actions = <ChoiceButton isActive={odoCategory.id === chosenOdo} onPick={() => onPick(odoCategory.id)}/>
                    }
                    return <Grid key={key} item>
                        <Card raised={raised} className={cardClasses.join(' ')}>
                            <CardContent className={classes.cardContent}>
                                <Typography variant={"h5"} className={classes.cardContent}>Kategorie: {odoCategory.kategorie}</Typography>
                                <Typography variant={"body1"} className={classes.cardContent}>{odoCategory.amount}</Typography>
                                {
                                    odoCategory.kosten !== null
                                        ? <Typography variant={"body1"} className={classes.cardContent}>Kostet: {odoCategory.kosten} Erstellungspunkte</Typography>
                                        : <Typography variant={"body1"} className={classes.cardContent}>Nur per Trait</Typography>
                                }
                            </CardContent>
                            <CardActions>
                                {actions}
                            </CardActions>
                        </Card>
                    </Grid>
                })}
            </Grid>
        </div>
    </div>
}

export default withStyles(styles)(Odo)