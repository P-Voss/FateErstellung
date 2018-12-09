import Button from "@material-ui/core/Button/Button"
import React from "react"

const RemoveChoiceButton = ({onPick = () => {}}) => {
    return <Button
        variant={"contained"}
        color={"secondary"}
        onClick={onPick}
    >
        Abwählen
    </Button>
}

export default RemoveChoiceButton