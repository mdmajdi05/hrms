import { HR } from '../../../../models/HR';
import { generateToken } from '../../../../lib/auth';

// Default admin credentials (in production, use proper admin management)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

export async function POST(request) {
  try {
    const { role, username, password } = await request.json();

    if (!username || !password) {
      return Response.json({ error: 'Username and password required' }, { status: 400 });
    }

    if (role === 'admin') {
      // Check against default admin credentials
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        const token = generateToken({ 
          username: username, 
          role: 'admin',
          userId: 'admin'
        });

        return Response.json({ 
          message: 'Admin login successful', 
          token,
          role: 'admin',
          username: username
        });
      } else {
        return Response.json({ error: 'Invalid admin credentials' }, { status: 401 });
      }
    } else if (role === 'hr') {
      const hrAccount = await HR.findHRAccount(username);
      if (!hrAccount) {
        return Response.json({ error: 'HR account not found' }, { status: 404 });
      }

      const bcrypt = require('bcryptjs');
      const isValidPassword = await bcrypt.compare(password, hrAccount.password);
      if (!isValidPassword) {
        return Response.json({ error: 'Invalid password' }, { status: 401 });
      }

      const token = generateToken({ 
        username: hrAccount.username, 
        role: 'hr',
        userId: hrAccount._id || hrAccount.username
      });

      return Response.json({ 
        message: 'HR login successful', 
        token,
        role: 'hr',
        username: hrAccount.username
      });
    } else {
      return Response.json({ error: 'Invalid role' }, { status: 400 });
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
