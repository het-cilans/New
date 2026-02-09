"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "./Redux/ProductSlice";
import { useAppDispatch, useAppSelector } from "./Redux/Hooks";
import ProductCard from "./Components/ProductCard";

const LIMIT = 10;
const TOTAL_PRODUCTS = 100; // Total products from API
const TOTAL_PAGES = Math.ceil(TOTAL_PRODUCTS / LIMIT);

export default function Home() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector(
    (state) => state.products
  );

  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchProducts({ page, limit: LIMIT }));
  }, [page]);

  const goToPage = (pageNum: number) => {
    setPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Products
      </h1>

      {loading && <p>Loading...</p>}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        marginBottom: "40px"
      }}>
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
        marginTop: "30px"
      }}>
        {/* Previous Button */}
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 0}
          style={{
            padding: "10px 20px",
            backgroundColor: page === 0 ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: page === 0 ? "not-allowed" : "pointer"
          }}
        >
          Previous
        </button>

        {/* Current Page Display */}
        <div style={{
          padding: "10px 20px",
          backgroundColor: "#333",
          color: "white",
          borderRadius: "4px",
          fontWeight: "bold"
        }}>
          Page {page + 1}
        </div>

        {/* Next Button */}
        <button
          onClick={() => goToPage(page + 1)}
          disabled={page >= TOTAL_PAGES - 1}
          style={{
            padding: "10px 20px",
            backgroundColor: page >= TOTAL_PAGES - 1 ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: page >= TOTAL_PAGES - 1 ? "not-allowed" : "pointer"
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
