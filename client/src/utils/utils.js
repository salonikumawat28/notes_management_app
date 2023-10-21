export function sort(map, sortByKey = "modified") {
    // Check if 'map' is an object
    if (typeof map !== 'object' || map === null || Array.isArray(map)) {
      console.warn("Invalid input. Expected an object.");
      return map;
    }
  
    // Check if sortByKey is present in all objects inside the map
    const isSortKeyValid = Object.values(map).every(
      (value) => typeof value === 'object' && value !== null && sortByKey in value
    );
  
    if (!isSortKeyValid) {
      console.warn(`Invalid sortByKey: ${sortByKey}. Not present in all objects.`);
      return map;
    }
  
    // Sort the map by sortByKey
    return Object.fromEntries(
      Object.entries(map).sort(
        ([key1, note1], [key2, note2]) => note2[sortByKey] - note1[sortByKey]
      )
    );
  }
  