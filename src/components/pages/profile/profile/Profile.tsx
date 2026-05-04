import SideMenu from "@/components/sideMenu/sideMenu/SideMenu";
import { useState } from "react";
import OrdersHistory from "../../../orders/ordersHistory/OrdersHistory";
import Messages from "../../../messages/Messages";
import Bookmarks from "../../../bookmarks/Bookmarks";
import AddressManager from "@/components/address/addressManager/AddressManager";
import { orders } from "@/constants/orders";
import Dashboard from "@/components/dashboard/Dashboard";
import MobileSideMenu from "@/components/sideMenu/mobileSideMenu/MobileSideMenu";
import MobileUserInfo from "@/components/sideMenu/mobileUserInfo/MobileUserInfo";

const Profile: React.FC = () => {
  const [sideMenuItemActive, setSideMenuItemActive] =
    useState("dashboard"); /* side menu items*/
  const [activeOrderTab, setActiveOrderTab] =
    useState("inProgress"); /*tabs state*/
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const handleOrderTabChange = (tabName: string) => {
    setActiveOrderTab(tabName);
    setIsSearchOpen(false);
  };
  const handleViewAllOrders = () => {
    setSideMenuItemActive("orders"); //change from side menu item
  };
  const handleOrderView = (tabName: string) => {
    setSideMenuItemActive("orders"); //change from all orders
    handleOrderTabChange(tabName);
  };
  interface Stats {
    wallet: number;
    tickets: number;
    orders: number;
  }
  const stats: Stats = {
    wallet: 155,
    tickets: 0,
    orders: orders.length,
  };

  return (
    <div className="flex flex-col lg:flex-row gap-x-8 lg:mt-10">
      {/* <mobile userInfo */}
      <MobileUserInfo />
      {/* side menu */}
      <SideMenu
        sideMenuItemActive={sideMenuItemActive}
        setSideMenuItemActive={setSideMenuItemActive}
      />
      {/* topFilter & pagination & product */}
      <div className="lg:w-full px-3 md:px-0">
        {/* filter boxes */}
        {sideMenuItemActive === "dashboard" && (
          <Dashboard
            stats={stats}
            sideMenuItemActive={sideMenuItemActive}
            handleViewAllOrders={handleViewAllOrders}
            handleOrderView={handleOrderView}
          />
        )}

        {sideMenuItemActive === "orders" && (
          <OrdersHistory
            activeOrderTab={activeOrderTab}
            handleOrderTabChange={handleOrderTabChange}
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
          />
        )}
        {sideMenuItemActive === "bookmarks" && <Bookmarks />}
        {sideMenuItemActive === "addresses" && <AddressManager />}
        {sideMenuItemActive === "messages" && <Messages />}
        {/* mobile sideMenu */}
        <MobileSideMenu
          sideMenuItemActive={sideMenuItemActive}
          setSideMenuItemActive={setSideMenuItemActive}
        />
      </div>
    </div>
  );
};
export default Profile;
