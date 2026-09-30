import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdminMenuScreen } from '../ui/AdminMenuScreen';
import { UserManagementScreen } from '../ui/UserManagementScreen';
import { StudentManagementScreen } from '../ui/StudentManagementScreen';
import { RegisterScreen } from '@pages/Register';

const Stack = createNativeStackNavigator();

export const AdminNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminMenu" component={AdminMenuScreen} />
      <Stack.Screen name="UserManagement" component={UserManagementScreen} />
      <Stack.Screen name="StudentManagement" component={StudentManagementScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
