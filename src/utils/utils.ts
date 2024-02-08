import { TreeChild, TreeData } from "../models/TreeModel";

export const uuid = () => {
    return Math.random().toString(16) + Math.random().toString(10);
}

export function cloneData<T>(data: T): TreeData {
    return JSON.parse(JSON.stringify(data));
}

export const flatFilter = (compareId: string, arr: TreeData): TreeData => {
    return cloneData(arr).filter((o) => {
        const keep = o["id"] != compareId;
        if (keep && o["child"]) {
            o["child"] = flatFilter(
                compareId,
                o["child"]
            );
        }
        return keep;
    });
}



export const addId = (data: TreeData): TreeData =>
    cloneData<TreeData>(data).map(({ name, child }) => {
        const finalNode: TreeChild = { name, id: uuid() };
        if (child) {
            finalNode.child = addId(child);
        } else {
            finalNode.child = [];
        }
        return finalNode;
    });