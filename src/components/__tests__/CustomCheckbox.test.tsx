import { render, screen } from "@testing-library/react";

import { CustomCheckbox } from "../CustomCheckbox";

describe("CustomCheckbox", () => {
  const defaultProps = {
    checked: false,
    onChange: jest.fn(),
  };

  it("renders unchecked by default", () => {
    render(<CustomCheckbox {...defaultProps} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("renders checked when specified", () => {
    render(<CustomCheckbox {...defaultProps} checked={true} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("shows indeterminate state correctly", () => {
    render(<CustomCheckbox {...defaultProps} indeterminate={true} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
  });

  it("can be disabled", () => {
    render(<CustomCheckbox {...defaultProps} disabled={true} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  it("displays custom aria-label when provided", () => {
    const ariaLabel = "Custom checkbox label";
    render(<CustomCheckbox {...defaultProps} ariaLabel={ariaLabel} />);

    const label = screen.getByLabelText(ariaLabel);
    expect(label).toBeInTheDocument();
  });
});
