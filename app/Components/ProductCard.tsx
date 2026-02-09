"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface Props {
    product: {
        id: number;
        title: string;
        thumbnail: string;
    };
}

export default function ProductCard({ product }: Props) {
    const router = useRouter();
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

    const handleViewMore = () => {
        if (isAuthenticated) {
            router.push(`/Product/${product.id}`);
        } else {
            router.push(`/Login?redirect=/Product/${product.id}`);
        }
    };

    return (
        <div style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            backgroundColor: "white"
        }}>
            <img
                src={product.thumbnail}
                alt={product.title}
                style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    marginBottom: "10px"
                }}
            />
            <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>
                {product.title}
            </h3>
            <button
                onClick={handleViewMore}
                style={{
                    width: "100%",
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "10px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
            >
                View More
            </button>
        </div>
    );
}
