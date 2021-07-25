import React from 'react'
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import { withStyles } from '@material-ui/core/styles';
import CardActions from "@material-ui/core/es/CardActions/CardActions"
import Button from "@material-ui/core/Button"

const Styles = {
    header: {
        height: 20,
        marginBottom: 8
    },
    description: {
        maxHeight: 80,
        overflow: "auto",
    },
}

export default withStyles(Styles)(
    ({chosenTraitIds = [], traits = [], classes = {}, onRemove = () => {}}) => {
        const chosenTraitCards = []
        for (let i = chosenTraitIds.length; i > 0; i--) {
            let traitId = chosenTraitIds[i - 1]

            const trait = findChosenTrait(traitId, traits)
            trait.incompatibleTraitsDetailed = findChosenTraits(trait.incompatibleTraits, traits)
            let cost = "Nur per Trait erreichbar"
            if (trait.kosten !== null) {
                if (trait.kosten >= 0) {
                    cost = "Kostet: " + trait.kosten + " Erstellungspunkte"
                } else {
                    cost = "Erstattet: " + (trait.kosten * -1) + " Erstellungspunkte"
                }
            }
            chosenTraitCards.push(
                <Grid key={trait.id} item xs={12}>
                    <Card>
                        <CardHeader
                            className={classes.header}
                            title={trait.bezeichnung}
                            subheader={cost}
                        />
                        <CardContent className={classes.description}>
                            <Typography dangerouslySetInnerHTML={{__html: trait.beschreibung}} />
                        </CardContent>
                        <CardContent>
                            <Typography>
                                Nicht kompatibel mit:
                                {trait.incompatibleTraitsDetailed.map(inkTrait => inkTrait.bezeichnung).join(', ')}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="secondary" size={"small"} onClick={() => onRemove(trait.id * 1)}>Entfernen</Button>
                        </CardActions>
                    </Card>
                </Grid>
            )
        }
        return chosenTraitCards
    }
)


function findChosenTraits(chosenTraits = [], traits = []) {
    return traits.filter(trait => {
        return chosenTraits.filter(chosenTrait => {
            return chosenTrait === trait.id
        }).length > 0
    })
}
function findChosenTrait(chosenTrait, traits = []) {
    return traits.filter(trait => {
        return chosenTrait === trait.id
    })[0]
}