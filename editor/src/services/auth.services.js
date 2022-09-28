/**
 * Authentication service
 *
 */
import axios from "axios";

class AuthService {
    /**
     * Register user
     * @param {Object} formData
     * @returns {Object} success and message
     */
    register(formData) {
        return axios.post("/register", formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    /**
     * Sets user and token in the local storage.
     * @param {Object} user details email and password
     * @returns {Object} user data.
     */
    login(user) {
        return axios
            .post(
                "/login",
                {
                    email: user.email,
                    password: user.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                if (response.data.success === 1 && response.data.data.token) {
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.data)
                    );
                }
                return response.data.data;
            });
    }
    /**
     * Removes user from local storage.
     */
    logout() {
        localStorage.removeItem("user");
    }
}

export default new AuthService();
