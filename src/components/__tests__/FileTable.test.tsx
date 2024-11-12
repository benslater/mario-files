import { render, screen, within, fireEvent } from "@testing-library/react";

import { FileTable } from "../FileTable";
import { FileStatus } from "../../types";

const mockFiles = [
  {
    name: "available1.exe",
    device: "Device1",
    path: "\\Path\\To\\available1.exe",
    status: FileStatus.available,
  },
  {
    name: "available2.exe",
    device: "Device2",
    path: "\\Path\\To\\available2.exe",
    status: FileStatus.available,
  },
  {
    name: "scheduled.exe",
    device: "Device3",
    path: "\\Path\\To\\scheduled.exe",
    status: FileStatus.scheduled,
  },
];

describe("FileTable", () => {
  it("renders all files with correct status", () => {
    render(<FileTable files={mockFiles} />);

    mockFiles.forEach((file) => {
      expect(screen.getByText(file.name)).toBeInTheDocument();
      expect(screen.getByText(file.device)).toBeInTheDocument();
      expect(screen.getByText(file.path)).toBeInTheDocument();
    });
  });

  it("shows 'None Selected' initially", () => {
    render(<FileTable files={mockFiles} />);
    expect(screen.getByText("None Selected")).toBeInTheDocument();
  });

  it("updates selection count when files are selected", () => {
    render(<FileTable files={mockFiles} />);

    const availableRow = screen.getByText("available1.exe").closest("tr");
    const checkbox = within(availableRow!).getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(screen.getByText("Selected 1")).toBeInTheDocument();
  });

  it("only allows selection of available files", () => {
    render(<FileTable files={mockFiles} />);

    const scheduledRow = screen.getByText("scheduled.exe").closest("tr");
    const checkbox = within(scheduledRow!).getByRole("checkbox");

    expect(checkbox).toBeDisabled();
  });

  it("handles select all functionality correctly", () => {
    render(<FileTable files={mockFiles} />);

    const selectAllCheckbox = screen.getAllByRole("checkbox")[0];

    // Select all available files
    fireEvent.click(selectAllCheckbox);
    expect(screen.getByText("Selected 2")).toBeInTheDocument();

    // Deselect all files
    fireEvent.click(selectAllCheckbox);
    expect(screen.getByText("None Selected")).toBeInTheDocument();
  });

  it("shows download button only when files are selected", () => {
    render(<FileTable files={mockFiles} />);

    expect(screen.queryByText("Download Selected")).not.toBeInTheDocument();

    const availableRow = screen.getByText("available1.exe").closest("tr");
    const checkbox = within(availableRow!).getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(screen.getByText("Download Selected")).toBeInTheDocument();
  });

  it("displays correct alert when downloading files", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    render(<FileTable files={mockFiles} />);

    // Select first available file
    const availableRow = screen.getByText("available1.exe").closest("tr");
    const checkbox = within(availableRow!).getByRole("checkbox");
    fireEvent.click(checkbox);

    // Click download button
    const downloadButton = screen.getByText("Download Selected");
    fireEvent.click(downloadButton);

    expect(alertMock).toHaveBeenCalledWith(
      expect.stringContaining("\\Path\\To\\available1.exe (Device1)")
    );

    alertMock.mockRestore();
  });
});
