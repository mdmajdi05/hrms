import { connectToDatabase } from '../lib/mongodb';
import bcrypt from 'bcryptjs';

export class HR {
  static async createHRAccount(username, password, createdBy) {
    const { db, usingFallback } = await connectToDatabase();
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const hrAccount = {
      username,
      password: hashedPassword,
      role: 'hr',
      createdBy,
      createdAt: new Date()
    };

    if (usingFallback) {
      if (db.hrAccounts.has(username)) {
        throw new Error('HR account already exists');
      }
      db.hrAccounts.set(username, hrAccount);
      return hrAccount;
    } else {
      const existingHR = await db.collection('hr_accounts').findOne({ username });
      if (existingHR) {
        throw new Error('HR account already exists');
      }
      const result = await db.collection('hr_accounts').insertOne(hrAccount);
      return { ...hrAccount, _id: result.insertedId };
    }
  }

  static async findHRAccount(username) {
    const { db, usingFallback } = await connectToDatabase();
    
    if (usingFallback) {
      return db.hrAccounts.get(username);
    } else {
      return await db.collection('hr_accounts').findOne({ username });
    }
  }
}