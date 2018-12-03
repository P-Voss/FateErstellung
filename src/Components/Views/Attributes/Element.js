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

const Element = ({chosenElement, classes = {}, elements = [], onPick = () => {}}) => {
    return <div>
        <Typography variant={"h4"}>
            Naturelement
        </Typography>
            <Typography variant={"body2"}>
                Das eigene Naturelement zeigt die natürliche Affinität eines Charakters an.
                Eines dieser vier muss gewählt werden. Für Magi gewinnt es zudem an
                Bedeutung, da alle Magien die das eigene Naturelement in sich tragen 10% weniger FP kosten.
            </Typography>
            <div>
                <Grid container spacing={8}>
                    {elements.map((element, key) => {
                        let cardClasses = [classes.card, classes.elementCard]
                        if (chosenElement === element.id) {
                            cardClasses.push(classes.chosen)
                        }
                        let raised = chosenElement === element.id
                        let actions = <ChoiceButton isActive={chosenElement === element.id} onPick={() => onPick(element.id)}/>
                        return <Grid key={key} item>
                            <Card raised={raised}  className={cardClasses.join(' ')}>
                                <CardContent className={classes.cardContent}>
                                    <Typography variant={"h5"} className={classes.cardContent}>{element.bezeichnung}</Typography>
                                    <Typography variant={"body1"} className={classes.cardContent}>{element.charakterisierung}</Typography>
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

export default withStyles(styles)(Element)