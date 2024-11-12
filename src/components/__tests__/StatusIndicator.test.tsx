import { render, screen } from "@testing-library/react";

import { StatusIndicator } from "../StatusIndicator";
import { FileStatus } from "../../types";

describe("StatusIndicator", () => {
  it("shows available status with dot", () => {
    render(<StatusIndicator status={FileStatus.available} />);

    const indicator = screen.getByRole("status");
    expect(indicator).toHaveTextContent("Available");
    expect(
      indicator.querySelector(".status-dot-available")
    ).toBeInTheDocument();
  });

  it("shows scheduled status without dot", () => {
    render(<StatusIndicator status={FileStatus.scheduled} />);

    const indicator = screen.getByRole("status");
    expect(indicator).toHaveTextContent("Scheduled");
    expect(
      indicator.querySelector(".status-dot-available")
    ).not.toBeInTheDocument();
  });

  it("has correct aria-label", () => {
    render(<StatusIndicator status={FileStatus.available} />);

    const indicator = screen.getByRole("status");
    expect(indicator).toHaveAttribute("aria-label", "File is available");
  });
});
