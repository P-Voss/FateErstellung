import React, {Component} from 'react'
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { withStyles } from '@material-ui/core/styles';

import Trait, {STATUS_CHOSEN, STATUS_ENABLED, STATUS_DISABLED, STATUS_PREVIEW} from './Traits/Trait'
import Popover from "@material-ui/core/Popover"

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
class Traits extends Component {
    constructor(props) {
        super(props)
        let disablingTraits = this.props.traits.filter(trait => trait.incompatibleTraits.length > 0)
        this.state = {
            disabledTraits: [],
            previewDisabledTraits: [],
            disablingTraits: disablingTraits,
            anchorEl: null,
            hoveredTrait: 0,
        }
        this.onMouseEnter = this.onMouseEnter.bind(this)
        this.onMouseLeave = this.onMouseLeave.bind(this)
    }
    onMouseEnter(elem, traitId) {
        this.setState({...this.state, anchorEl: elem, hoveredId: traitId})

    }
    onMouseLeave() {
        this.setState({...this.state, anchorEl: null, hoveredId: 0})
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
        let desc
        return <div>
            <div className={classes.explBlock}>
                <Typography className={classes.explanation} variant="body1">
                    In diesem Schritt dürft ihr euch 5 Traits entscheiden.
                    Wählt sie am besten nach dem aus, was zu eurem Charakter passen würde, anstatt zu versuchen eine
                    möglichst effektive Kombination zu erhalten (nicht das daran etwas verkehrt wäre).
                </Typography>
                <Typography className={[classes.explanation, classes.points].join(' ')} variant="h4">
                    Verfügbare Punkte: {creationPoints}
                </Typography>
            </div>
            <div>
                <Grid container spacing={16}>
                    {traits.map((trait, key) => {
                        let status = STATUS_ENABLED
                        if (this.state.disabledTraits.filter(disTrait => disTrait.id === trait.id ).length > 0) {
                            status = STATUS_DISABLED
                        }
                        if (this.state.previewDisabledTraits.filter(prevTrait => prevTrait.id === trait.id).length > 0) {
                            status = STATUS_PREVIEW
                        }
                        if (chosenTraits.filter(chosenTrait => chosenTrait === trait.id).length > 0) {
                            status = STATUS_CHOSEN
                        }
                        if (this.state.hoveredTrait === trait.id) {
                            const { anchorEl } = this.state;
                            const open = Boolean(anchorEl);
                            console.log(trait)
                            desc = <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={this.onMouseLeave}
                            >
                                {trait.beschreibung}
                            </Popover>
                        }
                        return <Grid key={key} item>
                                <Trait
                                    trait={trait}
                                    status={status}
                                    onMouseEnter={this.onMouseEnter}
                                    onMouseLeave={this.onMouseLeave}
                                    onPick={() => this.onPick(trait.id)}
                                    onRemove={() => this.onRemove(trait.id)}
                                />
                            </Grid>
                    })}
                </Grid>
            </div>
            {desc}
        </div>
    }
}

export default withStyles(styles)(Traits)