import { TreeChild, TreeData } from "../models/TreeModel";

export const sampleData: TreeData = [
    { name: "test1", child: [{ name: "child1" }, { name: "child2" }] },
    { name: "test2", child: [{ name: "child1" }, { name: "child2" }] },
    {
        name: "test3",
        child: [
            {
                name: "child1",
                child: [
                    { name: "child1" },
                    { name: "child2", child: [{ name: "child1" }, { name: "child2" }] },
                ],
            },
        ],
    },
];
export const sampleTestData: TreeChild =
    { name: "test1", child: [{ name: "child1" }, { name: "child2" }] };