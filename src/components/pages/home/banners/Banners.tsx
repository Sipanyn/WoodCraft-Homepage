const Banners: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <section className="mx-4 mt-10 lg:mt-20 flex flex-col lg:flex-row items-center gap-5 rounded-xl group-*:overflow-hidden">
      {children}
    </section>
  );
};
export default Banners;
