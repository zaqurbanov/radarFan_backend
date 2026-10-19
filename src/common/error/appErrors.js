export class AppErrors extends Error {
    message;
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}
export class NotFoundError extends AppErrors {
    constructor(message) {
        super(message, 404);
    }
}
export class BadRequestError extends AppErrors {
    constructor(message) {
        super(message, 400);
    }
}
export class UnauthorizedError extends AppErrors {
    constructor(message = "Unauthorized, Invalid Input") {
        super(message, 401);
    }
}
export class SessionExpiredError extends AppErrors {
    constructor(message = "Session Expired , The session has been expired") {
        super(message, 401);
    }
}
export class AccessDenied extends AppErrors {
    constructor(message = "Access Denied") {
        super(message, 403);
    }
}
//# sourceMappingURL=appErrors.js.map