class AppError extends Error{
    constructor(message,statusCode){
        //call parent constructor using super
        super(message)//message parameter is accepted by built-in error
        this.statusCode = statusCode;
        this.status = `${statusCode}` .startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;