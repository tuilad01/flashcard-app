export const localStore = {
    getArrayDataLocal: (key: string): any[] => {
        const str = localStorage.getItem(key)
        if (str) {
            return JSON.parse(str)
        }
    
        return []
    },
    setDataLocal: (key: string, obj: any) => {
        localStorage.setItem(key, JSON.stringify(obj))
    }
}