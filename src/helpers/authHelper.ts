import axios from "axios";
import Cookies from "js-cookie";
import { signOut } from "../feature/login/authSlice";
import { store } from "../app/store";

// Load users from local JSON file (simulated)
const loadUsers = async () => {
  try {
    const response = await axios.get("/testData/users.json");
    const users = response.data.users;
    return { success: true, users };
  } catch (error) {
    console.error("Error loading users:", error);
    return { success: false, message: "Failed to load user data" };
  }
};

// Simulate JWT generation
const generateToken = (email: string) => {
  // Simulate a JWT token (this is just a simple base64-encoded string for demonstration purposes)
  const token = btoa(`${email}-${new Date().getTime()}`);
  return token;
};

export const authenticateUser = async (email: string, password: string) => {
  const { success, users, message } = await loadUsers();

  if (!success) {
    return { success: false, message };
  }

  const user = users.find(
    (u: { email: string; password: string }) =>
      u.email === email && u.password === password
  );

  if (user) {
    const token = generateToken(user.email);
    Cookies.set("token", token, { expires: 1 }); // Store token in cookies for 1 day
    return { success: true, data: { token, name: user.name } };
  } else {
    return { success: false, message: "Invalid email or password" };
  }
};

export const signOutUser = () => {
  Cookies.remove("token");
  store.dispatch(signOut());
};
