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
    LuckCard: {
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

const Luck = ({chosenLuck, classes = {}, luck = [], onPick = () => {}}) => {
    return <div>
        <Typography variant={"h4"}>
            Glück
        </Typography>
        <div>
            <Grid container spacing={8}>
                {luck.map((luckCategory, key) => {
                    let cardClasses = [classes.LuckCard]
                    if (chosenLuck === luckCategory.id) {
                        cardClasses.push(classes.chosen)
                    }
                    let raised = chosenLuck === luckCategory.id
                    let actions
                    if (luckCategory.kosten !== null) {
                        actions = <ChoiceButton isActive={luckCategory.id === chosenLuck} onPick={() => onPick(luckCategory.id)}/>
                    }
                    return <Grid key={key} item>
                        <Card raised={raised}  key={key} className={cardClasses.join(' ')}>
                            <CardContent className={classes.cardContent}>
                                <Typography variant={"h5"} className={classes.cardContent}>Kategorie: {luckCategory.kategorie}</Typography>
                                <Typography variant={"body1"} className={classes.cardContent}>{luckCategory.amount}</Typography>
                                {
                                    luckCategory.kosten !== null
                                        ? <Typography variant={"body1"} className={classes.cardContent}>Kostet: {luckCategory.kosten} Erstellungspunkte</Typography>
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

export default withStyles(styles)(Luck)