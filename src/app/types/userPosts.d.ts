import { Comment } from "./posts";

export interface UserPostss {
    message:        string;
    paginationInfo: PaginationInfo;
    posts:          Post[];
}

export interface PaginationInfo {
    currentPage:   number;
    numberOfPages: number;
    limit:         number;
    total:         number;
}

export interface Post {
    _id:       string;
    body:      string;
    user:      User;
    createdAt: Date;
    comments:  Comment[];
    id:        string;
    image?:    string;
}

export interface User {
    _id:   string;
    name:  string;
    photo: string;
}
