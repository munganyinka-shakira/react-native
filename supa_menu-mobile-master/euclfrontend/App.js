import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import jwtDecode from "jwt-decode";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

export default function App() {
  const [user, setUser] = useState(null);
  
  const restoreToken = async () => {
    const token = await authStorage.getToken();
    if (!token) return;

    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  useEffect(() => {
    restoreToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
