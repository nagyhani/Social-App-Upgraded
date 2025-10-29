export interface UserProfile {
    message: string;
    user:    User;
}

export interface User {
    _id:         string;
    name:        string;
    email:       string;
    dateOfBirth: Date;
    gender:      string;
    photo:       string;
    createdAt:   Date;
}
