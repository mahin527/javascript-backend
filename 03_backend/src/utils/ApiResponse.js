class ApiResponse {
    constructor(statusCode, data, message = 'Success!') {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export { ApiResponse }

/*
## Static helper methods
To make the code even cleaner, you can create static methods like `ApiResponse.success()` and `ApiResponse.error()`.
```
class ApiResponse {
    constructor(statusCode, data = null, message = 'Success!') {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode >= 200 && statusCode < 400
    }

    static success(data, message = 'Success!', statusCode = 200) {
        return new ApiResponse(statusCode, data, message)
    }

    static error(message = 'Error!', statusCode = 500, data = null) {
        return new ApiResponse(statusCode, data, message)
    }
}
```

## It will be used like this: 
```
return res.status(201).json(
    ApiResponse.success(createdUser, 'User registered successfully', 201)
)

```
*/
