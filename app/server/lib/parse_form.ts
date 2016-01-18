export function parseForm(data: any): any {
  var result = {};

  Object.keys(data).filter(key => key != 'utf8').forEach((key, index) => {
    result[sanitizeKey(key)] = { '.value': data[key], '.priority': index };
  });

  return result;
}

function sanitizeKey(key: string): string {
  return key.replace(/[\.\#\$\/\[\]]/g, '');
}
