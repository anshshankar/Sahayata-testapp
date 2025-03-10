import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
// import "./posts.css";
import { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default function Post() {
  const data = {location:"lukhnow"}
  const [ImageUpload, setImageUpload] = useState(null);
  const [ImageList, setImageList] = useState([]);
  const ImageListRef = ref(storage, "images/");
  const UploadImage = () => {
    if (ImageUpload == null) return;
    const imageRef = ref(storage, "image/${imageUpload.name+v$()}");
    uploadBytes(imageRef, ImageUpload).then(() => {
      alert("Image Uploaded");
    });
  };
  useEffect(() => {
    listAll(ImageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="fixed bottom-0 right-0 mr-5 mb-4">
      <label class="btn btn-circle modal-button" htmlFor="my-modal-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-full w-full text-purple-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-4" class="modal-toggle" />
      <label for="my-modal-4" class="modal cursor-pointer">
        <div className="w-[400px] h-[400px]  bg-slate-400 flex-col align-center justify-self-center rounded-xl py-4 mx-4 ">
          <div className="flex flex-col pt-4 ">
            <div class="form-control">
              <label class="input-group">
                <span class="">Text here</span>
                <input
                  type="text"
                  class="input input-bordered"
                />
              </label>
            </div>
            {/* <input type="text"  placeholder='title' className="rounded-xl m-2" /> */}
          </div>
          <div className=" h-[100px] bg-white  rounded-xl mt-8 ">
            <input type="file" placeholder="Insert Image" className="p-2" />
            <button onClick={UploadImage} className="btn btn-primary mt-5" onChange={(event) => {
                  setImageUpload(event.target.files[0])}}>Submit</button>
          </div>
          {/* <div class="dropdown dropdown-hover  mt-8">
                <label tabindex="0" class="btn bg-white m-1 text-black" onChange={(event) => {
                       setImageUpload(event.target.file[0]);
                  }}>
                  Select Location
                </label>
                <ul
                  tabindex="0"
                  class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </div> */}
        </div>
      </label>

      {/* <label htmlFor="my-modal-4" className="modal cursor-pointer">
      </label> */}
    </div>
  );
}
