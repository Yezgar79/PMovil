import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importación de las pantallas
import ProfileScreen from '../screens/ProfileScreen';
import SkillsScreen from '../screens/SkillsScreen';
import ProjectScreen from '../screens/ProjectScreen';
import HomeScreen from '../screens/HomeScreen';
import ArtesanosScreen from '../screens/ArtesanosScreen';
import PerfilArtesanoScreen from '../screens/PerfilArtesanoScreen';
import ProductoDetalleScreen from '../screens/ProductoDetalleScreen';
import { ArtesanosStackParamList, HomeStackParamList } from '../types/navigation';

const Tab = createBottomTabNavigator();
const ArtesanosStackNav = createNativeStackNavigator<ArtesanosStackParamList>();
const HomeStackNav = createNativeStackNavigator<HomeStackParamList>();

// Stack anidado para el módulo de Artesanos (lista → perfil)
function ArtesanosStack() {
  return (
    <ArtesanosStackNav.Navigator>
      <ArtesanosStackNav.Screen name="ListaArtesanos" component={ArtesanosScreen} options={{ title: 'Artesanos' }} />
      <ArtesanosStackNav.Screen name="PerfilArtesano" component={PerfilArtesanoScreen} options={{ title: 'Perfil del artesano' }} />
    </ArtesanosStackNav.Navigator>
  );
}

// Stack anidado para Inicio (lista de productos → detalle con pujas)
function HomeStack() {
  return (
    <HomeStackNav.Navigator>
      <HomeStackNav.Screen name="ListaProductos" component={HomeScreen} options={{ title: 'Artesanías' }} />
      <HomeStackNav.Screen name="DetalleProducto" component={ProductoDetalleScreen} options={{ title: 'Detalle de la pieza' }} />
    </HomeStackNav.Navigator>
  );
}

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
      <Tab.Screen
        name="Artesanias"
        component={HomeStack}
        options={{ title: 'Artesanías', headerShown: false }}
      />
      <Tab.Screen
        name="ArtesanosTab"
        component={ArtesanosStack}
        options={{ title: 'Artesanos', headerShown: false }}
      />
    </Tab.Navigator>
  );
}