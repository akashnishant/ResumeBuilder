import { FiArrowLeft } from 'react-icons/fi'; // or AiOutlineArrowLeft

export const BackButton = ({ onClick }) => (
  <button onClick={onClick} style={backButtonStyle}>
    <FiArrowLeft size={20} style={{ marginRight: '8px' }} />
    Back
  </button>
);

const backButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'transparent',
  border: 'none',
  fontSize: '16px',
  cursor: 'pointer',
  color: '#333',
};
