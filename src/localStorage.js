export const loadStore = () => {
    try {
        const serializedStore = localStorage.getItem('FateAlpha');
        if(serializedStore === null) {
            return undefined
        }
        return JSON.parse(serializedStore);
    } catch (e) {
        return undefined
    }
}

export const saveStore = (store) => {
    try {
        const serializedStore = JSON.stringify(store)
        localStorage.setItem('FateAlpha', serializedStore)
    } catch (e) {
        // Ignore
    }
}
