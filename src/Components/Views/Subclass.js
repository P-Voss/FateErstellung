import React, {Component} from 'react'
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card/Card"
import CardContent from "@material-ui/core/CardContent/CardContent"
import CardActions from "@material-ui/core/CardActions/CardActions"
import CardHeader from "@material-ui/core/CardHeader"

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
        const {chosenClass, subclasses, creationPoints, classes, onPick} = this.props
        return <div>
            <Typography className={[classes.explanation, classes.points].join(' ')} variant="h4">
                Verfügbare Punkte: {creationPoints}
            </Typography>
            <Grid container spacing={16} className={classes.classContainer}>
                {subclasses.map(subclass => {
                    let cardClasses = []
                    if (chosenClass === subclass.id) {
                        cardClasses.push(classes.chosen)
                    }
                    let raised = chosenClass === subclass.id
                    let buttonDisabled = chosenClass === subclass.id
                    return (
                        <Grid key={subclass.id} item sm={6}>
                            <Card raised={raised} className={cardClasses.join(' ')}>
                                <CardHeader
                                    classes={classes.header}
                                    title={subclass.bezeichnung}
                                    subheader={"Kostet: " + subclass.kosten + " Erstellungspunkte"}
                                />
                                <CardContent className={classes.cardContent}>
                                    {subclass.beschreibung}
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant={"contained"}
                                        color={"primary"}
                                        disabled={buttonDisabled}
                                        onClick={() => onPick(subclass.id)}
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