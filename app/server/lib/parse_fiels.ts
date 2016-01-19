export const parseFields = (data: any): Object => {
  return Object.keys(data).reduce((fields, key, index) => {
    if (key === 'utf8') {
      return fields;
    }

    return Object.assign({}, fields, {
      [sanitizeKey(key)]: { '.value': data[key], '.priority': index }
    });
  }, {});
}

const sanitizeKey = (key: string): string => {
  return key.replace(/[\.\#\$\/\[\]]/g, '');
}
