export const limitHelper = (queryLimit) => {
    const requested_limit = Number(queryLimit);
    const limit = Number.isInteger(requested_limit) && requested_limit >
        0 ? Math.min(requested_limit, 50) : 20;
    return limit;
};
//# sourceMappingURL=limit.helper.js.map