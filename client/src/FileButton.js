import React, { useState } from "react";
import { FaFile } from "react-icons/fa";
import { Button } from "react-bootstrap";

function FileButton({ fileUrl }) {
  const [clicked, setClicked] = useState(false);

  const buttonClass = clicked ? "outline-secondary" : "outline-success";

  const openFile = () => {
    setClicked(true);
    window.open(fileUrl, "_blank");
  };

  return (
    <Button variant={buttonClass} disabled={!fileUrl} onClick={openFile}>
      <FaFile className='mr-1' />
      {fileUrl ? "Open File in New Tab" : "No File is Available"}
    </Button>
  );
}

export default FileButton;
