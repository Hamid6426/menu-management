import { FaPizzaSlice, FaHamburger, FaGlassCheers } from 'react-icons/fa';
import Block from '../Block';

const categories = [
  { label: 'Pizza', icon: FaPizzaSlice, color: 'red' },
  { label: 'Burger', icon: FaHamburger, color: 'orange' },
  { label: 'Juice', icon: FaGlassCheers, color: 'green' }
];

const Categories = () => {
  return (
      <div className="categories-container" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
          {categories.map((category) => (
              <Block key={category.label} label={category.label} Icon={category.icon} color={category.color} />
          ))}
      </div>
  );
};

export default Categories;


