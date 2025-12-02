const RecentActivities = ({ activities }) => (
  <div className="bg-white shadow-md rounded-md p-5">
    <h3 className="text-lg font-semibold mb-3">Recent Activities</h3>
    <ul className="space-y-2">
      {activities.map((act, i) => (
        <li key={i} className="flex justify-between">
          <span>{act.message}</span>
          <span className="text-gray-500 text-sm">{act.timeAgo}</span>
        </li>
      ))}
    </ul>
  </div>
);
export default RecentActivities;
