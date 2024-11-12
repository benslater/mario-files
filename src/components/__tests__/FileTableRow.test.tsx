import { render, screen, fireEvent } from "@testing-library/react";

import { FileTableRow } from "../FileTableRow";
import { FileStatus } from "../../types";

const mockFile = {
  name: "test.exe",
  device: "TestDevice",
  path: "\\Path\\To\\test.exe",
  status: FileStatus.available,
};

describe("FileTableRow", () => {
  const defaultProps = {
    file: mockFile,
    selected: false,
    onSelect: jest.fn(),
    selectable: true,
  };

  it("renders file information correctly", () => {
    render(
      <table>
        <tbody>
          <FileTableRow {...defaultProps} />
        </tbody>
      </table>
    );

    expect(screen.getByText(mockFile.name)).toBeInTheDocument();
    expect(screen.getByText(mockFile.device)).toBeInTheDocument();
    expect(screen.getByText(mockFile.path)).toBeInTheDocument();
  });

  it("handles selection correctly", () => {
    const onSelect = jest.fn();
    render(
      <table>
        <tbody>
          <FileTableRow {...defaultProps} onSelect={onSelect} />
        </tbody>
      </table>
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(onSelect).toHaveBeenCalledWith(mockFile.name, true);
  });

  it("disables checkbox when not selectable", () => {
    render(
      <table>
        <tbody>
          <FileTableRow {...defaultProps} selectable={false} />
        </tbody>
      </table>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  it("shows selected state correctly", () => {
    render(
      <table>
        <tbody>
          <FileTableRow {...defaultProps} selected={true} />
        </tbody>
      </table>
    );

    const row = screen.getByRole("row");
    expect(row).toHaveClass("selected");
    expect(row).toHaveAttribute("aria-selected", "true");
  });

  it("has correct accessibility attributes", () => {
    render(
      <table>
        <tbody>
          <FileTableRow {...defaultProps} />
        </tbody>
      </table>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAccessibleName(
      `Select ${mockFile.name} (Available for download)`
    );
  });
});
