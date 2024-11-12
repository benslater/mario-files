import { FileTable } from "./components/FileTable";
import { FileStatus } from "./types";

import "./app.css";

const sampleFiles = [
  {
    name: "smss.exe",
    device: "Mario",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
    status: FileStatus.scheduled,
  },
  {
    name: "netsh.exe",
    device: "Luigi",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
    status: FileStatus.available,
  },
  {
    name: "uxtheme.dll",
    device: "Peach",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    status: FileStatus.available,
  },
  {
    name: "aries.sys",
    device: "Daisy",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys",
    status: FileStatus.scheduled,
  },
  {
    name: "cryptbase.dll",
    device: "Yoshi",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
    status: FileStatus.scheduled,
  },
  {
    name: "7za.exe",
    device: "Toad",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: FileStatus.scheduled,
  },
];

function App() {
  return (
    <div className="app">
      <FileTable files={sampleFiles} />
    </div>
  );
}

export default App;
