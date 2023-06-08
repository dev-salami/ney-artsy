import ShopNav from "./ShopNav";
import { useSelector } from "react-redux";
// import { HandlePayment } from "./paystack";
import wc from "../asset/wc.svg";
import mm from "../asset/mm-logo.png";
import cb from "../asset/cb-logo.jpg";
import bk from "../asset/bitkeep.png";
import phatom from "../asset/phantom-logo.svg";
import { PaystackButton } from "react-paystack";

function PaymentDetails() {
	const { cartItems } = useSelector((state) => state.cart);
	const { amount } = useSelector((state) => state.cart);
	const { shipDet } = useSelector((state) => state.cart);
	let year = new Date().getFullYear();
	let month = new Date().getMonth() + 2;
	let day = new Date().getDate();

	const price = Math.ceil(amount * 1.1 * 70000);

	const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

	const email = shipDet.email;
	const name = shipDet.surname;
	const number = shipDet.phone;
	const text = `Pay ₦ ${Math.ceil(amount * 1.1 * 700)}`;
	const componentProps = {
		email,
		amount: price,
		metadata: {
			name,
			number,
		},
		publicKey,
		text: text,
		onSuccess: ({ reference }) => {
			alert(
				`Your purchase was successful! Transaction reference: ${reference}`
			);
			// resetForm();
		},
		onClose: () => alert("Payment has been canceled"),
	};
	return (
		<>
			<ShopNav />

			<section className="container mx-auto px-12 flex flex-col gap-12 md:flex-row justify-around">
				<aside className="md:w-[40%] border-gray-600 border-2 p-6 rounded-2xl">
					<div className="flex justify-center flex-col gap-8 ">
						<div className="flex flex-col space-y-3">
							<h2 className="text-center font-semibold text-xl">
								Select Your Wallet
							</h2>
							<p>
								Connect with one of our available wallet providers or add and
								connect a new wallet.
							</p>
						</div>
						<div className="gap-5 flex flex-col">
							<div className="form-check flex items-center">
								<input
									className="form-check-input appearance-none rounded-full h-4 w-4 border-gray-300 bg-white  checked:border-blue-600 border-[4px] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
									type="radio"
									name="flexRadioDefault"
									id="flexRadioDefault1"
								/>
								<label
									className="form-check-label flex px-3 gap-2 text-gray-800"
									htmlFor="flexRadioDefault1">
									<img
										className="h-6"
										src={mm}
										alt="meta mask logo"
									/>
									<span>Meta Mask</span>
								</label>
							</div>
							<div className="form-check flex items-center">
								<input
									className="form-check-input appearance-none rounded-full h-4 w-4 border-gray-300 bg-white  checked:border-blue-600 border-[4px] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
									type="radio"
									name="flexRadioDefault"
									id="flexRadioDefault2"
								/>
								<label
									className="form-check-label items-center flex px-3 gap-2 text-gray-800"
									htmlFor="flexRadioDefault2">
									<img
										className="h-5"
										src={cb}
										alt="coinbase logo"
									/>
									<span>Coin Base</span>
								</label>
							</div>
							<div className="form-check flex items-center">
								<input
									className="form-check-input appearance-none rounded-full h-4 w-4 border-gray-300 bg-white  checked:border-blue-600 border-[4px] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
									type="radio"
									name="flexRadioDefault"
									id="flexRadioDefault3"
								/>
								<label
									className="form-check-label bg-black  items-center flex px-2 py-1 rounded-lg gap-2 text-gray-800"
									htmlFor="flexRadioDefault3">
									<img
										className="h-5 "
										src={wc}
										alt="wallet connect logo"
									/>
								</label>
							</div>
							<div className="form-check flex items-center">
								<input
									className="form-check-input appearance-none rounded-full h-4 w-4 border-gray-300 bg-white  checked:border-blue-600 border-[4px] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
									type="radio"
									name="flexRadioDefault"
									id="flexRadioDefault4"
								/>
								<label
									className="form-check-label flex px-3 gap-2 text-gray-800"
									htmlFor="flexRadioDefault4">
									<img
										className="h-5"
										src={bk}
										alt="bitkeep logo"
									/>
								</label>
							</div>
							<div className="form-check flex items-center">
								<input
									className="form-check-input appearance-none rounded-full h-4 w-4 border-gray-300 bg-white  checked:border-blue-600 border-[4px] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
									type="radio"
									name="flexRadioDefault"
									id="flexRadioDefault5"
								/>
								<label
									className="form-check-label flex py-1 px-2 gap-2 bg-gray-800 rounded-lg text-gray-800"
									htmlFor="flexRadioDefault5">
									<img
										className="h-5 bg-gray-800"
										src={phatom}
										alt="phantom logo"
									/>
								</label>
							</div>
						</div>
						<button className="px-4 py-2 bg-blue-500 text-white">
							Connect
						</button>
					</div>
				</aside>
				<main className="md:w-[50%] border-gray-600 border-2 p-6 rounded-2xl flex flex-col gap-3">
					<h2 className="text-center font-semibold text-xl">
						Pay with your debit card
					</h2>
					<div className="gap-2 flex-col flex">
						<div className="flex xs:flex-row flex-col gap-3">
							<span className="font-semibold">Full Name : </span>
							<span className="font-medium">
								{shipDet.surname} {shipDet.first} {shipDet.other}
							</span>
						</div>
						<div className="flex gap-3 xs:flex-row flex-col">
							<span className="font-semibold">Email Address : </span>
							<span>{shipDet.email}</span>
						</div>
						<div className="flex gap-3 xs:flex-row flex-col">
							<span className="font-semibold">Delivery Address : </span>
							<span>
								{shipDet.address}, {shipDet.state}. {shipDet.country}
							</span>
						</div>
					</div>
					<div>
						<p>
							<div className="flex gap-3 xs:flex-row flex-col">
								<span className="font-semibold">Expected arrival date : </span>
								{year}/{month}/{day}
							</div>
						</p>
					</div>
					<div className=" w-full  flex gap-4 flex-col">
						<div className="justify-between flex">
							<span className="text-gray-600 font-medium">
								Products In Cart
							</span>
							<span className="font-semibold">
								{cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
							</span>
						</div>
						<div className="justify-between flex">
							<span className="text-gray-600 font-medium">Shipping Fee</span>
							<span className="font-semibold">
								$ {(0.1 * amount).toFixed(2)}
							</span>
						</div>
						<div className="justify-between flex">
							<span className="text-gray-600 font-medium">Total</span>
							<span className="font-semibold">$ {amount.toFixed(2)}</span>
						</div>
						<div>
							<hr className="border-gray-700 border-t-[3px]" />
							<p className="flex justify-between">
								<span>Grand Total :</span>
								<span className="font-semibold">
									$ {(1.1 * amount).toFixed(2)}
								</span>
							</p>
							<hr className="border-gray-700 border-t-[3px]" />
							<div>
								<span className="font-semibold">NOTE : </span>
								Conversion from dollar to naira is done at the rate of 700 ₦ = 1
								$
							</div>
						</div>
					</div>

					{/* <button
            onClick={() =>
              HandlePayment(shipDet.email, Math.ceil(amount * 1.1 * 700))
            }
            className="px-4 py-2 bg-blue-500 text-white"
          >
            Pay ₦ {Math.ceil(amount * 1.1 * 700)}
          </button> */}
					<PaystackButton
						className="px-4 py-2 bg-blue-500 text-white"
						{...componentProps}
					/>
				</main>
			</section>
		</>
	);
}
export default PaymentDetails;
