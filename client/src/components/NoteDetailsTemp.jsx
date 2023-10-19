import React from 'react';

function NoteDetailsTemp({note}) {
    if (!note) {
        return <div>Select a note to view details</div>;
      }
    return (
        <div>
            <h2>Note Details</h2>
            <p>{note.content}</p>
        </div>
    );
}

export default NoteDetailsTemp;