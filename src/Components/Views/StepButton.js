import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button"
import CircularProgress from '@material-ui/core/CircularProgress';

import personValidator from '../../Validators/Person'
import attributeValidator from '../../Validators/Attributes'
import classValidator from '../../Validators/Class'
import traitValidator from '../../Validators/Traits'
import traitDetailValidator from '../../Validators/TraitDetails'
import subclassValidator from '../../Validators/Subclass'


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
    ({activeStep, lastStep, system = {}, choices = {}, person = {}, creationPoints, onClick = () => {}, classes = {}}) => {

        if (validateStep(activeStep, choices, person, creationPoints)) {
            return (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onClick}
                    >
                        {lastStep ? "Charakter erstellen" : "Weiter"}
                    </Button>
                    {system.loading && <CircularProgress size={24}/>}
                </div>
            )
        } else {
            return ''
        }
    }
)


function validateStep(currentStep, choices = {}, person = {}, creationPoints) {
    switch (currentStep) {
        case 0:
            return true
        case 1:
            return personValidator(person)
        case 2:
            return classValidator(choices)
        case 3:
            return attributeValidator(choices)
        case 4:
            return traitValidator(choices)
        case 5:
            return subclassValidator(choices, creationPoints)
        case 6:
            return traitDetailValidator(choices)
        default:
            return false
    }
}