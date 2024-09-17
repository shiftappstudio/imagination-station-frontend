/* eslint-disable react/prop-types */
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { deleteImageSvc } from "./../services/image.service";

export const Thumbnail = ({
  index,
  id,
  url,
  setShowFullScreen,
  setFullScreenImage,
  updateImages,
  images,
  setImages,
  setRightContent,
}) => {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  return (
    <div
      className=" max-h-[128px] max-w-[128px] rounded-lg cursor-pointer overflow-hidden "
      onClick={(e) => {
        e.stopPropagation();
        setRightContent("selected-gallery");
        // TODO: set to true if you want to show full screen image
        setShowFullScreen(false);
        setFullScreenImage(url);
      }}
      onMouseEnter={() => setShowDeleteIcon(true)}
      onMouseLeave={() => setShowDeleteIcon(false)}
    >
      <div className="relative">
        {showDeleteIcon && (
          <button
            className="absolute -right-2 -top-2 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
            onClick={async (e) => {
              e.stopPropagation();
              const _prevData = [...images];
              _prevData.splice(index, 1);
              setImages(_prevData);
              await deleteImageSvc(id, url);
              updateImages();
            }}
          >
            <RxCross2 size={16} />
          </button>
        )}
        <img src={url} alt="" />
      </div>
    </div>
  );
};
