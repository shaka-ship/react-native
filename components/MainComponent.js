import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { View, Platform,Image, StyleSheet, ScrollView } from 'react-native';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { createStackNavigator, createDrawerNavigator,DrawerItem, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders} from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDishes: () => dispatchEvent(fetchDishes()),
        fetchComments: () => dispatchEvent(fetchComments()),
        fetchPromos: () => dispatchEvent(fetchPromos()),
        fetchLeaders: () => dispatchEvent(fetchLeaders())
    }
}

const MenuNavigator = createStackNavigator({
        Menu: { screen: Menu,
        navigationOptions: ({navigation}) => ({
            headerLeft: <Icon name='menu' size={24}
                color='white' onPress={() => navigation.toggleDrawer()}/>
        }) },
        DishDetail: { screen: DishDetail }
    },
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            }
        }
    }
);

const HomeNavigator = createStackNavigator({
    Home: {screen: Home}
},
{
    initialRouteName: 'Home',
    navigationOptions: ({navigation}) => ( {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft: <Icon name='menu' size={24}
                color='white' onPress={() => navigation.toggleDrawer()}/>
    })
}
);

const ContactNavigator = createStackNavigator({
    Contact: {screen: Contact}
},
{
    initialRouteName: 'Contact Us',
    navigationOptions: ({navigation}) => ( {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft: <Icon name='menu' size={24}
                color='white' onPress={() => navigation.toggleDrawer()}/>
    })
}
);

const AboutNavigator = createStackNavigator({
    About: { screen: About }
  },
  {
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft: <Icon name='menu' size={24}
                color='white' onPress={() => navigation.toggleDrawer()}/>
    })
  }
);

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={StyleSheet.container}
            forceInset={{top:'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./images/logo.png')}
                        style={styles.drawerImage} />
                </View>
                <View style={{flex:2}}>
                    <Text style={styles.drawerHeaderText}>
                        Ristoronte con Fusion
                    </Text>
                </View>
            </View>   
            <DrawerItems {...props} /> 
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator  = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({tintColor}) => (
                <Icon name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor} />
            )
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({tintColor}) => (
                <Icon name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor} />
            )
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us',
            drawerIcon: ({tintColor}) => (
                <Icon name='address-card'
                    type='font-awesome'
                    size={22}
                    color={tintColor} />
            )
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us',
            drawerIcon: ({tintColor}) => (
                <Icon name='info'
                    type='font-awesome'
                    size={24}
                    color={tintColor} />
            )
        }    
    }
},{
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent
});

class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }
    render() {
        return (
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(Main);