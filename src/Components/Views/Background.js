import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';


import Typography from "@material-ui/core/Typography/Typography"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem"

const styles = {
    explanation: {
        margin: '10px 0',
    },
    explBlock: {
        marginBottom: 20
    },
};

class Background extends Component {
    constructor(props) {
        super(props)
        this.state = {
            childhoodTrait: 0,
            raisedTrait: 0,
            eventTrait: 0,
            earnedTrait: 0,
            focusTrait: 0,
            preparedTraits: [],
        }
    }
    render() {
        const {chosenTraits, traits, classes} = this.props
        const chosenTraitDetails = chosenTraits.map(trait => {
            let detailedTraid
            traits.forEach(detail => {
                if (detail.id === trait) {
                    detailedTraid = detail
                }
            })
            return detailedTraid
        })
        return <div>
            <div className={classes.explBlock}>
                <Typography className={classes.explanation} variant="body1">
                    In diesem Schritt entscheidest du, wann sich dein Charakter welche Traits angeeignet hat.
                    Die Eingaben können später noch verändert werden.
                </Typography>
            </div>
            <div>
                <Typography variant={"subheading"}>Trait aus der Kindheit</Typography>
                <Select value={this.state.childhoodTrait}>
                    <MenuItem value={0}>Bitte wählen</MenuItem>
                    {chosenTraitDetails.filter(trait => this.state.preparedTraits.indexOf(trait.id) === -1).map(trait => {
                        return <MenuItem value={trait.id} key={trait.id}>{trait.bezeichnung}</MenuItem>
                    })}
                </Select>
            </div>
            <div>
                <Typography variant={"subheading"}>Anerzogener Trait</Typography>
                <Select value={this.state.raisedTrait}>
                    <MenuItem value={0}>Bitte wählen</MenuItem>
                    {chosenTraitDetails.filter(trait => this.state.preparedTraits.indexOf(trait.id) === -1).map(trait => {
                        return <MenuItem value={trait.id} key={trait.id}>{trait.bezeichnung}</MenuItem>
                    })}
                </Select>
            </div>
            <div>
                <Typography variant={"subheading"}>Trait aus einem Ereignis</Typography>
                <Select value={this.state.eventTrait}>
                    <MenuItem value={0}>Bitte wählen</MenuItem>
                    {chosenTraitDetails.filter(trait => this.state.preparedTraits.indexOf(trait.id) === -1).map(trait => {
                        return <MenuItem value={trait.id} key={trait.id}>{trait.bezeichnung}</MenuItem>
                    })}
                </Select>
            </div>
            <div>
                <Typography variant={"subheading"}>Erarbeiteter Trait</Typography>
                <Select value={this.state.earnedTrait}>
                    <MenuItem value={0}>Bitte wählen</MenuItem>
                    {chosenTraitDetails.filter(trait => this.state.preparedTraits.indexOf(trait.id) === -1).map(trait => {
                        return <MenuItem value={trait.id} key={trait.id}>{trait.bezeichnung}</MenuItem>
                    })}
                </Select>
            </div>
            <div>
                <Typography variant={"subheading"}>Fokustrait</Typography>
                <Select value={this.state.focusTrait}>
                    <MenuItem value={0}>Bitte wählen</MenuItem>
                    {chosenTraitDetails.filter(trait => this.state.preparedTraits.indexOf(trait.id) === -1).map(trait => {
                        return <MenuItem value={trait.id} key={trait.id}>{trait.bezeichnung}</MenuItem>
                    })}
                </Select>
            </div>
        </div>
    }
}
export default withStyles(styles)(Background)