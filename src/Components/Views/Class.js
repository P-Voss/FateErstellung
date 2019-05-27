import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import CardHeader from "@material-ui/core/CardHeader"

const styles = {
    explanation: {
        margin: '10px 0',
    },
    explBlock: {
        marginBottom: 20
    },
    card: {
        margin: 10
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

class Class extends Component {
    pickClass(id) {
        this.props.handleClassChange(id)
    }
    render() {
        const {classes, classesToChoose, chosenClass} = this.props
        return <div>
            <div className={classes.explBlock}>
                <Typography className={classes.explanation} variant="body1">
                    In diesem Schritt müsst ihr euch für eine von fünf Klassen entscheiden.
                </Typography>
            </div>

            {classesToChoose.map((classData, key) => {
                let cardClasses = [classes.card]
                if (chosenClass === classData.id) {
                    cardClasses.push(classes.chosen)
                }
                let raised = chosenClass === classData.id
                let buttonDisabled = chosenClass === classData.id
                let buttonColor = chosenClass !== classData.id ? 'primary' : 'secondary'
                return (<Card raised={raised} key={key} className={cardClasses.join(' ')}>
                    <CardHeader
                        title={classData.bezeichnung}
                    />
                    <CardContent>
                        <Typography className={classes.cardContent} dangerouslySetInnerHTML={{__html: classData.beschreibung}}></Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant={"contained"} color={buttonColor}
                            onClick={() => this.pickClass(classData.id)}
                            disabled={buttonDisabled}
                        >
                            Klasse wählen
                        </Button>
                    </CardActions>
                </Card>)
            })}
        </div>
    }
}

export default withStyles(styles)(Class);