function filterFields(originalObject, fieldsToInclude) {
    return Object.fromEntries(
      Object.entries(originalObject).filter(([key, value]) => fieldsToInclude.includes(key) && value !== undefined)
    );
  }

function trimFields(originalObject, fieldsToTrim) {
  fieldsToTrim.forEach(field => {
    if (originalObject[field] !== undefined && typeof originalObject[field] === 'string') {
      originalObject[field] = originalObject[field].trim();
    }
  });
}

function convertFieldsToLowerCase(originalObject, fieldsToConvertToLowerCase) {
  fieldsToConvertToLowerCase.forEach(field => {
    if (originalObject[field] !== undefined && typeof originalObject[field] === 'string') {
      originalObject[field] = originalObject[field].toLowerCase();
    }
  });
}

const utils = {
    filterFields,
    trimFields,
    convertFieldsToLowerCase,
};

module.exports = utils;