import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import Person from "./Components/Views/Person"
import Class from "./Components/Views/Class"
import Attributes from "./Components/Views/Attributes"
import Subclass from "./Components/Views/Subclass"
// import Background from "./Components/Views/Background"
import Intro from "./Components/Views/Intro"
import StepButton from "./Components/Views/StepButton"

import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"

import * as personActions from "./Actions/PersonActions"
import * as dataActions from "./Actions/DataActions"
import * as creationActions from "./Actions/CreationActions"

import Traits from "./Components/Views/Traits"

const PERSON_SIZES = {
    max: 210,
    min: 130
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            steps: [
                "Intro",
                "Person",
                "Klasse",
                "Eigenschaften",
                "Traits",
                "Unterklasse",
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
        this.props.dataActions.loadPlaces()
        this.props.dataActions.loadTraits()
        this.props.dataActions.loadAttributes()
    }

    handleStepChange(nextStep) {
        if (nextStep === this.state.steps.length) {
            this.props.creationActions.createCharacter(
                this.props.person,
                this.props.choices,
                this.props.creationData.subclasses
            )
        } else {
            this.setState({
                ...this.state,
                "activeStep": nextStep
            })
        }
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <Intro />
            case 1:
                return <Person
                    {...this.props.person}
                    handleFirstnameChange={this.handleFirstnameChange}
                    handleSurnameChange={this.handleSurnameChange}
                    handleEyecolorChange={this.handleEyecolorChange}
                    handleGenderChange={this.handleGenderChange}
                    handlePreferenceChange={this.handlePreferenceChange}
                    handleSizeChange={this.handleSizeChange}
                    handleSizeValidation={this.handleSizeValidation}
                    handleResidenceChange={this.handleResidenceChange}
                    handleBirthdateChange={this.handleBirthdateChange}
                    onMount={this.props.dataActions.removeSubclass}
                    districts={this.props.creationData.districts}
                    attractions={this.props.creationData.attractions}
                />
            case 2:
                return <Class chosenClass={this.props.choices.chosenClass}
                              classesToChoose={this.props.creationData.classes}
                              handleClassChange={this.props.dataActions.pickClass}
                />
            case 3:
                return <Attributes
                    creationPoints={this.props.creationPoints}
                    attributesToChoose={this.props.creationData.attributes}
                    choices={this.props.choices.attributes}
                    chosenClass={this.props.choices.chosenClass}
                    handleElementChange={this.props.dataActions.pickElement}
                    handleOdoChange={this.props.dataActions.pickOdo}
                    handleLuckChange={this.props.dataActions.pickLuck}
                    handleCircuitChange={this.props.dataActions.pickCircuit}
                />
            case 4:
                return <Traits
                    creationPoints={this.props.creationPoints}
                    traits={this.props.creationData.traits}
                    chosenTraits={this.props.choices.traits}
                    choices={this.props.choices}
                    onPick={this.props.dataActions.pickTrait}
                    onRemove={this.props.dataActions.removeTrait}
                />
            case 5:
                return <Subclass
                    creationPoints={this.props.creationPoints}
                    subclasses={this.props.creationData.subclasses}
                    chosenClass={this.props.choices.subclass}
                    onLoad={() => this.props.dataActions.loadSubclasses(this.props.choices)}
                    onPick={this.props.dataActions.pickSubclass}
                    onRemove={this.props.dataActions.removeSubclass}
                />
            default:
                return <Person
                    {...this.props.person}
                    handleFirstnameChange={this.handleFirstnameChange}
                    handleSurnameChange={this.handleSurnameChange}
                    handleEyecolorChange={this.handleEyecolorChange}
                    handleGenderChange={this.handleGenderChange}
                    handlePreferenceChange={this.handlePreferenceChange}
                    handleSizeChange={this.handleSizeChange}
                    handleSizeValidation={this.handleSizeValidation}
                    handleResidenceChange={this.handleResidenceChange}
                    handleBirthdateChange={this.handleBirthdateChange}
                    onMount={this.props.dataActions.removeSubclass}
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
        let button = (<StepButton
                lastStep={activeStep === steps.length - 1}
                activeStep={activeStep}
                {...this.props}
                onClick={() => this.handleStepChange(activeStep + 1)}
            />
        )
        return (
            <div className="App">
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
                {button}
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
        creationActions: bindActionCreators(creationActions, dispatch),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)