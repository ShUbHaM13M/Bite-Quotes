import React, { SetStateAction, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import pages from '../pages/pageInfo';
import Home from '../pages/Home/Home';
import Header from '../components/Header';
import TagPage from '../pages/TagPage/TagPage';

const Stack = createStackNavigator();

interface RootStackProps {
    setLoaded: React.Dispatch<SetStateAction<boolean>>
}

const RootStack = ({ setLoaded }: RootStackProps) => {

    useEffect(() => {
        setTimeout(() => setLoaded(true), 500)
    }, [])

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} options={{
                headerLeft: () => null,
                header: () => (<Header title="Bite Quotes" />)
            }} />
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