import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user: JwtPayload
        }
    }
}

// video 27.11 custom property to request parameter