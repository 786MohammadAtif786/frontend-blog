

import { useLocation } from "react-router-dom";

export default function CheckEmail() {

    const location = useLocation();
    const email = location.state?.email;

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-6 rounded shadow text-center">
                
                <h2 className="text-xl font-semibold">
                    Check your email 📩
                </h2>

                <p className="mt-2 text-gray-600">
                    We have sent a verification link to:
                </p>

                {/* 🔥 Dynamic email */}
                <p className="mt-2 font-semibold text-purple-600">
                    {email || "your email"}
                </p>

                <p className="mt-2 text-gray-600">
                    Please verify your account.
                </p>

            </div>
        </div>
    );
}