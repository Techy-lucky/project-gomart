import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Unknown = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "APL@admin#123") {
      navigate("/adminregister");
    } else {
      setError("Invalid password");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Admin Access</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white/60 placeholder-black"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-1/2 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-1/2 bg-gray-900/20 border border-gray-400 text-white py-2 rounded-md hover:bg-white/80 hover:text-black transition"
            >
              Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Unknown;
