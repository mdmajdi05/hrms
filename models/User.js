import { connectToDatabase } from '../lib/mongodb';
import bcrypt from 'bcryptjs';

export class User {
  static async createUser(username, password) {
    const { db, usingFallback } = await connectToDatabase();
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = {
      username,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date()
    };

    if (usingFallback) {
      if (db.users.has(username)) {
        throw new Error('User already exists');
      }
      db.users.set(username, user);
      return user;
    } else {
      const existingUser = await db.collection('users').findOne({ username });
      if (existingUser) {
        throw new Error('User already exists');
      }
      const result = await db.collection('users').insertOne(user);
      return { ...user, _id: result.insertedId };
    }
  }

  static async findUser(username) {
    const { db, usingFallback } = await connectToDatabase();
    
    if (usingFallback) {
      return db.users.get(username);
    } else {
      return await db.collection('users').findOne({ username });
    }
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}