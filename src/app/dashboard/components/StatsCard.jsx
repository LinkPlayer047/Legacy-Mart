const StatsCard = ({ title, value }) => (
  <div className="bg-white shadow-md p-5 rounded-md flex flex-col items-center">
    <h3 className="text-gray-500">{title}</h3>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);
export default StatsCard;
