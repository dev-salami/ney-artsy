import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import {
  MdArrowForwardIos,
  MdArrowBackIos,
  MdArrowDownward,
} from "react-icons/md";

import { addCart } from "../redux/cartSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import eth from "../asset/eth.png";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";

function SingleProduct() {
  const dispatch = useDispatch();
  const { products, cartItems } = useSelector((state) => state.cart);
  const [likeA, setLikeA] = useState(false);
  const [Count, setCount] = useState(1);
  const { id } = useParams();
  const singleP = products.find((item) => item.id === id);
  const itemDet = {
    like: likeA,
    count: Count,
    id: id,
    amount: singleP.price.usd * Count,
  };
  const { name, creator, origin, url, views, price } = singleP;
  const Add = () => {
    if (cartItems.find((item) => item.id === id)) {
      toast.success(`${name} is in the cart`);
    } else {
      dispatch(addCart(itemDet));
      toast.success(`${name} successfully added to the cart`);
    }
  };

  return (
    <>
      <Navbar />

      <section className="container mx-auto px-4 sm:px-12 my-8 ">
        <ToastContainer position="top-center" />
        <div className="border-2 border-black min-h-screen max-w-3xl mx-auto justify-center flex lg:flex-row flex-col">
          <div className="lg:w-[60%] px-6 py-4  lg:border-r-2 border-black">
            <img className="w-full " src={url} alt="" />
          </div>
          <main className="lg:w-[40%]">
            <div className="border-b-2 border-black px-4 py-6 w-full flex items-center sm:flex-row flex-col gap-4 justify-between  ">
              <p className="text-2xl font-semibold capitalize ">{name}</p>
              <p className="font-medium text-xl flex items-center gap-2">
                <span>
                  <img className="h-8" src={eth} alt="" />
                </span>
                <span>{price.eth}</span>
              </p>
            </div>
            <div className="flex flex-col gap-4 text-xl p-6">
              <div className="flex gap-3">
                <span className="text-gray-700">Creator</span>
                <span className="text-gray-700"> :</span>
                <span className="text-blue-500 capitalize">{creator}</span>
              </div>
              <p className="capitalize">{origin}</p>
              <div className="font-medium">
                <span>Total Views</span> <span>:</span> <span>{views}</span>
              </div>
              <div className="text-2xl font-medium flex gap-4">
                <button
                  onClick={() => {
                    Count > 1 && setCount((prev) => prev - 1);
                  }}
                  className="p-2"
                >
                  -
                </button>

                <span className="p-2"> {Count}</span>
                <button
                  onClick={() => Count < 10 && setCount((prev) => prev + 1)}
                  className="p-2"
                >
                  +
                </button>
              </div>
              <div className="flex gap-4 items-center">
                <button
                  onClick={Add}
                  className="bg-blue-500 text-white w-fit px-6 h-fit py-2  "
                >
                  Add to cart
                </button>
                <div
                  className="border-2 cursor-pointer"
                  onClick={() => {
                    setLikeA(!likeA);
                  }}
                >
                  {likeA ? (
                    <FcLike
                      className="m-2  active:scale-120 duration-300"
                      size={40}
                    />
                  ) : (
                    <FcLikePlaceholder
                      className="m-2  active:scale-120 duration-300"
                      size={40}
                    />
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center p-4 cursor-pointer border-black border-y-2">
                <button className="text-xl">Description</button>
                <MdArrowDownward size={35} />
              </div>
              <div className="flex justify-between items-center p-4 cursor-pointer">
                <button className="text-xl">Listings</button>
                <MdArrowDownward size={35} />
              </div>
              <div className="flex justify-between items-center p-4 cursor-pointer border-black border-t-2 md:border-y-2">
                <button className="text-xl">status</button>
                <MdArrowDownward size={35} />
              </div>
            </div>
          </main>
        </div>
        <div className=" flex justify-center">
          <Link
            className="bg-blue-500 text-white px-4 py-2  mt-12 "
            to="/products"
          >
            Continue Shopping
          </Link>
        </div>
        <div className="flex md:flex-row flex-col justify-between items-center p-4 gap-6  my-12 max-w-5xl mx-auto bg-white shadow-gray-100 shadow-md  drop-shadow-md">
          <p className="text-xl">Explore more from this collection</p>
          <div className="flex gap-6">
            <button className="h-16 w-16 border-2 border-black rounded-full flex items-center justify-center ">
              <MdArrowBackIos size={40} />
            </button>
            <button className="h-16 w-16 border-2 border-black bg-white/40 rounded-full flex items-center justify-center">
              <MdArrowForwardIos size={40} />
            </button>
          </div>
        </div>
        <div className="text-3xl w-full h-[50vh] bg-blue-400">Slider</div>
      </section>
    </>
  );
}
export default SingleProduct;
