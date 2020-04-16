import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Login from './pages/login';
import Register from './pages/register';
import AddCity from './pages/addCity';
import ListCity from './pages/listCity';
import CityStatus from './pages/cityStatus';



const AppRoute = createSwitchNavigator({
    Login: Login,
    Register: Register,
    Cidade: createStackNavigator({
        Cidade: AddCity,
        Lista: ListCity,
        Status: CityStatus,
    })
})

export default createAppContainer(AppRoute);
