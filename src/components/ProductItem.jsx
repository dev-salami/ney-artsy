import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Aos from "aos";

function ProductItem({ item }) {
	useEffect(() => {
		Aos.init({
			offset: 200,
			duration: 2000,
			easing: "ease-out",
			delay: 400,
		});
	}, []);
	return (
		<div
			data-aos="zoom-in"
			className="flex flex-col gap-1 p-3 h-fit  border-black border rounded-xl ">
			<img
				src={item.url}
				className="w-full rounded-xl"
				alt=""
			/>
			<div className="flex justify-between text-sm px-3 flex-wrap">
				<Link
					to={`/products/${item.id}`}
					className=" text-gray-700 uppercase">
					{item.name}
				</Link>
				<p className=" font-bold ">${item.price.usd}</p>
			</div>
		</div>
	);
}
export default ProductItem;
