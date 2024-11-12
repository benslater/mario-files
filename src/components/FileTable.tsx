import type React from "react";
import { useMemo, useState } from "react";
import { FiDownload } from "react-icons/fi";

import { CustomCheckbox } from "./CustomCheckbox";
import { FileTableRow } from "./FileTableRow";

import { FileStatus } from "../types";

import "./FileTable.css";

export interface FileData {
  name: string;
  device: string;
  path: string;
  status: FileStatus;
}

interface FileTableProps {
  files: FileData[];
}

export const FileTable: React.FC<FileTableProps> = ({ files }) => {
  // Using a Set of file names to track selected files. This allows for O(1)
  // lookups when selecting and deselecting files, and improves readability compared to
  // having Array.from(selectedFiles).some(selected => selected.name === file.name)
  // Tradeoff is needing to use this state to rebuild a list of full file objects
  // when downloading.
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const availableFiles = useMemo(
    () => files.filter((file) => file.status === FileStatus.available),
    [files]
  );

  const handleSelect = (fileName: string, selected: boolean) => {
    const file = files.find((f) => f.name === fileName);
    if (file?.status !== FileStatus.available) return;

    const newSelected = new Set(selectedFiles);
    if (selected) {
      newSelected.add(fileName);
    } else {
      newSelected.delete(fileName);
    }
    setSelectedFiles(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFiles(new Set(availableFiles.map((f) => f.name)));
    } else {
      setSelectedFiles(new Set());
    }
  };

  const handleDownload = () => {
    const selectedFileDetails = files
      .filter((file) => selectedFiles.has(file.name))
      .map((file) => `${file.path} (${file.device})`)
      .join("\n");

    if (selectedFileDetails) {
      alert(selectedFileDetails);
    }
  };

  const allAvailableSelected =
    availableFiles.length > 0 &&
    availableFiles.every((file) => selectedFiles.has(file.name));
  const someSelected = selectedFiles.size > 0;
  const isIndeterminate = someSelected && !allAvailableSelected;

  const selectedCount = selectedFiles.size;
  const totalAvailable = availableFiles.length;

  return (
    <section className="file-table-container" aria-label="File selection table">
      <div className="table-header" role="toolbar" aria-controls="file-table">
        <div className="selected-count">
          <CustomCheckbox
            checked={allAvailableSelected}
            indeterminate={isIndeterminate}
            onChange={handleSelectAll}
            ariaLabel={`Select all available files (${totalAvailable} available, ${selectedCount} selected)`}
          />
          <span aria-live="polite">
            {selectedCount === 0
              ? "None Selected"
              : `Selected ${selectedCount}`}
          </span>
        </div>
        {selectedCount > 0 && (
          <button
            className="download-button"
            type="button"
            onClick={handleDownload}
            aria-label={`Download ${selectedCount} selected files`}
          >
            <div className="download-button-content">
              <FiDownload size={24} aria-hidden="true" />
              <span>Download Selected</span>
            </div>
          </button>
        )}
      </div>
      <table className="file-table" id="file-table" aria-label="File list">
        <thead>
          <tr>
            <th />
            <th scope="col">Name</th>
            <th scope="col">Device</th>
            <th scope="col">Path</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <FileTableRow
              key={file.name}
              file={file}
              selected={selectedFiles.has(file.name)}
              onSelect={handleSelect}
              selectable={file.status === FileStatus.available}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};
