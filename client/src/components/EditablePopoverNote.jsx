import EditableNote from "./EditableNote";
import "../css/EditablePopoverNote.css";

function EditablePopoverNote({ note, onOutsideClick }) {
  console.log("Editable popover note: ", note);
  return (
    <div>
      {/* onClick={onOutsideClick} */}
      <div className="backdrop"></div>
      <div className="popover">
        <EditableNote initialNote={note} onOutsideClick={onOutsideClick}/>
      </div>
    </div>
  );
}

export default EditablePopoverNote;
