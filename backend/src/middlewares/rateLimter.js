
import rateLimit from "express-rate-limit";

const authLimiter = rateLimit(
    {
        windowMs : 15 * 60 * 1000,
        max : 5,
        message : "Too many step attempts, try again after 15 minute"
    }
)


export default authLimiter