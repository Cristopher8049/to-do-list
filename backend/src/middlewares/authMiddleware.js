// import SupabaseClient from '../config/supabaseClient.js';

// const supabase = SupabaseClient.getClient();

// export const authMiddleware = async (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//         return res.status(401).json({ message: 'Missing Authorization header' });
//     }

//     const token = authHeader.split(' ')[1];

//     const { data: { user }, error } = await supabase.auth.getUser(token);

//     if (error || !user) {
//         return res.status(401).json({ message: 'Invalid or expired token' });
//     }

//     req.user = user;
//     next();
// };