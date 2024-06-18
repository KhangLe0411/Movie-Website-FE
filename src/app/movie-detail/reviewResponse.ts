export interface ReviewResponse{
    id: number;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
    user: any;
}