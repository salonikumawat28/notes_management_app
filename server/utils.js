function filterObjectFields(originalObject, fieldsToInclude) {
    return Object.fromEntries(
      Object.entries(originalObject).filter(([key, value]) => fieldsToInclude.includes(key) && value !== undefined)
    );
  }

const utils = {
    filterObjectFields
};

module.exports = utils;