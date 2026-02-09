"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  brand: string;
  category: string;
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then(setProduct);
  }, [id]);

  if (!product) return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh",
      fontSize: "20px",
      color: "#667eea"
    }}>
      Loading...
    </div>
  );

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "40px 20px"
    }}>
      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "#f3f4f6",
          color: "#374151",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "15px",
          marginBottom: "20px",
          transition: "all 0.3s"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#e5e7eb";
          e.currentTarget.style.transform = "translateX(-4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#f3f4f6";
          e.currentTarget.style.transform = "translateX(0)";
        }}
      >
        ← Back to Products
      </button>

      <div style={{
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        overflow: "hidden"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          padding: "40px"
        }}>
          {/* Product Image */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f9fafb",
            borderRadius: "12px",
            padding: "20px"
          }}>
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px"
              }}
            />
          </div>

          {/* Product Info */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}>
            <h1 style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#1f2937",
              lineHeight: "1.3",
              marginBottom: "10px"
            }}>
              {product.title}
            </h1>

            <div style={{
              display: "flex",
              gap: "15px",
              alignItems: "center"
            }}>
              <span style={{
                fontSize: "36px",
                fontWeight: "bold",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                ${product.price}
              </span>
              {product.brand && (
                <span style={{
                  backgroundColor: "#e0e7ff",
                  color: "#667eea",
                  padding: "6px 16px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "600"
                }}>
                  {product.brand}
                </span>
              )}
            </div>

            {product.category && (
              <div>
                <span style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  fontWeight: "600"
                }}>
                  Category:
                </span>
                <span style={{
                  marginLeft: "8px",
                  fontSize: "14px",
                  color: "#374151"
                }}>
                  {product.category}
                </span>
              </div>
            )}

            <div style={{
              marginTop: "20px",
              paddingTop: "20px",
              borderTop: "1px solid #e5e7eb"
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "12px"
              }}>
                Description
              </h3>
              <p style={{
                fontSize: "16px",
                lineHeight: "1.7",
                color: "#6b7280",
                whiteSpace: "normal",
                wordWrap: "break-word"
              }}>
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
