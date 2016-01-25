const chars = '0123456789abcdefghijklmnopqrstuvwxyz';

export const generateSecret = (length = 16): string => {
  var result = '';

  for (var i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

