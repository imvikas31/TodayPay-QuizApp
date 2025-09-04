function ProgressBar({ current, total }) {
  const width = ((current + 1) / total) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
      <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${width}%` }} />
    </div>
  );
}
export default ProgressBar