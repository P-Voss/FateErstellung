import React, {Component} from 'react'
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { withStyles } from '@material-ui/core/styles';

import Trait, {STATUS_CHOSEN, STATUS_ENABLED, STATUS_DISABLED, STATUS_PREVIEW} from './Traits/Trait'
import ChosenTraits from './Traits/ChosenTraits'

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
    traitContainer: {
        overflowY: 'auto',
        height: 500,
    }
};
class Traits extends Component {
    constructor(props) {
        super(props)
        let disablingTraits = this.props.traits.filter(trait => trait.incompatibleTraits.length > 0)
        this.state = {
            disabledTraits: [],
            previewDisabledTraits: [],
            disablingTraits: disablingTraits,
        }
        this.onRemove = this.onRemove.bind(this)
    }
    onPick(traitId) {
        if (
            this.props.chosenTraits.length < 5
            && this.state.disabledTraits.indexOf(traitId) === -1
        )
        {
            this.props.onPick(traitId)
        }
    }
    onRemove(traitId) {
        this.props.onRemove(traitId)
    }
    render() {
        const {traits, chosenTraits, creationPoints, classes} = this.props
        const disabledTraitIds = findDisabledTraitIds(chosenTraits, traits)
        return <div>
            <div className={classes.explBlock}>
                <Typography className={classes.explanation} variant="body1">
                    In diesem Schritt dürft ihr euch für 5 Traits entscheiden.
                    Wählt sie am besten nach dem aus, was zu eurem Charakter passen würde, anstatt zu versuchen eine
                    möglichst effektive Kombination zu erhalten (nicht das daran etwas verkehrt wäre).
                </Typography>
                <Typography className={[classes.explanation, classes.points].join(' ')} variant="h4">
                    Verfügbare Punkte: {creationPoints}
                </Typography>
            </div>
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={8}>
                        <Typography variant={"title"}>Ausgewählte Traits</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant={"title"}>Verfügbare Traits</Typography>
                    </Grid>
                    <Grid item sm={8}>
                        <Grid container spacing={8} className={classes.traitContainer}>
                            <ChosenTraits
                                traits={traits}
                                chosenTraitIds={chosenTraits}
                                onRemove={this.onRemove}
                            />
                        </Grid>
                    </Grid>
                    <Grid item sm={4}>
                        <Grid container spacing={16} className={classes.traitContainer}>
                            {traits.map((trait, key) => {
                                let status = STATUS_ENABLED
                                if (disabledTraitIds.indexOf(trait.id * 1) !== -1) {
                                    status = STATUS_DISABLED
                                }
                                if (this.state.previewDisabledTraits.filter(prevTrait => prevTrait.id * 1 === trait.id * 1).length > 0) {
                                    status = STATUS_PREVIEW
                                }
                                if (chosenTraits.indexOf(trait.id * 1) !== -1) {
                                    status = STATUS_CHOSEN
                                }
                                return <Grid key={key} item>
                                    <Trait
                                        trait={trait}
                                        status={status}
                                        onPick={() => this.onPick(trait.id * 1)}
                                        onRemove={() => this.onRemove(trait.id * 1)}
                                    />
                                </Grid>
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    }
}

function findDisabledTraitIds (chosenTraitIds, traits) {
    let chosenTraits = traits.filter(trait => chosenTraitIds.indexOf(trait.id) !== -1)
    const disabledTraitIds = []
    chosenTraits.forEach(trait => {
        trait.incompatibleTraits.forEach(id => disabledTraitIds.push(id))
    })
    return disabledTraitIds
}


export default withStyles(styles)(Traits)