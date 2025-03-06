import useFetchWorkers from "../../utils/useFetchWorkers";

const WorkerList = ({ storeId }) => {
  const { workers, workerLoading, workerError } = useFetchWorkers(storeId);

  if (workerLoading) return <p>Loading workers...</p>;
  if (workerError) return <p>Error: {workerError}</p>;

  return (
    <div>
      <h2>Worker List</h2>
      {workers.length > 0 ? (
        <ul>
          {workers.map((worker) => (
            <li key={worker._id}>
              {worker.name} - {worker.role}
            </li>
          ))}
        </ul>
      ) : (
        <p>No workers found.</p>
      )}
    </div>
  );
};

export default WorkerList;
