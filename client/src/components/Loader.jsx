// Loader.js
const Loader = () => {
  return (
    <div className="loader">
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291a7.964 7.964 0 01-2.938-6.291H2c0 3.042 1.135 5.824 2.938 7.938l1.062-1.647z"
        />
      </svg>
    </div>
  );
};

export default Loader;
