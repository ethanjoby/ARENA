import React from "react";

const GoogleFormEmbed = ({ src, width = "100%", height = "100%" }) => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "1000px",
    width: "1100px",
    margin: 0,
  };

  return (
    <div style={containerStyle}>
      <iframe
        src={src}
        width={width}
        height={height}
        style={{ border: "none" }}
        title="Google Form"
      >
        Loading…
      </iframe>
      
    </div>
  );
};

export default GoogleFormEmbed;
