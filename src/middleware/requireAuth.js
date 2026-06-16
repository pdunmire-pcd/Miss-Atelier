// Reusable authorization middleware.
//
// Checks session state (req.session.userId) to decide whether a request is
// allowed through. Response behavior depends on the type of route:
//   - API routes (path begins with /api): respond 401 Unauthorized as JSON.
//   - SSR pages: redirect unauthenticated users to /login.
export default function requireAuth(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    }

    // API requests get a JSON 401; SSR pages get redirected to the login form.
    if (req.originalUrl.startsWith('/api')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    return res.redirect('/login');
}
