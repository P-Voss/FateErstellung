import React, {Component} from "react"
import {withStyles} from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

const styles = {
    explanation: {
        margin: "10px 0",
    },
    card: {
        width: 180,
        height: 70,
        cursor: "pointer",
    },
    chosen: {
        background: "linear-gradient(to right, #065274, #DE5952)",
        color: "white"
    },
    hovered: {
        transition: "background-color 0.3s ease-out",
        backgroundColor: "silver",
    },
    disabled: {
        transition: "background-color 0.3s ease-out",
        backgroundColor: "gray",
        border: 'none',
    },
    preview: {
        transition: "background-color 0.3s ease-out",
        backgroundColor: "orange",
    },
    cardContent: {
        color: "inherit",
        textAlign: "center",
    },
}

export const STATUS_ENABLED = "ENABLED"
export const STATUS_HOVERED = "HOVERED"
export const STATUS_CHOSEN = "CHOSEN"
export const STATUS_DISABLED = "DISABLED"
export const STATUS_PREVIEW = "DISABLED_PREVIEW"

class Trait extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hovered: false,
            anchorEl: null,
        }
        this.onMouseEnter = this.onMouseEnter.bind(this)
        this.onMouseLeave = this.onMouseLeave.bind(this)
    }
    onMouseEnter(event, traitId) {
        this.setState({...this.state, anchorEl: event.currentTarget, hovered: true})
        this.props.onMouseEnter(traitId)
    }
    onMouseLeave() {
        console.log('UNHOVER')
        this.setState({...this.state, anchorEl: null, hovered: false})
        this.props.onMouseLeave()
    }
    render() {
        const {
            classes,
            status = STATUS_ENABLED,
            trait = {},
            onPick = () => {},
            onRemove = () => {},
            onMouseEnter = () => {},
            onMouseLeave = () => {},
        } = this.props
        const actions = filterActions(status, onPick, onRemove, this.onMouseEnter)
        const cardProps = getCardProps(status, classes)

        return <Card {...cardProps} {...actions} >
            <CardContent
                className={classes.cardContent}
                style={{padding: 12}}
            >
                <Typography noWrap={true} variant={"h5"} className={classes.cardContent} style={{fontSize: 18}}
                            onMouseEnter={(event) => onMouseEnter(event.currentTarget, trait.id)}
                            onMouseLeave={onMouseLeave}>
                    {trait.bezeichnung}
                </Typography>
                <Typography className={classes.cardContent} variant={"body1"}>
                    {trait.kosten} Erstellungspunkte
                </Typography>
            </CardContent>
        </Card>
    }
}
export default withStyles(styles)(Trait)

function getCardProps(status, classes) {
    switch (status) {
        case STATUS_ENABLED:
            return {raised: true, className: classes.card}
        case STATUS_HOVERED:
            return {raised: true, className: [classes.card, classes.hovered].join(' ')}
        case STATUS_CHOSEN:
            return {raised: false, className: [classes.card, classes.chosen].join(' ')}
        case STATUS_DISABLED:
            return {raised: false, className: [classes.card, classes.disabled].join(' ')}
        case STATUS_PREVIEW:
            return {raised: false, className:[classes.card, classes.preview].join(' ')}
        default:
            return {}
    }
}

function filterActions(
    status,
    onPick = () => {},
    onRemove = () => {},
    onHover = () => {}
    ) {
    switch (status) {
        case STATUS_ENABLED:
            return {
                onClick: onPick,
                // onMouseEnter: onHover
            }
        case STATUS_HOVERED:
            return {
                onClick: onPick,
                // onMouseEnter: onHover
            }
        case STATUS_CHOSEN:
            return {
                onClick: onRemove,
                // onMouseEnter: onHover
            }
        case STATUS_DISABLED:
            return {
                // onMouseEnter: onHover
            }
        case STATUS_PREVIEW:
            return {}
        default:
            return {}
    }
}