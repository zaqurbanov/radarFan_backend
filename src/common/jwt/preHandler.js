import { SessionExpiredError } from "../error/appErrors.js";
export const jwt_preHandler = (app) => {
    app.addHook('preHandler', async (req, res) => {
        try {
            await req.jwtVerify();
        }
        catch (error) {
            throw new SessionExpiredError();
        }
    });
};
//# sourceMappingURL=preHandler.js.map