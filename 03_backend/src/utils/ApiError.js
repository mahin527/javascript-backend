class ApiError extends Error {
    constructor(
        statusCode,
        message = 'Something went wrong!',
        errors = [],
        stack = ''
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}

/* 
## Use this file :
```
catch (error) {
    throw new ApiError(500, 'Something went wrong while generating access and refresh tokens!')
}
```
## If you want, you can use `next(error)` instead of `throw` , so that Express's error-handling middleware works.
```
catch (error) {
    next(new ApiError(500, 'Failed to generate tokens', [error.message]))
}
```
## Then create a middleware (src/middlewares/errorHandler.js):
```
import { ApiError } from '../utils/ApiError.js'

export const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        })
    }

    // fallback for unexpected errors
    return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        errors: [err.message]
    })
}

```
*/
