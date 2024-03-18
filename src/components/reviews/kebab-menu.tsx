import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import toast from "react-hot-toast";
import { deleteReview } from "@/server-actions/reviews";

export const KebabMenu = ({
  reviewId,
  businessId,
}: {
  reviewId: string;
  businessId: string;
}) => {
  const [toggleDeleteReviewModal, setToggleDeleteReviewModal] =
    useState<boolean>(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleDeleteModal = () => {
    setToggleDeleteReviewModal(!toggleDeleteReviewModal);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  const handleDeleteReview = async ({ reviewId }: { reviewId: string }) => {
    try {
      const deleteReviewStatus = await deleteReview(reviewId);
      if (deleteReviewStatus.status === 200) {
        toast.success("Review Deleted!");
        toggleDeleteModal();
      }
    } catch (error) {
      toast.error("Delete failed..");
    }
  };

  return (
    <>
      <div className="relative">
        <MoreVertical
          size={18}
          onClick={toggleDropdown}
          className="cursor-pointer"
        />
        {isDropdownVisible && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 overflow-hidden whitespace-nowrap rounded-lg bg-white shadow-lg">
            <button
              id="Delete Review"
              onClick={toggleDeleteModal}
              className=" block cursor-pointer px-4 py-2 hover:bg-orange/50">
              <span className="  text-sm font-medium text-orange">
                Delete Review
              </span>
            </button>
          </div>
        )}
      </div>
      {toggleDeleteReviewModal && (
        <div className="modal-center absolute flex flex-col justify-center rounded-3xl bg-white">
          <span className="text-lg font-medium text-orange">
            Are you sure you want to delete this review?
          </span>
          <div className="mt-4 flex justify-end gap-2">
            <button
              id="Confirm Delete Review"
              onClick={async () => handleDeleteReview({ reviewId })}
              className="rounded-3xl bg-orange px-2 py-1 font-medium text-white hover:bg-orange-800">
              Yes, delete
            </button>
            <button
              id="Cancel Delete Review"
              onClick={toggleDeleteModal}
              className="cursor-pointer rounded-3xl border px-2 py-1 hover:bg-neutral active:bg-neutral">
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};
