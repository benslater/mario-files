import type React from "react";
import capitalize from "lodash.capitalize";

import { FileStatus } from "../types";

import "./StatusIndicator.css";

interface StatusIndicatorProps {
  status: FileStatus;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const isAvailable = status === FileStatus.available;

  return (
    <div
      className="status-indicator"
      role="status"
      aria-label={`File is ${status}`}
    >
      {isAvailable && (
        <span className="status-dot-available" aria-hidden="true" />
      )}
      {capitalize(status)}
    </div>
  );
};
