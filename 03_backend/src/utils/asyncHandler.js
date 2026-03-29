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
