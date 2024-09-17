import emailjs from "emailjs-com";

export const sendEmailSvc = (
  /** @type {string} */ email,
  /** @type {string} */ url,
  onSuccess,
) => {
  var templateParams = {
    to_email: email,
    to_name: "",
    from_name: "Imagination Station",
    message: "Checkout this link : " + url,
  };
  emailjs
    .send(
      "service_jftdden",
      "template_4xpnx4x",
      templateParams,
      "wXn_FnuP0GcbiZDol",
    )
    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        onSuccess();
      },
      function (error) {
        console.log("FAILED...", error);
      },
    );
};
