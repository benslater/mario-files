import type React from "react";

import { CustomCheckbox } from "./CustomCheckbox";
import type { FileData } from "./FileTable";
import { StatusIndicator } from "./StatusIndicator";

import { FileStatus } from "../types";

import "./FileTableRow.css";

interface FileTableRowProps {
  file: FileData;
  selected: boolean;
  onSelect: (fileName: string, selected: boolean) => void;
  selectable: boolean;
}

export const FileTableRow: React.FC<FileTableRowProps> = ({
  file,
  selected,
  onSelect,
  selectable,
}) => {
  const isAvailable = file.status === FileStatus.available;
  const selectabilityDescription = isAvailable
    ? "Available for download"
    : "Not available for download";

  return (
    <tr
      className={`file-row ${selected ? "selected" : ""}`}
      aria-selected={selected}
    >
      <td>
        <CustomCheckbox
          checked={selected}
          onChange={(checked) => onSelect(file.name, checked)}
          disabled={!selectable}
          ariaLabel={`Select ${file.name} (${selectabilityDescription})`}
        />
      </td>
      <td>{file.name}</td>
      <td>{file.device}</td>
      <td>{file.path}</td>
      <td>
        <StatusIndicator status={file.status} />
      </td>
    </tr>
  );
};
