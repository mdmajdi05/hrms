import { Candidate } from '../../../models/Candidate';
import { authMiddleware } from '../../../lib/auth';

const handler = async (request) => {
  try {
    const user = request.user;
    let submissions;

    if (user.role === 'user') {
      submissions = await Candidate.getSubmissions(user.userId);
    } else {
      submissions = await Candidate.getSubmissions();
    }

    return Response.json(submissions);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
};

export const GET = authMiddleware(handler);