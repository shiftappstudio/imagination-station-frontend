import { Field, Form, Formik } from "formik";
import { Header } from "../../components/Header";
import "./style.css";
import { makeRequestSvc } from "./../../services/runpod.service";
import { Loader } from "./../../components/loader/Loader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const PromptForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex h-screen flex-col ">
          <Header />
          <div className="prose max-w-none flex-grow px-32 py-14">
            <h1 className="mb-0 text-6xl leading-snug text-zinc-500">
              Take your imagination to the <br /> <span>next level</span>
            </h1>
            <p className="font-bold text-zinc-400">
              Just write and let he magic happen!
            </p>
            <div className="mt-20 flex w-full justify-center">
              <Formik
                initialValues={{ prompt: "" }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  resetForm();
                  setSubmitting(true);
                  setIsLoading(true);
                  const data = await makeRequestSvc(values.prompt);
                  navigate(`/result/${data.id}`);
                  console.log(data);
                  setIsLoading(false);
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="flex h-full w-8/12 flex-col items-center gap-14 bg-white py-4">
                    <Field
                      rows={1}
                      as="textarea"
                      id="prompt-input"
                      placeholder="Interact with your story"
                      className="max-h-56 min-h-[68px] w-full rounded-2xl border-4 border-accent bg-transparent  p-4 focus:outline-none"
                      name="prompt"
                    />
                    <button
                      className="w-60 rounded-md bg-gradient-to-r from-secondary to-complementary py-4  text-xl font-bold text-white focus:outline-none"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Generate
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
