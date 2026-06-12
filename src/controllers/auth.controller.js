import { registerUser, loginUser } from '../services/user.service.js';

export function getRegister(req, res) {
    res.render('register', {title: 'Create Account', error: null});
}

export async function postRegister(req, res) {
    try {
        const { email, password } = req.body;
        await registerUser(email, password);
        res.redirect('/login');
    } catch (err) {
        res.render('register', { title: 'Create Account', error: err.message });
    }
}

export function getLogin(req, res) {
    res.render('login', { title: 'Login', error: null });
}

export async function postLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await loginUser(email, password);
        req.session.userId = user.id;
        res.redirect('/account');
    } catch (err) {
        res.render('login', { title: 'Login', error: err.message });
    }
}

export function logout(req, res) {
    req.session.destroy(() => {
        res.redirect('/');
    });
}