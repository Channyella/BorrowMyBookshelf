import axios from "../api/axios";
import { GetAuthHeader, GetCurrentUser } from "../helpers/AuthHelper";
import { Review } from "../models/Review";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmModal from "./ConfirmModal";

interface ReviewsProps {
    reviews: Review[];
    setReviews: (reviews: Review[]) => void;
}
const Reviews: React.FC<ReviewsProps> = ({ reviews, setReviews }) => {
    const [showModal, setShowModal] = useState<number>(-1);
    const [reviewIdToDelete, setReviewIdToDelete] = useState<number | null>(null);


    const handleConfirm = async () => {
        setShowModal(-1);
        if (reviewIdToDelete) {
            const isDeleted = await deleteReview(reviewIdToDelete);
            if (!isDeleted) {
                console.log("Failed To Delete");
            }
        }
    };

    const deleteReview = async (reviewId: number) => {
        try {
            await axios.delete(`/api/reviews/${reviewId}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            setReviews(reviews.filter(review => review.reviewId != reviewId))
            console.log('Successfully deleted review');
            return true;
        } catch (error) {
            console.log('Error deleting review:', error);
            return false;
        }
    };

    const handleCancel = () => {
        setShowModal(-1);
    };

    const confirmDelete = (reviewId: number) => {
        setShowModal(reviewId);
        setReviewIdToDelete(reviewId);
    };

    const getOverallRating = (reviews: Review[]) => {
        const totalReviews = reviews.reduce((runningTotal: number, review: Review) => {
            return runningTotal + review.rating;
        }, 0);
        const averageReview = totalReviews / reviews.length;
        return renderStars(averageReview);
    }

    const renderStars = (rawRating: number) => {
        const rating = rawRating / 10;
        const fullStarsCount = Math.floor(rating);
        const emptyStarsCount = 5 - Math.ceil(rating);
        const stars = [];

        // Render full stars
        for (let i = 0; i < fullStarsCount; i++) {
            stars.push(<img key={`star-${i}`} src="/full_star.png" alt="Star" />);
        }

        // Render half star if applicable
        if (rating % 1 !== 0) {
            stars.push(<img key="half-star" src="/half_star.png" alt="Half Star" />);
        }

        // Render empty stars
        for (let i = 0; i < emptyStarsCount; i++) {
            stars.push(<img key={`empty-star-${i}`} src="/empty_star.png" alt="Empty Star" />);
        }

        return stars;
    };

    return (
        <div>
            <div className="review-header"> <h3 className="text-align-left">Reviews:</h3> <div> Overall Rating: {getOverallRating(reviews)} </div> </div>
            <div className="review-box">
                {reviews?.map(review =>
                    <div key={review.reviewId} className="review-item">
                        <div className="top-paragraph">
                            <p>{review.user.getFullName()} rated this book: {renderStars(review.rating)} </p>
                        </div>
                        <div className="d-flex review-body">
                            <div className="left-paragraph">
                                {review.startDate && (
                                    <p> Book started: {review.startDate ? review.startDate.toLocaleDateString() : ""}</p>
                                )}
                                {review.finishedDate && (
                                    <p>Book finished: {review.finishedDate ? review.finishedDate.toLocaleDateString() : ""}</p>
                                )}
                                {review.bookFormat && (
                                    <p> {review.user.firstName} read the {review.getBookFormatString()} version of this book.</p>
                                )}
                            </div>
                            {review.summary && (
                            <div className="review-notes-container">
                                <textarea
                                    id="review-notes"
                                    rows={5}
                                    value={review.summary || ''}
                                    className="review-notes"
                                    readOnly={true}
                                />
                                </div>)}
                        </div>
                        <div className="dates-container">
                            {review.updatedDate ? (
                                <p>Review updated on: {review.updatedDate ? review.updatedDate.toLocaleDateString() : ""}</p>
                            ) : (
                                <p>Review made on: {review.createDate ? review.createDate.toLocaleDateString() : ""}</p>
                            )}
                            {review.user.userId === GetCurrentUser()?.userId && (
                                <div className="button-container">
                                    <Link to={`/view-books/${review.book.bookId}/edit-review/${review.reviewId}`}>
                                        <button className="btn btn-primary"><img src="/edit.png" alt="Edit" /></button>
                                    </Link>
                                    <button onClick={() => confirmDelete(review.reviewId)} className="btn btn-primary"><img src="/delete.png" alt="Delete" /></button>
                                </div>
                            )}
                        {showModal == review.reviewId && (
                            <ConfirmModal
                                message="Are you sure you want to delete this review?"
                                onConfirm={handleConfirm}
                                onCancel={handleCancel}
                            />
                        )}
                    </div>
                </div>
                )}
                
                </div>
           
        </div >
    );
};
export default Reviews;