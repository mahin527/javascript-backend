/*
The main goal of `asyncHandler` is to eliminate repetitive `try/catch` and send errors to central middleware. 
So that the controller code remains clean.
## Main advantages
1. DRY principle (Don’t Repeat Yourself) → you don’t have to write `try/catch` repeatedly.
2. Centralized error handling → all errors will go to middleware in one place.
3. Clean controllers → the controller will focus only on business logic.
4. Scalability → it is easy to maintain consistent error flow in large projects.
*/

// Best practice
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error))
    }
}

export { asyncHandler }

/*
## Example usage

```
// controller
const registerUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body)
    res.status(201).json(new ApiResponse(201, user, "User registered successfully"))
})

// middleware
app.use(errorHandler)

```
*/


/*
## second version of asyncHandler (The second version sends a direct response, but it is not flexible) :
```
const asyncHandler = (func) => async (req, res, next) => {
    try {
        await func(req, res, next)
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

```

*/
