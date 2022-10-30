import React from "react";

export default function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        marginBottom: 100
      }}
    >
      {" "}
      <div className="spinning-loader"></div>{" "}
    </div>
  );
}


export function SearchLoader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <div className="search-loader"></div>{" "}
    </div>
  );
}