// import { Audio } from "react-loader-spinner";
import { MoonLoader } from "react-spinners";

function loader() {
	return (
		<div className="flex justify-center items-center w-screen h-screen absolute  bg-gray-400">
			{/* <Audio
        height="200"
        width="200"
        radius="9"
        color="light-blue"
        ariaLabel="three-dots-loading"
        // wrapperStyle
        // wrapperClass
      /> */}
			<MoonLoader
				color="#000000"
				size={150}
				speedMultiplier={0.3}
			/>
		</div>
	);
}
export default loader;
