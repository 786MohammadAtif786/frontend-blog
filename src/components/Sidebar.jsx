


import { Link } from "react-router-dom";
import logImg from '../assets/logo.png'
const categories = [
  "Business",
  "Education & Career",
  "Entertainment",
  "Fashion & Beauty",
  "Food & Drinks",
  "Technology",
  "Sports",
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r h-screen p-5 hidden md:block">

      {/* Logo */}
      {/* <Link to="/">
        <h1 className="text-2xl font-bold mb-6 text-purple-600 cursor-pointer">
          <img src={logImg} alt="" />
        </h1>
      </Link> */}
      <Link to="/" className="flex items-center gap-2 mb-6">

        <img
          src={logImg}
          alt="DevNotes Logo"
          className="w-8 h-8 object-contain"
        />

        <h1 className="text-xl font-bold">
          <span className="text-green-500">Dev</span>
          <span className="text-blue-600">Notes</span>
        </h1>

      </Link>

      <ul className="space-y-3">

        <li>
          <Link
            to="/"
            className="text-gray-700 hover:text-purple-600"
          >
            Home
          </Link>
        </li>


        <li>
          <Link
            to="/my-blogs"
            className="text-gray-700 hover:text-purple-600"
          >
            Blogs
          </Link>
        </li>

        <li>
          <Link
            to="/"
            className="text-gray-700 hover:text-purple-600"
          >
            Comments
          </Link>
        </li>

      </ul>

      <h2 className="mt-8 font-semibold text-gray-500">
        Categories
      </h2>

      <ul className="mt-4 space-y-2">

        {/* {categories.map((cat) => (
          <li key={cat}>
            <Link
              to="/"
              className="text-gray-600 hover:text-purple-600"
            >
              {cat}
            </Link>
          </li>
        ))} */}

        {categories.map((cat) => (
          <li key={cat}>
            <Link
              to={`/category/${cat}`}   // 🔥 yaha change
              className="text-gray-600 hover:text-purple-600"
            >
              {cat}
            </Link>
          </li>
        ))}

      </ul>

    </div>
  );
}
