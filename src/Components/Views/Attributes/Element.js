import React from 'react'
import { withStyles } from '@material-ui/core/styles';

import Typography from "@material-ui/core/Typography/Typography"
import Card from "@material-ui/core/Card/Card"
import CardActions from "@material-ui/core/CardActions/CardActions"
import Grid from "@material-ui/core/Grid"

import ChoiceButton from './../Helper/ChoiceButton'
import CardHeader from "@material-ui/core/CardHeader"

const styles = {
    explanation: {
        margin: '10px 0',
    },
    elementCard: {
        width: 160,
        height: '100%',
    },
    chosen: {
        background: 'linear-gradient(to right, #065274, #DE5952)',
        color: 'white'
    },
    cardContent: {
        lineHeight: "2em",
        color: 'inherit'
    },
    header: {
        height: 112,
    }
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
                <Grid container spacing={16}>
                    {elements.map((element, key) => {
                        let cardClasses = [classes.card, classes.elementCard]
                        if (chosenElement === element.id) {
                            cardClasses.push(classes.chosen)
                        }
                        let raised = chosenElement === element.id
                        let actions = <ChoiceButton isActive={chosenElement === element.id} onPick={() => onPick(element.id)}/>
                        return <Grid key={key} item>
                            <Card raised={raised}  className={cardClasses.join(' ')}>
                                <CardHeader
                                    className={classes.header}
                                    title={element.bezeichnung}
                                    subheader={element.charakterisierung}
                                />
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