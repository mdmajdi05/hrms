import { HR } from '../../../../models/HR';
import { authMiddleware } from '../../../../lib/auth';

const handler = async (request) => {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return Response.json({ error: 'Username and password required' }, { status: 400 });
    }

    if (request.user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const hrAccount = await HR.createHRAccount(username, password, request.user.username);

    return Response.json({ 
      message: 'HR account created successfully',
      username: hrAccount.username
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
};

export const POST = authMiddleware(handler);
