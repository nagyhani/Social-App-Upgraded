export interface Posts {
    message:        string;
    paginationInfo: PaginationInfo;
    posts:          Post[];
}

export interface PaginationInfo {
    currentPage:   number;
    numberOfPages: number;
    limit:         number;
    nextPage:      number;
    total:         number;
}

export interface Post {
    _id:       string;
    body?:     string;
    image?:    string;
    user:      User;
    createdAt: Date;
    comments:  Comment[];
    id:        string;
}

export interface Comment {
    _id:            string;
    content:        string;
    commentCreator: User;
    post:           string;
    createdAt:      Date;
}

export interface User {
    _id:   string;
    name:  string;
    photo: string;
}