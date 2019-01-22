import React from 'react'
import { withStyles } from '@material-ui/core/styles';

import Typography from "@material-ui/core/Typography/Typography"
import Card from "@material-ui/core/Card/Card"
import CardContent from "@material-ui/core/CardContent/CardContent"
import CardActions from "@material-ui/core/CardActions/CardActions"
import Grid from "@material-ui/core/Grid"

import ChoiceButton from './../Helper/ChoiceButton'
import CardHeader from "@material-ui/core/CardHeader"

const styles = {
    explanation: {
        margin: '10px 0',
    },
    odoCard: {
        width: 310
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
            <Grid container spacing={16}>
                {odo.map((odoCategory, key) => {
                    let cardClasses = [classes.odoCard]
                    if (chosenOdo === odoCategory.id) {
                        cardClasses.push(classes.chosen)
                    }
                    let raised = chosenOdo === odoCategory.id
                    let actions
                    let cost = "Nur per Trait erreichbar"
                    if (odoCategory.kosten !== null) {
                        actions = <ChoiceButton isActive={odoCategory.id === chosenOdo} onPick={() => onPick(odoCategory.id)}/>
                        if (odoCategory.kosten >= 0) {
                            cost = "Kostet: " + odoCategory.kosten + " Erstellungspunkte"
                        } else {
                            cost = "Erstattet: " + (odoCategory.kosten * -1) + " Erstellungspunkte"
                        }
                    }
                    return <Grid key={key} item>
                        <Card raised={raised} className={cardClasses.join(' ')}>
                            <CardHeader
                                className={classes.header}
                                title={"Kategorie: " + odoCategory.kategorie}
                                subheader={cost}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography variant={"body1"} className={classes.cardContent}>{odoCategory.amount}</Typography>
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