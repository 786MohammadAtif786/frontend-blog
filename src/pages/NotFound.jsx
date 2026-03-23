import { Link } from "react-router-dom";

export default function NotFound() {

  return (

    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">

      <h1 className="text-6xl font-bold text-purple-600">
        404
      </h1>

      <p className="text-xl mt-2">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-4 bg-purple-600 text-white px-6 py-2 rounded"
      >
        Go Home
      </Link>

    </div>

  );

}