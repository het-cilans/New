"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/AuthSlice";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    );

    const handleLogout = () => {
        dispatch(logout());
        router.push("/Login");
    };

    return (
        <nav style={{
            backgroundColor: "#333",
            color: "white",
            padding: "15px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <Link href="/" style={{ color: "white", textDecoration: "none", fontSize: "20px", fontWeight: "bold" }}>
                ProductApp
            </Link>

            <div>
                {!isAuthenticated ? (
                    <Link
                        href="/Login"
                        style={{
                            backgroundColor: "#4CAF50",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            textDecoration: "none"
                        }}
                    >
                        Login
                    </Link>
                ) : (
                    <button
                        onClick={handleLogout}
                        style={{
                            backgroundColor: "#f44336",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
