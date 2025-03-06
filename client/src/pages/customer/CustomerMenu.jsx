import SearchItems from '../../components/customer/SearchItems';
import FilterItems from '../../components/customer/FilterItems';
import AdvanceSearch from '../../components/customer/AdvanceSearch';
import Categories from '../../components/customer/Categories';

const CustomerMenu = () => {
  return (
   <div>
    <SearchItems />
    <FilterItems />
    <AdvanceSearch />
    <Categories />
   </div>
  );
};

export default CustomerMenu;
