export type TreeData = TreeChild[]

export interface TreeChild {
    name: string,
    id?: string,
    child?: TreeChild[]
}
