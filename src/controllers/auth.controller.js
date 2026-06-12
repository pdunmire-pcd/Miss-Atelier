import { registerUser, loginUser } from '../services/user.service.js';

export function getRegister(req, res) {
    res.render('register', {error: null});
}

export async function postRegister(req, res) {
    try {
        const { email, password } = req.body;
        await registerUser(email, password);
        res.redirect('/login');
    } catch (err) {
        res.render('register', { error: err.message });
    }
}

export function getLogin(req, res) {
    res.render('login', {error: null});
}

export async function postLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await loginUser(email, password);
        req.session.userId = user.id;
        res.redirect('/account');
    } catch (err) {
        res.render('login', { error: err.message });
    }
}

export function logout(req, res) {
    req.session.destroy(() => {
        res.redirect('/');
    });
}