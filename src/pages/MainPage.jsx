import { Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { generateImageSvc, getImagesSvc } from "../services/image.service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Loader } from "./../components/loader/Loader";
import { RxCross1 } from "react-icons/rx";
import { Thumbnail } from "./../components/Thumbnail";
import "./style.css";
import saveAs from "file-saver";
// import { getRandomPrompt } from "./../data/prompt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendEmailSvc } from "./../services/emailjs.service";
import * as Yup from "yup";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";



export const MainPage = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [result, setResult] = useState("");
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [error, setError] = useState();
  const [startApp, setStartApp] = useState(false);
  // const [clickedButton, setClickedButton] = useState("");
  // const [randomPrompt, setRandomPrompt] = useState("");

  const [showAllImages, setShowAllImages] = useState(false);

  // Show All images
  const handleShowAllImages = () => {
    setShowAllImages(true);
  };

  // Less Action
  const handleReturn = () => {
    setShowAllImages(false);
  };

  

  const [rightContent, setRightContent] = useState("empty");
  const hasEffectRun = useRef(false);
  useEffect(() => {
    if (hasEffectRun.current) return;
    const _fetchImages = async () => {
      const _images = await getImagesSvc();
      setImages(_images);
      setStartApp(true);
    };
    _fetchImages();
    hasEffectRun.current = true;
  }, [startApp]);
  const downloadImage = async (/** @type {string} */ imageUrl) => {
    saveAs(
      `https://imagination-station-hlyd.onrender.com/api/v1/download?url=${encodeURIComponent(
        imageUrl,
      )}`,
      "image.png",
    );
  };
  const [slidesPerView, setSlidesPerView] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) {
        setSlidesPerView(4);
      } else if (window.innerWidth >= 1280) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 1024) {
        setSlidesPerView(4);
      } else if (window.innerWidth >= 320) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // call the function initially

    return () => {
      // cleanup - remove the listener when the component unmounts
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const EmailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
  const successToast = () => toast("Email successfully sent");
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (

    <div id="main-container" className="md:mb-5" >
      <ToastContainer />
      {/* FIrst section */}
      <div className="flex items-center justify-between w-full h-[10vh]">
        <img

          src={"../../bahrain.png"}
          className="cursor-pointer rounded-xl h-20 ml-5 w-auto  object-cover "
          alt=""
        />
        <div>
          <h1 className="mb-0 text-xs text-center md:text-xs font-normal leading-normal text-white md:leading-relaxed lg:text-2xl">
            Bring your imagination to life!
          </h1>
          <p className="text-center text-xs font-thin text-white lg:text-xs md:text-xs">
            Discover the limitless potential of Artificial Intelligence to transform <br />industries, enhance efficiency, and unlock new possibilities.
          </p>
        </div>
        <div></div>
      </div>
      {/* Second section */}
      <div
        className="flex h-[85vh] md:w-[95] flex-col gap-5 p-5 md:flex-col md:bg-[#F77774] border md:rounded-xl  md:m-3 xl:flex-row "
      >
        <div className="flex w-full flex-1 flex-col-reverse gap-5 xl:w-6/12">


          <div className="prose flex max-w-none flex-grow flex-col justify-center rounded-lg py-0">


            {showAllImages ? (
              <div className="relative mt-auto flex w-full items-center justify-center rounded-lg py-2 ScroolingPage ">
                <div className="h-80 w-[300px] sm:w-[500px] md:w-[650px] xl:w-[500px] 2xl:w-[650px]">
                  <div className="h-full w-full lg:w-max md:w-full overflow-y-auto PictureM NewCSS" style={{ height: '500px' }}>
                 <center>
                 <button
                        className="bg-[#ff553a] h-11 rounded-xl px-10 text-lg font-semibold mr-0.5 text-white focus:outline-none"
                        onClick={handleReturn}
                      >
                        See less
                      </button>
                 </center>
                    <div className="grid grid-cols-3 gap-10 w-full lg:w-full md:w-full PictureSize w-200">
                      {images.map((image, index) => (
                        <Thumbnail
                          key={image.id}
                          index={index}
                          id={image.id}
                          url={image.url}
                          setShowFullScreen={setShowFullScreen}
                          setFullScreenImage={setFullScreenImage}
                          updateImages={async () => {
                            const _images = await getImagesSvc();
                            setImages(_images);
                          }}
                          images={images}
                          setImages={setImages}
                          setRightContent={setRightContent}
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="relative mt-auto flex w-full items-center justify-center rounded-lg py-2">
                <div className="h-80 w-[300px] sm:w-[500px] md:w-[650px] xl:w-[500px] 2xl:w-[650px]">
                  <div className="h-full w-full lg:w-max md:w-full overflow-y-auto PictureM">
                    <div className="grid grid-cols-3 gap-6 w-full lg:w-full md:w-full PictureSize w-200">
                      {images.slice(0, 6).map((image, index) => (
                        <Thumbnail
                          key={image.id}
                          index={index}
                          id={image.id}
                          url={image.url}
                          setShowFullScreen={setShowFullScreen}
                          setFullScreenImage={setFullScreenImage}
                          updateImages={async () => {
                            const _images = await getImagesSvc();
                            setImages(_images);
                          }}
                          images={images}
                          setImages={setImages}
                          setRightContent={setRightContent}
                        />
                      ))}
                    </div>
                    <center>
                      <button
                        className="bg-[#ff553a] h-11 rounded-xl px-10 text-lg font-semibold mr-0.5 text-white focus:outline-none"
                        onClick={handleShowAllImages}
                      >
                        See more
                      </button>
                    </center>
                  </div>

                </div>

              </div>

            )}

            {!showAllImages && (
              <div className="mt-0 flex w-full justify-center">
                <Formik
                  initialValues={{ prompt: '' }}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    setRightContent('loading');
                    try {
                      let prompt = values.prompt;
                      const data = await generateImageSvc(prompt);
                      setResult(data.image_url);
                      const _images = await getImagesSvc();
                      setImages(_images);
                      downloadImage(data.image_url);
                      setRightContent('new-result');
                      setSubmitting(false);
                      resetForm();
                    } catch (error) {
                      setRightContent('error');
                      setError(error.message);
                    }
                  }}
                >
                  {({ isSubmitting, values }) => (
                    <Form className="flex h-full w-11/12 flex-col items-center gap-8">
                      <Field
                        rows={10}
                        as="textarea"
                        type="text"
                        id="prompt-input"
                        placeholder='Try describing your dream image like "a serene lakeside sunset"'
                        className="w-full h-32 md:h-32 rounded-xl bg-white p-4 py-2 focus:outline-none"
                        name="prompt"
                      />
                      <div className="flex gap-8 w-full">
                        <button
                          className={`${isSubmitting || !values.prompt
                            ? "bg-[#e21937]"
                            : "bg-gradient-to-r bg-[#e21937] to-complementary"
                            } h-12 w-full rounded-xl text-lg font-semibold text-white focus:outline-none`}
                          type="submit"
                          disabled={isSubmitting || !values.prompt}
                        >
                          Imagine
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
          </div>


        </div>

        <div className="flex w-full flex-1 flex-col items-center rounded-lg   py-5 sm:py-16 xl:w-6/12 xl:py-0  ">
          <div className="w-full flex-grow px-10 md:px-40">
            {(() => {
              switch (rightContent) {
                case "empty":
                  return (
                    <div className="prose flex h-full w-full max-w-none items-center justify-center text-3xl font-bold text-white">
                      No image generated yet.
                    </div>
                  );
                case "loading":
                  return <Loader />;
                case "new-result":
                  return (
                    <div className="flex h-full w-full items-center justify-center pt-5 ">
                      <img
                        onClick={() => {
                          setFullScreenImage(result);
                          setShowFullScreen(true);
                        }}
                        src={result}
                        className="h-auto cursor-pointer rounded-xl  object-cover "
                        alt=""
                      />
                    </div>
                  );
                case "selected-gallery":
                  return (
                    // margin-right: 10px;
                    <center> <div className="flex h-full w-200 items-center justify-center pt-5 PictureSize" style={{ width: '400px', marginLeft: '-20px' }}>
                      <img
                        src={fullScreenImage}
                        className="h-max cursor-pointer rounded-xl  object-cover w-200"
                        alt=""
                        onClick={() => {
                          setFullScreenImage(fullScreenImage);
                          setShowFullScreen(true);
                        }}
                      />
                    </div></center>
                  );
                case "error":
                  return (
                    <div className="custom-text prose flex h-full w-full max-w-none items-center justify-center text-3xl font-bold text-zinc-500">
                      {error}
                    </div>
                  );
                default:
                  return null;
              }
            })()}
          </div>
          <div className="mt-auto flex w-full justify-center">
            <Formik
              initialValues={{ email: "" }}
              validationSchema={EmailSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                resetForm();
                setSubmitting(true);
                sendEmailSvc(
                  values.email,
                  rightContent === "new-result" ? result : fullScreenImage,
                  successToast,
                );
                setSubmitting(false);
              }}
              className={"mt-auto"}
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form className="flex h-fit w-11/12  flex-col items-center gap-5 mb-5 bg-white rounded-xl py-4 sm:flex-row md:h-12 md:gap-14">
                  <Field
                    rows={1}
                    type="text"
                    id="prompt-input"
                    placeholder={`${errors.email && touched.email
                      ? errors.email
                      : "xyz@gmail.com"
                      }`}
                    className={`h-12 w-full rounded-2xl ${errors.email && touched.email
                      ? "border-red-500"
                      : ""
                      } bg-transparent p-4 focus:outline-none`}
                    name="email"
                  />
                  <button
                    className={`${errors.email || isSubmitting || !values.email
                      ? "bg-[#ff553a]"
                      : "bg-gradient-to-r bg-slate-300 to-complementary"
                      } h-11 rounded-xl px-10 text-lg font-semibold mr-0.5 text-white focus:outline-none`}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Send
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {
        showFullScreen && (
          <div className="absolute left-0 top-0 z-50  h-screen w-screen bg-black bg-opacity-60">
            <div className="relative flex h-full w-full justify-center ">
              <button className="absolute right-7 top-7">
                <RxCross1
                  size={47}
                  color="#fff"
                  onClick={() => setShowFullScreen(false)}
                />
              </button>
              <div className="h-screen w-fit">
                <img
                  src={fullScreenImage}
                  className=" h-full object-contain"
                  alt=""
                />
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};
