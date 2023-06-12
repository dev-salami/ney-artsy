import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { fetchData, Search, Sort } from "../redux/cartSlice";
import ProductItem from "../components/ProductItem";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/loader";

function Product() {
	//eslint-disable-next-line
	// const [error, seterror] = useState("");
	//eslint-disable-next-line
	// const [loading, setloading] = useState(true);

	const [text, settext] = useState("");
	const [srt, setsrt] = useState("");

	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.cart);
	//eslint-disable-next-line
	let me = [...products];
	const sortChange = () => {
		if (srt === "a-z") {
			me.sort((a, b) => {
				if (a.name < b.name) {
					return -1;
				}
				if (a.name > b.name) {
					return 1;
				}
				return 0;
			});
		} else if (srt === "z-a") {
			me.sort((a, b) => {
				if (a.name < b.name) {
					return 1;
				}
				if (a.name > b.name) {
					return -1;
				}
				return 0;
			});
		} else if (srt === "highest") {
			me.sort((a, b) => {
				return b.price.usd - a.price.usd;
			});
		} else if (srt === "lowest") {
			me.sort((a, b) => {
				return a.price.usd - b.price.usd;
			});
		}
		dispatch(Sort(me));
	};
	useEffect(() => {
		sortChange();
		//eslint-disable-next-line
	}, [srt]);

	// useEffect(() => {
	// 	axios
	// 		.get(
	// 			"https://gist.githubusercontent.com/eniiku/65a95533de1f005eee35d5eb91f3e141/raw/c7188e070a8670a86883ff57224dcad277814761/products.json"
	// 		)
	// 		.then((data) => {
	// 			dispatch(fetchData(data.data.products));
	// 			setloading(false);
	// 			seterror(false);
	// 		})
	// 		.catch((err) => {
	// 			seterror(err.message);
	// 			setloading(false);
	// 		});
	// 	//eslint-disable-next-line
	// }, []);
	const { isLoading, isError, data, error, isSuccess } = useQuery({
		queryKey: ["products"],
		queryFn: () => {
			// setloading(true);
			return axios
				.get(
					"https://gist.githubusercontent.com/eniiku/65a95533de1f005eee35d5eb91f3e141/raw/c7188e070a8670a86883ff57224dcad277814761/products.json"
				)
				.then((data) => {
					dispatch(fetchData(data.data.products));
					// setloading(false);
					// seterror(false);
					return data;
				})
				.catch((err) => {
					// console.log(err.message);
					// seterror(err.message);
					// setloading(false);
					return err;
				});
		},
	});

	if (isLoading) {
		console.log("Loading");
	} else if (isError) {
		console.log(error);
	} else if (isSuccess) {
		console.log("success");
	}
	// console.log(data.data.products);

	const tempProd = JSON.parse(localStorage.getItem("products"));

	useEffect(() => {
		const p = [...tempProd];
		const tempProducts = p.filter((product) => {
			return product.name.toLowerCase().includes(text);
		});
		// console.log(tempProducts);
		dispatch(Search(tempProducts));
		//eslint-disable-next-line
	}, [text]);

	const test = products ? "redux" : "help";
	console.log(test);
	const ProductData = products;

	return (
		<section>
			<Navbar />
			{isLoading ? (
				<Loader />
			) : (
				<>
					{isSuccess && (
						<section className="container mx-auto">
							<div className="border border-black xs:flex-row flex-col gap-4 py-4  rounded-lg p-2 mb-6 w-4/5 mx-auto flex justify-between items-center">
								<div className="flex gap-4    items-center">
									<input
										className="bg-gray-100 border border-black rounded-lg py-1 px-3   "
										type="text"
										value={text}
										onChange={(e) => settext(e.target.value)}
										placeholder="Search"
									/>
									<div className="md:inline-block hidden">
										{ProductData.length} Products found
									</div>
								</div>
								<div className="gap-4 flex">
									<span className="md:inline-block hidden">Sort By</span>
									<select
										value={srt}
										onChange={(e) => {
											setsrt(e.target.value);

											// dispatch(Sort(e.target.value));
										}}
										name="sort"
										id="">
										<option value="lowest">Price Lowest</option>
										<option value="highest">Price Highest</option>
										<option value="a-z">Name (A-Z)</option>
										<option value="z-a">Name (Z-A)</option>
									</select>
								</div>
							</div>
							<section className=" flex gap-6">
								<main className="w-4/5 mx-auto border rounded-xl min-h-screen ">
									{ProductData.length > 0 ? (
										<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
											{ProductData.map((item) => (
												<ProductItem
													key={item.id}
													item={item}
												/>
											))}
											{/* {error && products && <p>{error}</p>}
										{loading && <p>loading</p>} */}
										</div>
									) : (
										<p className="text-4xl font-bold">
											No products matches your filter
										</p>
									)}
								</main>
							</section>
							<Footer />
						</section>
					)}
					{isError && <div>{error}</div>}
				</>
			)}
		</section>
	);
}
export default Product;

// dispatch(fetchData(data.data.products)
