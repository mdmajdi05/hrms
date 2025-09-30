import { User } from '../../../../models/User';
import { generateToken } from '../../../../lib/auth';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return Response.json({ error: 'Username and password required' }, { status: 400 });
    }

    const user = await User.findUser(username);
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const isValidPassword = await User.verifyPassword(password, user.password);
    if (!isValidPassword) {
      return Response.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = generateToken({ 
      username: user.username, 
      role: user.role,
      userId: user._id || user.username
    });

    return Response.json({ 
      message: 'Login successful', 
      token,
      role: user.role,
      username: user.username
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}