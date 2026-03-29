import { useState, type ChangeEvent } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";

interface UserRegisterDetails {
  name: string;
  email: string;
  mobileNo: string;
  password: string;
  repassword: string;
  gender: string;
  dob: string;
}

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserRegisterDetails>({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
    repassword: "",
    gender: "",
    dob: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserRegisterDetails, string>>
  >({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof UserRegisterDetails, string>> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format.";

    if (!/^\d{10}$/.test(formData.mobileNo))
      newErrors.mobileNo = "Enter a valid 10-digit mobile number.";

    if (formData.password.length < 10)
      newErrors.password = "Password must be at least 10 characters.";

    if (formData.password !== formData.repassword)
      newErrors.repassword = "Passwords do not match.";

    if (!formData.gender) newErrors.gender = "Please select your gender.";

    if (!formData.dob) newErrors.dob = "Date of birth is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await api.post("/profile/auth/register", formData);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  const getAutoCompleteValue = (name: keyof UserRegisterDetails): string => {
    switch (name) {
      case "name":
        return "name";
      case "email":
        return "email";
      case "mobileNo":
        return "tel";
      case "password":
        return "new-password";
      case "repassword":
        return "new-password";
      case "dob":
        return "bday";
      case "gender":
        return "sex";
      default:
        return "off";
    }
  };

  // Helper to render input fields to keep JSX clean
  const renderField = (
    label: string,
    name: keyof UserRegisterDetails,
    type = "text",
    placeholder = "",
  ) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={formData[name] as string}
        onChange={handleChange}
        className={`border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
        autoComplete={getAutoCompleteValue(name)}
      />
      {errors[name] && (
        <p className="text-red-900 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <Modal isOpen={true} onClose={() => navigate("/home")} title="Register">
      <form
        onSubmit={handleRegister}
        className="max-w-md mx-auto mt-4 mb-4 space-y-4 max-h-[70vh] overflow-y-auto px-1"
      >
        {renderField("Full Name", "name", "text", "Enter your name")}
        {renderField("Email", "email", "email", "name@example.com")}
        {renderField("Mobile Number", "mobileNo", "tel", "9876543210")}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.gender ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-900 text-xs mt-1">{errors.gender}</p>
            )}
          </div>
          {renderField("Date of Birth", "dob", "date")}
        </div>

        {renderField("Password", "password", "password", "Min 10 characters")}
        {renderField(
          "Confirm Password",
          "repassword",
          "password",
          "Repeat password",
        )}

        <button
          type="submit"
          className="bg-(--accent) hover:brightness-110 transition duration-200 text-white px-4 py-3 w-full rounded-md font-medium mt-2"
        >
          Create Account
        </button>
      </form>
    </Modal>
  );
}
