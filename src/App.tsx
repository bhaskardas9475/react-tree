import { useMemo, useState } from "react";
import "./App.css";
import TreeNode from "./components/TreeNode";
import { TreeData } from "./models/TreeModel";
import { addId, cloneData, flatFilter } from "./utils/utils";
import { sampleData } from "./utils/sample";

function App() {
  const [treeData, setTreeData] = useState(sampleData);
  const [topCategory, setTopCategory] = useState("");

  const saveNewCategory = () => {
    setTreeData([...treeData, { name: topCategory, child: [] }]);
    setTopCategory("");
  };

  /**
   * Unique ID has been added in respect to each object
   * to identify the pointer to be updated or deleted
   */

  const treeDataWithId = useMemo(() => {
    return addId(treeData);
  }, [treeData]);

  /**
   * This function is responsible to handle save operation
   * It will create a new child or update existing one based on isEditing flag
   */
  const handleSave = (id: string, value: string, isEditing: boolean) => {
    const rawData = cloneData(treeDataWithId);
    const update = (d: TreeData) => {
      d.forEach((element) => {
        if (element.id == id) {
          if (isEditing) element.name = value;
          else
            element.child = element.child
              ? [...element.child, { name: value }]
              : [{ name: value }];
        } else {
          element.child && update(element.child);
        }
      });
    };
    update(rawData);
    setTreeData(rawData);
  };

  const deleteItem = (incomingId: string) => {
    const newItems = flatFilter(incomingId, treeDataWithId);
    setTreeData(newItems);
  };

  return (
    <div className="main-container">
      <div className="add-top-category">
        <input
          value={topCategory}
          onChange={(e) => setTopCategory(e.target.value)}
          style={{ width: "100%" }}
          placeholder="Enter New Category.."
        />
        <button
          className="btn ml-1 "
          style={{ width: "100px" }}
          onClick={saveNewCategory}
        >
          Save
        </button>
      </div>
      {treeDataWithId.map((node, index) => (
        <TreeNode
          key={`${node.name}_${index}`}
          isRoot={true}
          data={node}
          onDelete={deleteItem}
          onSave={handleSave}
        />
      ))}
    </div>
  );
}

export default App;
