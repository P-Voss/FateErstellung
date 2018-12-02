import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';

import Typography from "@material-ui/core/Typography/Typography"
import Card from "@material-ui/core/Card/Card"
import CardContent from "@material-ui/core/CardContent/CardContent"
import CardActions from "@material-ui/core/CardActions/CardActions"
import Button from "@material-ui/core/Button/Button"
import Grid from "@material-ui/core/Grid"

const styles = {
    explanation: {
        margin: '10px 0',
    },
    explBlock: {
        marginBottom: 20
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

class Attributes extends Component {
    constructor(props) {
        super(props)
        this.changeElement = this.changeElement.bind(this)
    }
    changeElement(elementId) {
        console.log(elementId)
        this.props.handleElementChange(elementId)
    }
    render() {
        const {classes, attributesToChoose, choices} = this.props
        const {elements} = attributesToChoose
        return <div>
            <div className={classes.explBlock}>
                <Typography className={classes.explanation} variant="body1">
                    In diesem Schritt müsst ihr euch für die spirituellen Eigenschaften eures Charakters entscheiden.
                    Dabei wählt ihr die Stufe eures Odos, eures Glücks und eures Naturelementes aus.
                    Als Magi müsst ihr zudem die Stufe eures Magic Circuits festlegen.
                </Typography>
                <Typography className={classes.explanation} variant="body1">
                    Beachtet dass euch 30 Punkte für die Erstellung eures Charakters zur Verfügung stehen, die nicht nur
                    für die spirituellen Eigenschaften, sondern auch eure Traits sowie eure Unterklassen ausreichen müssen.
                    Falls euch die Punkte später ausgehen, könnt ihr jederzeit zu dieser Seite zurückkehren und eure Punkte umverteilen.
                </Typography>
            </div>

            <Typography variant={"h4"}>
                Naturelement
            </Typography>
            <Typography variant={"body2"}>
                Das eigene Naturelement zeigt die natürliche Affinität eines Charakters an.
                Eines dieser vier muss gewählt werden. Für Magi gewinnt es zudem an
                Bedeutung, da alle Magien die das eigene Naturelement in sich tragen 10% weniger FP kosten.
            </Typography>
            <div>
                <Grid container spacing={8}>
                    {elements.map((element, key) => {
                        let cardClasses = [classes.card, classes.elementCard]
                        if (choices.element === element.id) {
                            cardClasses.push(classes.chosen)
                        }
                        let raised = choices.element === element.id
                        let buttonDisabled = choices.element === element.id
                        let buttonColor = choices.element !== element.id ? 'primary' : 'secondary'
                        return <Grid item>
                            <Card raised={raised}  key={key} className={cardClasses.join(' ')}>
                                <CardContent className={classes.cardContent}>
                                    <Typography variant={"h5"} className={classes.cardContent}>{element.bezeichnung}</Typography>
                                    <Typography variant={"body1"} className={classes.cardContent}>{element.charakterisierung}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant={"contained"}
                                        color={buttonColor}
                                        disabled={buttonDisabled}
                                        onClick={() => this.changeElement(element.id)}>
                                        Wählen
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    })}
                </Grid>
            </div>
        </div>
    }
}

export default withStyles(styles)(Attributes)