import * as authService from '../services/authService.js';

export async function register(req, res) {
    const { email, password } = req.body;
    try {
        const payload = await authService.registerUser(email, password);
        res.status(201).json(payload);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    try {
        const payload = await authService.loginUser(email, password);
        res.json(payload);
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}