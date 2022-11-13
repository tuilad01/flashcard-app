import { v4 as uuidv4 } from 'uuid';
import { localStore } from "./localstore";

const key = "F4558EC9-9AA1-468E-BBB0-DA44321A6D40"


export const groupService = {
    getList: function(): any[] {
        return localStore.getArrayDataLocal(key)
    },
    getById: function(id: string): any {
        const groups = this.getList();
        const group = groups.find(gr => gr.id === id)
        return group
    },
    add: function(obj: any): any {
        const groups = this.getList();
        const newGroup = {
            id: uuidv4(),
            name: obj.name,
            description: obj.description,
            items: obj.items
        }
        groups.push(newGroup)        
        localStore.setDataLocal(key, groups)
        return newGroup
    },
    remove: function(id: string) {
        const groups = this.getList();
        const newArrGroup = groups.filter(gr => gr.id !== id)
        localStore.setDataLocal(key, newArrGroup)
    },
    update: function(id: string, group: any) {
        const groups = this.getList();
        const oldGroup = groups.find(gr => gr.id === id)
        if (group) {
            oldGroup.name = group.name;
            oldGroup.description = group.description;
            oldGroup.items = group.items;
            localStore.setDataLocal(key, groups)
        }        
    },
    parseItem: function(strItems: string): any[] | [] {        
        if (!strItems) return [];

        const sentences = strItems.split("\n").map(line => {
            const sentence = line.split(",")
            return {
                en: sentence[0],
                vi: sentence[1] ?? ""
            }
        })
        return sentences
    }

}