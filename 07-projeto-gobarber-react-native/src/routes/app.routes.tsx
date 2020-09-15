import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/dasboard';

const Auth = createStackNavigator();

const AppRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <Auth.Screen name="Dasboard" component={Dashboard} />
  </Auth.Navigator>
);

export default AppRoutes;
