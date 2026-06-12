import bcrypt from 'bcrypt';
import { createUser, getUserByEmail} from '../model/user.repo.js';

export async function registerUser(email, password) {
    const existing = await getUserByEmail(email);
    if(existing) {
        throw new Error('User already registered');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    return await createUser(email, passwordHash);
}

export async function loginUser(email,password) {
    const user = await getUserByEmail(email);
    if(!user) {
        throw new Error('Invalid email or password');
    }
    const match = await bcrypt.compare(password, user.password_hash);
    if(!match) {
        throw new Error('Invalid email or password');
    }
    return user;
}