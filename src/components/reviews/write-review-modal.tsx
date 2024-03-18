"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import RatingChooser from "./rating-chooser";
import { createReview } from "@/server-actions/reviews";
import ImageFill from "../image-fill";

export const WriteReviewModal = ({
  name,
  type,
  writeReviewToggle,
  id,
  setWriteReviewToggle,
}: {
  name: string;
  type: string;
  id: string;
  writeReviewToggle: boolean;
  setWriteReviewToggle: (toggle: boolean) => void;
}) => {
  const { user, isSignedIn } = useUser();
  const [overall, setOverall] = useState<number>(5);

  const reviewId = nanoid(20);

  const [aspects, setAspects] = useState(
    type === "Market"
      ? [
          { id: nanoid(20), name: "Facility", rating: 5 },
          { id: nanoid(20), name: "Safety", rating: 5 },
          { id: nanoid(20), name: "Convenience", rating: 5 },
          { id: nanoid(20), name: "Culture", rating: 5 },
        ]
      : type === "Vendor"
        ? [
            { id: nanoid(20), name: "Taste", rating: 5 },
            { id: nanoid(20), name: "Hygiene", rating: 5 },
            { id: nanoid(20), name: "Service", rating: 5 },
            { id: nanoid(20), name: "Price", rating: 5 },
          ]
        : []
  );

  const [reviewContent, setReviewContent] = useState<string>("");

  const submitReview = async () => {
    if (!isSignedIn) {
      toast.error("Please Sign in to Write Reviews");
      return;
    }

    const createReviewStatus = await createReview({
      reviewData: {
        id: reviewId,
        rating: overall,
        content: reviewContent,
        authorId: user.id,
      },
      reviewAspects: aspects.map((aspect) => ({
        ...aspect,
        reviewId,
      })),
      id: id,
      type,
    });

    if (
      createReviewStatus?.status === 409 ||
      createReviewStatus?.status === 404 ||
      createReviewStatus?.status === 500
    ) {
      toast.error(createReviewStatus?.message);
    } else if (createReviewStatus?.status === 200) {
      toast.success(createReviewStatus?.message);
      setWriteReviewToggle(!writeReviewToggle);
    }
  };

  const handleAspectRatingChange = (index: number, newRating: number) => {
    const updatedAspects = aspects.map((aspect, idx) =>
      idx === index ? { ...aspect, rating: newRating } : aspect
    );
    setAspects(updatedAspects);
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-40 h-screen w-full overflow-auto bg-neutral">
        <div className="flex items-center  gap-6 bg-white p-5">
          <ArrowLeft
            className=" shrink-0"
            size={26}
            onClick={() => setWriteReviewToggle(!writeReviewToggle)}
          />
          <div className=" truncate whitespace-nowrap pr-10 text-xl font-bold">
            <span>{`Rate ${name}`}</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-b-3xl bg-white pb-6">
          <ImageFill
            src={`${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL}/storage/v1/object/public/public-assets/${type === "Market" ? "markets" : "vendors"}/${id}/banner`}
            alt={`${name} Banner`}
            className="rounded-3xl h-[138px] w-[350px]"
          />
          <div className="mt-4">
            <span className="text-lg font-bold">{`How would you rate this ${type} overall?`}</span>
            <div className="mt-4 flex justify-center">
              <RatingChooser setRating={setOverall} rating={overall} />
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-col justify-start rounded-3xl bg-white p-4 md:items-center">
          <div>
            <span className="text-lg font-bold">
              How would you rate each aspect of it?
            </span>
            <div className="mt-3 flex w-fit flex-col items-end gap-4">
              {aspects?.map((aspect, index) => (
                <div key={index} className="flex items-center">
                  <span className="font-medium">{aspect.name}</span>
                  <RatingChooser
                    className="ml-10 gap-2"
                    size={20}
                    rating={aspect.rating}
                    setRating={(rating) =>
                      handleAspectRatingChange(index, rating)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-col justify-start rounded-3xl bg-white p-4 md:items-center">
          <span className="text-lg font-bold">Drop your review here.</span>
          <input
            type="textarea"
            placeholder="Write your review..."
            className="mt-3 rounded-3xl bg-neutral px-5 py-4"
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          />
        </div>
        <div className="mb-8 mt-4 flex justify-center items-center flex-col">
          <button
            id="Write a Review Button"
            className="rounded-3xl bg-yellow px-4 py-2"
            onClick={submitReview}>
            <span className="text-xl font-bold">Submit review.</span>
          </button>

          <button
            onClick={() => setWriteReviewToggle(false)}
            className="mt-4 border-2 rounded-3xl px-4 py-2">
            <span className="font-medium text-lg">Close.</span>
          </button>
        </div>
      </div>
    </>
  );
};
