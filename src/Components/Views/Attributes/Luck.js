import React from 'react'
import { withStyles } from '@material-ui/core/styles';

import Typography from "@material-ui/core/Typography/Typography"
import Card from "@material-ui/core/Card/Card"
import CardContent from "@material-ui/core/CardContent/CardContent"
import CardActions from "@material-ui/core/CardActions/CardActions"
import CardHeader from "@material-ui/core/CardHeader"
import Grid from "@material-ui/core/Grid"

import ChoiceButton from './../Helper/ChoiceButton'

const styles = {
    explanation: {
        margin: '10px 0',
    },
    LuckCard: {
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

const Luck = ({chosenLuck, classes = {}, luck = [], onPick = () => {}}) => {
    return <div>
        <Typography variant={"h4"}>
            Glück
        </Typography>
        <div>
            <Grid container spacing={16}>
                {luck.map((luckCategory, key) => {
                    let cardClasses = [classes.LuckCard]
                    if (chosenLuck === luckCategory.id * 1) {
                        cardClasses.push(classes.chosen)
                    }
                    let raised = chosenLuck === luckCategory.id * 1
                    let actions
                    let cost = "Nur per Trait erreichbar"
                    if (luckCategory.kosten !== null) {
                        actions = <ChoiceButton isActive={luckCategory.id * 1 === chosenLuck} onPick={() => onPick(luckCategory.id * 1)}/>
                        if (luckCategory.kosten >= 0) {
                            cost = "Kostet: " + luckCategory.kosten + " Erstellungspunkte"
                        } else {
                            cost = "Erstattet: " + (luckCategory.kosten * -1) + " Erstellungspunkte"
                        }
                    }
                    return <Grid key={key} item>
                        <Card raised={raised}  key={key} className={cardClasses.join(' ')}>
                            <CardHeader
                                className={classes.header}
                                title={"Kategorie: " + luckCategory.kategorie}
                                subheader={cost}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography variant={"body1"} className={classes.cardContent}>{luckCategory.amount}</Typography>
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