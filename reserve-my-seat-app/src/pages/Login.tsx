import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Modal } from "../components/Modal";
import { useToastStore } from "../store/toastStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length > 9;
  };

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let hasErrors = false;
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      hasErrors = true;
    }
    if (!validatePassword(password)) {
      setPasswordError("Password is required.");
      hasErrors = true;
    }

    if (hasErrors) return;

    try {
      const res = await api.post("/profile/auth/login", { email, password });
      console.log("login response", res);
      login(res.data);
      navigate("/");
      addToast("Login Successful!!", "success");
    } catch (err) {
      const message = "Login failed!!!";
      addToast(message, "error");
      console.error(message, err);
    }
  };

  return (
    <>
      <Modal isOpen={true} onClose={() => navigate("/home")} title="Login">
        <form
          onSubmit={handleLogin}
          className="max-w-md mx-auto mt-7 space-y-4"
        >
          <div className="">
            <label htmlFor="email">Email</label>
            <input
              className={`border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <p className="text-red-900 text-xs mt-2">{emailError}</p>
            )}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              className={`border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-900 text-xs mt-2">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-(--accent) hover:brightness-110 transition duration-200 text-white px-4 py-2 w-full rounded-md font-medium"
          >
            Login
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Login;
