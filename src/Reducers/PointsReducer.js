
export default function creationPoints(action, creationData = {}, choices = {}) {
    let points = 30
    // if (action.type === 'POINTS') {
        let costs = []
        if (creationData.attributes !== undefined) {
            if (choices.attributes.circuit !== 0) {
                let entry = creationData.attributes.circuits.find(element => element.id === choices.attributes.circuit)
                costs.push(entry !== undefined ? entry.kosten : 0)
            }
            if (choices.attributes.odo !== 0) {
                let entry = creationData.attributes.odo.find(element => element.id === choices.attributes.odo)
                costs.push(entry !== undefined ? entry.kosten : 0)
            }
            if (choices.attributes.luck !== 0) {
                let entry = creationData.attributes.luck.find(element => element.id === choices.attributes.luck)
                costs.push(entry !== undefined ? entry.kosten : 0)
            }
        }
        if (creationData.traits !== undefined) {
            let traitCosts = creationData.traits.filter(trait => {
                return choices.traits.indexOf(trait.id) !== -1
            }).map(trait => trait.kosten).reduce((prevCost, curCost) => curCost + prevCost, 0)
            costs.push(traitCosts)
        }
        if (creationData.subclasses !== undefined) {
            if (choices.subclass > 0) {
                let entry = creationData.subclasses.find(element => element.id === choices.subclass)
                costs.push(entry !== undefined ? entry.kosten : 0)
            }
        }

        return points - costs.reduce((prevCost, curCost) => curCost + prevCost, 0)
    // } else {
    //     return points
    // }
}