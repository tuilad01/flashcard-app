import { v4 as uuidv4 } from 'uuid';

const generateData = () => {
    const arrData = []
    for (let index = 0; index < 1; index++) {
        arrData.push({
            id: uuidv4(),
            name: `group name ${index + 1}`,
            description: `group description ${index + 1}`,
            items: []
        })
        
    }
    return arrData
}

export const mockData = generateData()