import { Pagination } from "./users";

export interface Feedback {
  rating: number;
  comment: string;
  user?: {
    "userImage": string;
  };
}

export interface FeedbacksResponse {
  length: number;
  pagination: Pagination;
  data: Feedback[];
}
