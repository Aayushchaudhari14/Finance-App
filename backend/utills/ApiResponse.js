class ApiResponse{
    constructor(statusCode,data,message="Success")
    {
       this.statusCode = statusCode,
       this.data = data,
       this.message = message,
       this.succces= statusCode < 400
    }
}

module.exports = ApiResponse;