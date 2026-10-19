let isShuttingDown = false;
const shutdownHelper = async (signal, app) => {
    if (isShuttingDown) {
        app.log.warn("Shutdown in progress, do not send another signal");
        return;
    }
    isShuttingDown = true;
    const timeOut = setTimeout(() => {
        app.log.error("Shutdown timed out");
        process.exit(1);
    }, 10000);
    app.log.info(`${signal} signal received, shutting down...`);
    try {
        await app.close();
        app.log.info("Shutdown successful");
        clearTimeout(timeOut);
        process.exit(0);
    }
    catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};
export default shutdownHelper;
//# sourceMappingURL=shutdown.helper.js.map