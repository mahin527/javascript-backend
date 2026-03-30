**Here I show how `asyncHandler` + `ApiError` + `ApiResponse` + `errorHandler` middleware work together, so that your controller stays clean and error/success always goes in a consistent format.**

---

## 1. ApiError.js
```js
class ApiError extends Error {
    constructor(statusCode, message = 'Something went wrong!', errors = [], stack = '') {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.success = false
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }
```

---

## 2. ApiResponse.js
```js
class ApiResponse {
    constructor(statusCode, data = null, message = 'Success!') {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode >= 200 && statusCode < 300
    }
}

export { ApiResponse }
```

---

## 3. asyncHandler.js
```js
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
               .catch((error) => next(error))
    }
}

export { asyncHandler }
```

---

## 4. errorHandler middleware
```js
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

---

## 5. Controller Example
```js
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import User from '../models/user.model.js'

const registerUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required")
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new ApiError(409, "User already exists")
    }

    const user = await User.create({ email, password })

    return res.status(201).json(
        new ApiResponse(201, user, "User registered successfully")
    )
})

export { registerUser }
```

---

## 6. Express App Integration
```js
import express from 'express'
import { errorHandler } from './middlewares/errorHandler.js'
import { registerUser } from './controllers/user.controller.js'

const app = express()
app.use(express.json())

app.post('/register', registerUser)

// global error handler (must be last)
app.use(errorHandler)

app.listen(3000, () => console.log("Server running on port 3000"))
```

---

### 🔑 Flow Summary1. 

**Controller** will write only business logic → if there is an error `throw new ApiError(...)`.

2. **asyncHandler** will send the error to the middleware without try/catch.

3. **errorHandler middleware** will convert all errors to consistent JSON format.

4. **ApiResponse** will send the success response in consistent format.

👉 As a result, success and error will always go to the same structure in your entire project. Controller will be clean, and debugging will be easy. 

---

