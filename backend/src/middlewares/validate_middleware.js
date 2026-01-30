export const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        // Console par dekho ki Zod kya bol raha hai
        console.log("Zod Error Details:", err);

        // Zod ke errors 'issues' naam ke array mein hote hain
        const status = 400;
        const message = err.issues ? err.issues[0].message : "Validation Error";
        
        return res.status(status).json({
            success: false,
            message: message
        });
    }
};