import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importación de las 3 pantallas estrictas
import ProfileScreen from '../screens/ProfileScreen';
import SkillsScreen from '../screens/SkillsScreen';
import ProjectScreen from '../screens/ProjectScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 13, fontWeight: '600', paddingBottom: 4 },
        tabBarStyle: { height: 60 },
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Tab.Screen 
        name="Perfil" 
        component={ProfileScreen} 
        options={{ title: 'Mi Perfil' }} 
      />
      <Tab.Screen 
        name="Habilidades" 
        component={SkillsScreen} 
        options={{ title: 'Mis Habilidades' }} 
      />
      <Tab.Screen 
        name="Proyecto" 
        component={ProjectScreen} 
        options={{ title: 'Mi Proyecto' }} 
      />
    </Tab.Navigator>
  );
}