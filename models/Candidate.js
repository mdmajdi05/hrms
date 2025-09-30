import { connectToDatabase } from '../lib/mongodb';

export class Candidate {
  static async createSubmission(candidateData, userId) {
    const { db, usingFallback } = await connectToDatabase();
    
    const submission = {
      ...candidateData,
      userId,
      status: 'pending',
      submittedAt: new Date(),
      id: `CAND${Date.now()}${Math.random().toString(36).substr(2, 5)}`.toUpperCase()
    };

    if (usingFallback) {
      db.candidates.set(submission.id, submission);
      console.log('DEBUG: Candidate saved to fallback with id', submission.id);
      return submission;
    } else {
      const result = await db.collection('candidates').insertOne(submission);
      console.log('DEBUG: Candidate saved to MongoDB with id', result.insertedId);
      return { ...submission, _id: result.insertedId };
    }
  }

  static async getSubmissions(userId = null) {
    const { db, usingFallback } = await connectToDatabase();
    
    if (usingFallback) {
      const submissions = Array.from(db.candidates.values());
      return userId ? submissions.filter(sub => sub.userId === userId) : submissions;
    } else {
      const query = userId ? { userId } : {};
      return await db.collection('candidates').find(query).sort({ submittedAt: -1 }).toArray();
    }
  }

  static async getSubmissionById(id) {
    const { db, usingFallback } = await connectToDatabase();
    
    if (usingFallback) {
      return db.candidates.get(id);
    } else {
      return await db.collection('candidates').findOne({ id });
    }
  }

  static async deleteSubmissionById(id, requestingUser) {
    const { db, usingFallback } = await connectToDatabase();

    if (usingFallback) {
      const existing = db.candidates.get(id);
      if (!existing) return { deleted: false };
      // Allow delete if user owns it or user role is admin/hr will be checked by route
      db.candidates.delete(id);
      console.log('DEBUG: Candidate deleted from fallback with id', id);
      return { deleted: true };
    } else {
      const result = await db.collection('candidates').deleteOne({ id });
      console.log('DEBUG: Candidate delete result', result.deletedCount);
      return { deleted: result.deletedCount > 0 };
    }
  }
}