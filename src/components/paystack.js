import { useNavigate } from "react-router-dom";
export const HandlePayment = (email, amount) => {
  const navigate = useNavigate;
  const handler = PaystackPop.setup({
    key: "pk_test_e8e19be8dbce15ef29c8d8cfc88c52b707488270",
    email: email,
    amount: amount * 100,

    onClose: () => {
      alert("Window closed.");
    },
    callback: (response) => {
      let message = "Payment complete! Reference: " + response.reference;

      //   alert(message);
      navigate("/success");
    },
  });

  handler.openIframe();
};
