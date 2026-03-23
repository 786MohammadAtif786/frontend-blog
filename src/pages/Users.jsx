import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {

  const [users, setUsers] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  const fetchUsers = async () => {
    const res = await axios.get(
      `${API}/api/v1/admin/users`,
      { withCredentials: true }
    );
    setUsers(res.data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggle = async (id) => {
    await axios.patch(
      `${API}/api/v1/admin/block/${id}`,
      {},
      { withCredentials: true }
    );
    fetchUsers();
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">👥 Manage Users</h2>

      <div className="bg-white shadow rounded-lg overflow-hidden">

        <table className="w-full text-left">
          
          {/* Header */}
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t hover:bg-gray-50">

                {/* Name */}
                <td className="p-3 font-medium">{user.name}</td>

                {/* Email */}
                <td className="p-3 text-gray-600">{user.email}</td>

                {/* Status */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.isBlocked
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>

                {/* Action */}
                <td className="p-3">
                  <button
                    onClick={() => handleToggle(user._id)}
                    className={`px-4 py-1 rounded text-white text-sm transition ${
                      user.isBlocked
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}