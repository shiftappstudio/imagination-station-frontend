import axios from "axios";

export const makeRequestSvc = async (/** @type {string} */ prompt) => {
  const options = {
    method: "POST",
    url: `https://api.runpod.ai/v2/kandinsky-v2/runsync`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer E7K20UBU7T1GYLOFNIYEEMEF8O5W4Y4LW3X0XJC2`,
    },
    data: {
      input: {
        prompt: prompt,
        negative_prompt:
          "disfigured mouth, disfigured teeth, half head, half face, blury, side looking, old, wrinkle, child, no face, pencil, full body, sharp, far away, overlapping, duplication, nude, disfigured, kitsch, oversaturated, grain, low-res, Deformed, blurry, bad anatomy, poorly drawn face, mutation, mutated, extra limb, ugly, poorly drawn hands, missing limb, blurry, floating limbs, disconnected limbs, malformed hands, blur, out of focus, long body, disgusting, poorly drawn, childish, mutilated, mangled, surreal, out of frame, duplicate, 2 faces",
        num_steps: 100,
        guidance_scale: 4,
        h: 512,
        w: 512,
        sampler: "ddim",
        prior_cf_scale: 4,
        prior_steps: "5",
        num_images: 1,
        seed: -1,
      },
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .request(options)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export const getResultSvc = async (/** @type {string} */ jobId) => {
  const options = {
    method: "POST",
    url: `https://api.runpod.ai/v2/kandinsky-v2/status/${jobId}`,
    headers: { accept: "application/json" },
  };
  return new Promise((resolve, reject) => {
    axios
      .request(options)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
