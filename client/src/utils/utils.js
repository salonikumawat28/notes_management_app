function sort(array, sortByKey = "_updatedAt") {
  // Check if 'array' is an array
  if (!Array.isArray(array)) {
    console.warn("Invalid input. Expected an array.");
    return array;
  }

  // Check if sortByKey is present in all objects inside the array
  const isSortKeyValid = array.every(
    (item) => typeof item === 'object' && item !== null && sortByKey in item
  );

  if (!isSortKeyValid) {
    console.warn(`Invalid sortByKey: ${sortByKey}. Not present in all objects.`);
    return array;
  }

  // Check if sortByKey is a valid date property in all objects
  const isDatePropertyValid = array.every(
    (item) => {
      const dateValue = new Date(item[sortByKey]);
      return !isNaN(dateValue.getTime());
    }
  );

  if (!isDatePropertyValid) {
    console.warn(`Invalid date property: ${sortByKey}. Not a valid date in all objects.`);
    return array;
  }

  // Sort the array by sortByKey
  return array.slice().sort(
    (item1, item2) => {
      const date1 = new Date(item1[sortByKey]);
      const date2 = new Date(item2[sortByKey]);
      return date2 - date1;
    }
  );
}

function addOrUpdateNote(newNote, notes) {
  const index = notes.findIndex((note) => note._id === newNote._id);

  if (index !== -1) {
    // If the note with the same _id already exists, update it and move to the top
    const updatedNotes = [
      { ...newNote },
      ...notes.slice(0, index),
      ...notes.slice(index + 1)
    ];
    return updatedNotes;
  } else {
    // If the note with the same _id doesn't exist, add the new note to the top
    return [newNote, ...notes];
  }
}


const utils = {
  sort,
  addOrUpdateNote
}

export default utils;