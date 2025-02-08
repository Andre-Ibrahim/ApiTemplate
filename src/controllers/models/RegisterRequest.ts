type RegisterRequest = {
    username: string,
    email: string,
    password: string
}

enum Role {
    Admin = "Admin",
    User = "User",
    Other = "Other"
}

export { RegisterRequest, Role }