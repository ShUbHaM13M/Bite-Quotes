import React, { useEffect, useState } from 'react';
import { createStackNavigator, StackHeaderProps, StackNavigationOptions } from '@react-navigation/stack';
import pages from '../pages/pageInfo';
import Home from '../pages/Home';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';
import { useNetInfo } from '@react-native-community/netinfo';
import SavedQuotes from '../pages/SavedQuotes';
import TagPage from '../pages/TagPage';

const Stack = createStackNavigator();

const headerOptions = (): StackNavigationOptions => ({
    headerLeft: () => null,
    header: ({ scene }: StackHeaderProps) => {
        const routeName = scene.route.name === 'Home' ? 'Bite Quotes' : scene.route.name
        return <Header title={routeName} />
    },
})

const RootStack = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} options={
                headerOptions()
            } />
            {pages.map((page, index) => {
                return <Stack.Screen
                    key={index}
                    name={page.name}
                    component={page.component}
                />
            })}
            <Stack.Screen name='TagPage' component={TagPage} />
        </Stack.Navigator>
    );
}


export default RootStack