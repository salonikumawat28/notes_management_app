import { useState } from "react";
import EditableNote from "./EditableNote";

function CreateNote() {
  const [isExpanded, setExpanded] = useState(false);

  function expandEditableNote() {
    if (!isExpanded) {
      setExpanded(true);
    }
  }

  return (
    <div onClick={() => expandEditableNote()}>
      <EditableNote isExpanded={isExpanded} onOutsideClick={() => setExpanded(false)} />
    </div>
  );
}

export default CreateNote;
