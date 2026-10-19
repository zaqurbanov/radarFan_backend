export declare class AppErrors extends Error {
    message: string;
    statusCode: number;
    constructor(message: string, statusCode: number);
}
export declare class NotFoundError extends AppErrors {
    constructor(message: string);
}
export declare class BadRequestError extends AppErrors {
    constructor(message: string);
}
export declare class UnauthorizedError extends AppErrors {
    constructor(message?: string);
}
export declare class SessionExpiredError extends AppErrors {
    constructor(message?: string);
}
export declare class AccessDenied extends AppErrors {
    constructor(message?: string);
}
//# sourceMappingURL=appErrors.d.ts.map