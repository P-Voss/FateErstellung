import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import Person from "./Components/Views/Person"
import Class from "./Components/Views/Class"
import Attributes from "./Components/Views/Attributes"
import Advantages from "./Components/Views/Advantages"
import Subclass from "./Components/Views/Subclass"

import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import * as personActions from "./Actions/PersonActions"
import * as dataActions from "./Actions/DataActions"

import "./App.css"

const PERSON_SIZES = {
    max: 210,
    min: 130
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            steps: [
                "Person",
                "Klasse",
                "Eigenschaften",
                "Traits",
                "Unterklasse"
            ],
            activeStep: 0
        }
        this.getStepContent = this.getStepContent.bind(this)
        this.handleStepChange = this.handleStepChange.bind(this)
        this.handleGenderChange = this.handleGenderChange.bind(this)
        this.handlePreferenceChange = this.handlePreferenceChange.bind(this)
        this.handleEyecolorChange = this.handleEyecolorChange.bind(this)
        this.handleSizeChange = this.handleSizeChange.bind(this)
        this.handleSizeValidation = this.handleSizeValidation.bind(this)
        this.handleResidenceChange = this.handleResidenceChange.bind(this)
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this)
        this.handleSurnameChange = this.handleSurnameChange.bind(this)
        this.handleBirthdateChange = this.handleBirthdateChange.bind(this)
        this.updateSize = this.updateSize.bind(this)
        this.props.dataActions.loadClasses()
    }

    handleStepChange(nextStep) {
        this.setState({
            ...this.state,
            "activeStep": nextStep
        })
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 1:
                return <Class chosenClass={this.props.choices.class}
                            classesToChoose={this.props.creationData.classes}
                            handleClassChange={this.props.dataActions.pickClass}
                />
            case 2:
                return <Attributes
                    creationPoints={this.props.creationPoints}
                    attributesToChoose={this.props.creationData.attributes}
                    choices={this.props.choices.attributes}
                    handleElementChange={this.props.dataActions.pickElement}
                    handleOdoChange={this.props.dataActions.pickOdo}
                    handleLuckChange={this.props.dataActions.pickLuck}
                    handleCircuitChange={this.props.dataActions.pickCircuit}
                />
            case 3:
                return <Advantages {...this.state} />
            case 4:
                return <Subclass {...this.state} />
            default:
                return <Person {...this.props.person}
                               handleFirstnameChange={this.handleFirstnameChange}
                               handleSurnameChange={this.handleSurnameChange}
                               handleEyecolorChange={this.handleEyecolorChange}
                               handleGenderChange={this.handleGenderChange}
                               handlePreferenceChange={this.handlePreferenceChange}
                               handleSizeChange={this.handleSizeChange}
                               handleSizeValidation={this.handleSizeValidation}
                               handleResidenceChange={this.handleResidenceChange}
                               handleBirthdateChange={this.handleBirthdateChange}
                />
        }
    }

    handleFirstnameChange(event) {
        this.props.personActions.changeFirstname(event.target.value)
    }

    handleSurnameChange(event) {
        this.props.personActions.changeSurname(event.target.value)
    }

    handleGenderChange(event) {
        this.props.personActions.changeGender(event.target.value)
    }

    handlePreferenceChange(event) {
        this.props.personActions.changePreference(event.target.value)
    }

    handleEyecolorChange(event) {
        this.props.personActions.changeEyecolor(event.target.value)
    }

    handleResidenceChange(district) {
        this.props.personActions.changeResidence(district)
    }

    handleBirthdateChange(birthdate) {
        this.props.personActions.changeBirthdate(birthdate)
    }

    handleSizeChange(event) {
        this.updateSize(event.target.value)
    }

    handleSizeValidation(event) {
        let size = event.target.value
        if (size < PERSON_SIZES.min) {
            size = PERSON_SIZES.min
        }
        if (size > PERSON_SIZES.max) {
            size = PERSON_SIZES.max
        }
        this.updateSize(size)
    }

    updateSize(size) {
        this.props.personActions.changeSize(size)
    }

    render() {
        const {steps, activeStep} = this.state
        return (
            <div className="App">
                <header className="App-header">
                    <Typography variant="headline">Neuen Charakter erstellen</Typography>
                    <Typography variant="body1">
                        In den folgenden Schritten werdet ihr in die Lage versetzt, einen Charakter für das Spiel zu
                        erschaffen. Zuerst benötigen wir grundlegende Informationen für euren Charakter.
                    </Typography>
                    <Typography variant="body1">
                        Wichtig: Die folgenden Angaben können in bestimmten Situationen das Spiel beeinflussen und sind
                        nicht überflüssig.
                    </Typography>
                    <Typography variant="body1">
                        Auf <a href="/index/intro">dieser Seite (Für Einsteiger)</a> kannst du dir von Kirei eine
                        Einführung in die Welt des Nasuverse ansehen, um das Spiel ein wenig besser zu verstehen.
                    </Typography>
                </header>
                <Stepper activeStep={activeStep} style={{backgroundColor: "#9cdce2"}}>
                    {steps.map((label, index) => {
                        const stepProps = {}
                        if (activeStep > index) {
                            stepProps.onClick = () => this.handleStepChange(index)
                            stepProps.style = {"cursor": "pointer"}
                        }
                        return (<Step key={index} {...stepProps} >
                            <StepLabel>{label}</StepLabel>
                        </Step>)
                    })}
                </Stepper>
                <div style={{marginBottom: "22px"}}>
                    {this.getStepContent(activeStep)}
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleStepChange(activeStep + 1)}
                >
                    {activeStep === steps.length - 1 ? "Finish" : "Weiter"}
                </Button>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {...state}
}

function mapDispatchToProps(dispatch) {
    return {
        personActions: bindActionCreators(personActions, dispatch),
        dataActions: bindActionCreators(dataActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)