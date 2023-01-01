import ShopNav from "./ShopNav";
import { useSelector } from "react-redux";
// import { HandlePayment } from "./paystack";

function PaymentDetails() {
  const { amount } = useSelector((state) => state.cart);
  const { shipDet } = useSelector((state) => state.cart);

  return (
    <>
      {/* <ShopNav />
      <button
        onClick={() =>
          HandlePayment(shipDet.email, Math.ceil(amount * 1.1 * 700))
        }
        className="px-4 py-2 bg-blue-500 text-white"
      >
        Pay ₦ {Math.ceil(amount * 1.1 * 700)}
      </button> */}
    </>
  );
}
export default PaymentDetails;
