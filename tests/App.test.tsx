import { render, screen } from "@testing-library/react";
import App from "../src/App";
import React from "react";
import { expect } from "vitest";
import { sampleData, sampleTestData } from "../src/utils/sample";
import TreeNode from "../src/components/TreeNode";

describe("App", () => {
  it("Renders top level categories", () => {
    render(<App />);
    const categories = screen.getAllByRole("tree-node");
    expect(sampleData.length).equals(categories.length);
  });
});

describe("TreeNode", () => {
  it("Category tree is expending correctly", () => {
    render(
      <TreeNode
        key={`chld_`}
        data={sampleTestData}
        onDelete={() => {}}
        onSave={() => {}}
      />
    );
    const topCategory = screen.getByTestId("category-expend-collapse-button");
    topCategory.click();
    const categories = screen.getByTestId("child-node");
    expect(categories).toBeVisible();
  });
});
