import React, {Component} from 'react'
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card/Card"
import CardContent from "@material-ui/core/CardContent/CardContent"
import CardActions from "@material-ui/core/CardActions/CardActions"
import CardHeader from "@material-ui/core/CardHeader"
import SweetAlert from 'react-bootstrap-sweetalert'

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
    chosen: {
        background: 'linear-gradient(to right, #065274, #DE5952)',
        color: 'white'
    },
    cardContent: {
        maxHeight: 80,
        overflow: "auto",
        lineHeight: "2em",
        color: 'inherit'
    },
    header: {
        height: 20,
        marginBottom: 8,
        color: 'inherit'
    },
    classContainer: {
        overflowY: 'auto',
        height: 540,
    }
};
class Subclass extends Component {
    constructor(props) {
        super(props)
        this.props.onLoad()
    }
    render() {
        const {chosenClass, subclasses, creationPoints, classes, onPick, error, onConfirm} = this.props
        let errorView
        console.log(error)
        if (error !== '') {
            errorView = (<SweetAlert title="Kleiner Fehler" onConfirm={onConfirm}>{error}</SweetAlert>)
        }
        return <div>
            <Typography className={[classes.explanation, classes.points].join(' ')} variant="h4">
                Verfügbare Punkte: {creationPoints}
            </Typography>
            {errorView}
            <Grid container spacing={16} className={classes.classContainer}>
                {subclasses.map(subclass => {
                    let cardClasses = []
                    if (chosenClass === subclass.id * 1) {
                        cardClasses.push(classes.chosen)
                    }
                    let raised = chosenClass === subclass.id * 1
                    let buttonDisabled = chosenClass === subclass.id * 1
                    const changesName = subclass.familienname !== null ?
                        <CardContent>Ändert den Nachnamen zu: {subclass.familienname}</CardContent>
                        : ''
                    return (
                        <Grid key={subclass.id} item sm={6}>
                            <Card raised={raised} className={cardClasses.join(' ')}>
                                <CardHeader
                                    className={classes.header}
                                    title={subclass.bezeichnung}
                                    subheader={"Kostet: " + subclass.kosten + " Erstellungspunkte"}
                                />
                                {changesName}
                                <CardContent className={classes.cardContent} dangerouslySetInnerHTML={{__html: subclass.beschreibung}} />
                                <CardActions>
                                    <Button
                                        variant={"contained"}
                                        color={"primary"}
                                        disabled={buttonDisabled}
                                        onClick={() => onPick(subclass.id * 1)}
                                    >
                                        Auswählen
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    }
}

export default withStyles(styles) (Subclass)