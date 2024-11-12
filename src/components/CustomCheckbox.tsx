import type React from "react";
import { useMemo } from "react";
import { FaCheck, FaMinus } from "react-icons/fa";
import cx from "classnames";

import "./CustomCheckbox.css";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  indeterminate?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  indeterminate = false,
  disabled = false,
  ariaLabel,
}) => {
  const icon = useMemo(() => {
    let RenderedIcon = null;
    if (indeterminate) {
      RenderedIcon = FaMinus;
    } else if (checked) {
      RenderedIcon = FaCheck;
    }
    return RenderedIcon ? <RenderedIcon className="checkbox-icon" /> : null;
  }, [indeterminate, checked]);

  return (
    <label
      className={cx("checkbox-container", { disabled, indeterminate, checked })}
      aria-label={ariaLabel}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        aria-checked={indeterminate ? "mixed" : checked}
      />
      <span className="checkmark">{icon}</span>
    </label>
  );
};
