import FilterBox from "@/components/dashboard/filterBox/FilterBox";
import AllOrders from "../allOrders/AllOrders";
import { filterBoxData } from "@/constants/filterBoxData ";
interface Stats {
  wallet: number;
  tickets: number;
  orders: number;
}
type DashboardProps = {
  sideMenuItemActive: string;
  stats: Stats;
  handleViewAllOrders: () => void;
  handleOrderView: (tabName: string) => void;
};
const Dashboard: React.FC<DashboardProps> = ({
  sideMenuItemActive,
  stats,
  handleViewAllOrders,
  handleOrderView,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-x-8">
      {/* filterBoxes and allOrders */}
      <div className="lg:w-full px-3 md:px-0">
        {/* filter boxes */}
        <div className="flex flex-wrap  justify-between gap-1 sm:gap-5 lg:gap-7 bg-transparent">
          {filterBoxData.map((item) => (
            <FilterBox
              key={item.key}
              icon={item.icon}
              title={item.titleKey}
              value={stats[item.key]}
              content={item.contentKey}
            />
          ))}
        </div>
        {/* all Orders */}
        {sideMenuItemActive === "dashboard" && (
          <AllOrders
            sideMenuItemActive={sideMenuItemActive}
            handleViewAllOrders={handleViewAllOrders}
            handleOrderView={handleOrderView}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
