import { User } from '../../../../models/User';
import { generateToken } from '../../../../lib/auth';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return Response.json({ error: 'Username and password required' }, { status: 400 });
    }

    const user = await User.createUser(username, password);
    const token = generateToken({ 
      username: user.username, 
      role: user.role,
      userId: user._id || user.username
    });

    return Response.json({ 
      message: 'User created successfully', 
      token,
      role: user.role,
      username: user.username
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}