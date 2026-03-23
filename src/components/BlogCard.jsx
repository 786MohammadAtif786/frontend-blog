
import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {

    return (

        <Link to={`/blog/${blog._id}`}>

            <div className="bg-white shadow rounded-xl hover:shadow-lg transition cursor-pointer">

                <img
                    src={blog.image}
                    className="w-full h-48 object-cover rounded-t-xl"
                />

                <div className="p-4">

                    <p className="text-gray-400 text-sm">
                        {new Date(blog.createdAt).toDateString()}
                    </p>

                    <h2 className="text-lg font-semibold mt-1">
                        {blog.title}
                    </h2>

                    <p className="text-sm text-gray-600">
                        by {blog.author?.name}
                    </p>

                </div>

            </div>

        </Link>

    );

}
