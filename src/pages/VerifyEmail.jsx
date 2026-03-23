import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {

    const { token } = useParams();
    const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

    useEffect(() => {

        const verifyUser = async () => {

            try {

                await axios.get(
                    `${API}/api/v1/verify/${token}`
                );

                alert("Email verified successfully");

                navigate("/login");

            } catch (err) {

                alert("Invalid or expired token");

            }

        }

        verifyUser();

    }, [token]);

    return (

        <div className="flex justify-center items-center h-screen">

            <h1 className="text-2xl font-bold">
                Verifying email...
            </h1>

        </div>

    );

}