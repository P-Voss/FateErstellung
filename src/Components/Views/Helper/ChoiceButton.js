import Button from "@material-ui/core/Button/Button"
import React from "react"

const ChoiceButton = ({isActive, onPick = () => {}}) => {
    let buttonDisabled = isActive
    let buttonColor = !isActive ? 'primary' : 'secondary'
    return <Button
        variant={"contained"}
        color={buttonColor}
        disabled={buttonDisabled}
        onClick={onPick}>
        Wählen
    </Button>
}

export default ChoiceButton