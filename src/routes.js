import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AddCity from './pages/addCity';
import ListCity from './pages/listCity';
import CityStatus from './pages/cityStatus';



export default createAppContainer(
    createBottomTabNavigator({
        Adicionar: AddCity,
        Cidades: createStackNavigator({
            ListCity,
            Consulta: CityStatus,
        })
    })
);