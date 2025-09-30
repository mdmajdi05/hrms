import { Candidate } from '../../../../models/Candidate';
import { authMiddleware } from '../../../../lib/auth';

const handler = async (request, context) => {
  try {
    console.log('DEBUG: submissions/[id] handler invoked', { method: request.method });
    try {
      // headers may be a Headers object in Next request
      const headers = {};
      for (const [k, v] of request.headers) headers[k] = v;
      console.log('DEBUG: incoming headers', headers);
    } catch (e) {
      console.log('DEBUG: could not enumerate headers', e && e.message);
    }
    // In Next.js app routes the route params are provided in the second `context` arg.
    const { params } = context || {};
    const id = params && params.id;

    if (request.method === 'DELETE') {
  console.log('DEBUG: delete request for id', id, 'user:', request.user);
      // authorization: user can delete own submission; admin/hr can delete any
      const user = request.user;
      const existing = await Candidate.getSubmissionById(id);
      if (!existing) return Response.json({ error: 'Not found' }, { status: 404 });

      if (user.role === 'user' && existing.userId !== user.userId) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }

      const res = await Candidate.deleteSubmissionById(id, user);
      if (res.deleted) return Response.json({ message: 'Deleted' });
      return Response.json({ error: 'Delete failed' }, { status: 500 });
    }

    // fallback: GET returns the single submission
    if (request.method === 'GET') {
      const submission = await Candidate.getSubmissionById(id);
      if (!submission) return Response.json({ error: 'Not found' }, { status: 404 });
      return Response.json(submission);
    }

    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
};

export const GET = authMiddleware(handler);
export const DELETE = authMiddleware(handler);
