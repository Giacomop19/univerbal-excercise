import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '@/screens/home';
import FavoritesScreen from '@/screens/favorites';
import TopRatedScreen from '@/screens/top-rated';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { appRouteNames } from '@/routes';
import { z } from 'zod';
import { IconSymbol } from '@/ui/button/IconSymbol';

const Tab = createBottomTabNavigator();

const envSchema = z.object({
  EXPO_PUBLIC_SERVER_IP: z.string().ip(),
  EXPO_PUBLIC_SERVER_PORT: z.string().length(4),
});

const result = envSchema.safeParse(process.env);
if (result.error) {
  console.error(result.error);
}
console.info('[app]: ENV', result.data);

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" animated />
      <Tab.Navigator initialRouteName={appRouteNames.root}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ 
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />
          }}
        />
        <Tab.Screen
          name="Top rated"
          component={TopRatedScreen}
          options={{ 
            tabBarLabel: "Top rated",
            tabBarIcon: ({ color }) => <IconSymbol size={28} name='rated.fill' color={color} />}}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ 
            tabBarLabel: "Favorites",
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="star.fill" color={color} />
           }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
