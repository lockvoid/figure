import * as jwt from 'jsonwebtoken';

export function signUser(user) {
  return jwt.sign({ userId: user.id }, process.env['JWT_SECRET'], { expiresIn: '30d' });
}
