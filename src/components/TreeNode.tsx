import React, { useState } from "react";
import { TreeChild } from "../models/TreeModel";
import Dash from "./Dash";

interface Props {
  data: TreeChild;
  isRoot?: boolean;
  onDelete: (id: string) => void;
  onSave: (id: string, value: string, isEditing: boolean) => void;
}

function TreeNode({ data, isRoot, onDelete, onSave }: Props) {
  const { name, child, id } = data;
  const [showAddModifyContainer, setShowAddModifyContainer] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [isExpended, setIsExpended] = useState(false);
  const hasChild = Array.isArray(child) && child.length;

  const controlAddModifyContainer = (
    e: React.MouseEvent<HTMLAnchorElement>,
    mode: boolean
  ) => {
    e.preventDefault();
    setShowAddModifyContainer(true);
    setEditMode(mode);
  };

  const saveData = () => {
    if (textValue.trim().length === 0) {
      alert("Please type something..");
      return;
    }
    onSave(id as string, textValue, editMode);
    setShowAddModifyContainer(false);
    setIsExpended(true);
    setTextValue("");
  };

  const cancelOperation = () => {
    setTextValue("");
    setShowAddModifyContainer(false);
  };

  return (
    <div role="tree-node">
      <div className="hover-controls new-item">
        {hasChild ? (
          <>
            {isRoot ? "" : <Dash />}
            <button
              className="mr-2 expend-collapse-button"
              onClick={() => setIsExpended(!isExpended)}
              data-testid="category-expend-collapse-button"
            >
              {isExpended ? "-" : "+"}
            </button>
          </>
        ) : (
          <Dash />
        )}
        <span className={!hasChild ? "label" : "fw-bold"}>{name}</span>

        {showAddModifyContainer ? (
          <span className="ml-1">
            <input
              placeholder="Enter value"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
            <button className="ml-1 btn" onClick={saveData}>
              Save
            </button>
            <button className="ml-1 btn" onClick={cancelOperation}>
              Cancel
            </button>
          </span>
        ) : (
          <span className="controls">
            <a href="" onClick={(e) => controlAddModifyContainer(e, false)}>
              Add Child
            </a>
            <a href="" onClick={(e) => controlAddModifyContainer(e, true)}>
              Rename Child
            </a>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                onDelete(data.id as string);
              }}
            >
              Delete
            </a>
          </span>
        )}
      </div>
      <div className={`ml-4 mt-1 clild-section`} data-testid="child-node">
        {hasChild && isExpended
          ? child.map((el, index) => (
              <TreeNode
                key={`chld_${el.name}_${index}`}
                data={el}
                onDelete={onDelete}
                onSave={onSave}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default TreeNode;
