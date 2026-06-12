import bcyrpt from 'bcrypt';
import { createUser, getUserByEmail} from '..model/user.repo.js';

export async registerUser(email, passowrd) {
    const existing = await getUserByEmail(email);
    if(existing) {
        throw new Error('User already registered');
    }
    const passwordHash = await bcyrpt.hash(password, 10);
    return await createUser(email, passwordHash);
}

export async function LoginUser(email,password) {
    const user = await getUserByEmail(email);
    if(!user) {
        throw new Error('Invalid email or password');
    }
    const match = await bcyrpt.compare(password, user.password_hash);
    if(!match) {
        throw new Error('Invalid email or password');
    }
    return user;
}