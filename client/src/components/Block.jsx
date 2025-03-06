import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Block = ({ label, Icon, to }) => {
  const [isHovered, setIsHovered] = useState(false);

  const block = {
    position: 'relative',
    width: '104px',
    height: '104px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
    cursor: 'pointer',
  };

  const icon = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.3s',
  };

  const textStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: isHovered ? 1 : 0,
    color: 'white',
    fontSize: '20px',
    transition: 'opacity 0.3s',
  };

  return (
    <div
      style={block}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wrap the Block in a Link component to enable navigation */}
      <Link to={to} style={{ width: '100%', height: '100%' }}>
        <Icon size={40} style={icon} />
        <div style={textStyle}>{label}</div>
      </Link>
    </div>
  );
};

Block.propTypes = {
  label: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  to: PropTypes.string.isRequired, // Add `to` prop for the target path
};

export default Block;
