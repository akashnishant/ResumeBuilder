import { FiRefreshCw } from "react-icons/fi";
import { useState } from "react";

const buttonStyle = {
  backgroundColor: "transparent",
  border: "0px solid #e0e0e0",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  position: "absolute",
  right: "0px",
  top: "-55px",
};

const buttonHoverStyle = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  transform: "rotate(20deg)",
};

const tooltipStyle = {
  position: "absolute",
  bottom: "-10px",
  right: "-50px",
  transform: "translateX(-50%)",
  backgroundColor: "#333",
  color: "#fff",
  padding: "6px 10px",
  borderRadius: "4px",
  fontSize: "12px",
  whiteSpace: "nowrap",
  zIndex: 1000000000,
  opacity: 0.8,
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
};

const RefreshButton = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{position: "relative"}}>
      <button
        onClick={onClick}
        style={{
          ...buttonStyle,
          ...(hovered ? buttonHoverStyle : buttonStyle),
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <FiRefreshCw size={20} />
      </button>
      {hovered && <div style={tooltipStyle}>Reset</div>}
    </div>
  );
};

export default RefreshButton;
