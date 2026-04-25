


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
    <div className="w-64 bg-gray-100 border-r h-screen p-5 hidden md:block">

   
      <ul className="space-y-3">

        {/* <li>
          <Link
            to="/"
            className="text-gray-700 hover:text-purple-600"
          >
            Home
          </Link>
        </li> */}


        {/* <li>
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
        </li> */}

      </ul>

      <h2 className="mt-8 font-semibold text-cyan-800">
        Categories
      </h2>

      <ul className="mt-4 space-y-2">

    
        {categories.map((cat) => (
          <li key={cat}>
            <Link
              to={`/category/${cat}`} 
              className="text-gray-600 hover:text-cyan-800"
            >
              {cat}
            </Link>
          </li>
        ))}

      </ul>

    </div>
  );
}
