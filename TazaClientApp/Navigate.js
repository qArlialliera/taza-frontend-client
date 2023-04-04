import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Welcome } from "./src/Pages/BeforeLogin/Welcome";
import { Welcome2 } from "./src/Pages/BeforeLogin/Welcome2";
import { UserRegistration } from "./src/Pages/BeforeLogin/UserRegistration";
import { UserLogin } from "./src/Pages/BeforeLogin/UserLogin";
import { BottomBar } from "./src/Pages/AfterLogin/components/BottomBar";
import { Home } from "./src/Pages/AfterLogin/Home/Home";
import { CompanyList } from "./src/Pages/AfterLogin/CompanyList/CompanyList";
import { EditProfile } from "./src/Pages/AfterLogin/Profile/EditProfile";
import { AllCategories } from "./src/Pages/AfterLogin/Home/AllCategories";
import { CompanyDetails } from "./src/Pages/AfterLogin/CompanyList/CompanyDetails/CompanyDetails";


const Stack = createNativeStackNavigator();
// const token = retrieveUserSession()

export const Navigate = () => {
    // if(token._z == null) {
    //     console.log(token._z)
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Welcome" component={Welcome}  options={{headerShown: false}}/>
                    <Stack.Screen name="Welcome2" component={Welcome2}  options={{headerShown: false}}/>
                    <Stack.Screen name="UserRegistration" component={UserRegistration}  options={{headerShown: false}} />
                    <Stack.Screen name="UserLogin" component={UserLogin}  options={{headerShown: false}} />
                    <Stack.Screen name="Home" component={Home}  options={{headerShown: false}} />
                    <Stack.Screen name="BottomBar" component={BottomBar}  options={{headerShown: false}} />
                    <Stack.Screen name="edit_profile" component={EditProfile}  options={{headerShown: false}} />
                    <Stack.Screen name="all_categories" component={AllCategories}  options={{headerShown: false}} />
                    <Stack.Screen name="CompanyDetails" component={CompanyDetails}  options={{headerShown: false}} />
                    {/* <Stack.Screen name="BookFeautures" component={BookFeautures}  options={{headerShown: false}} /> */}
                    {/* <Stack.Screen name="Massages_Chat" component={MassagesChat}  options={{headerShown: false}} /> */}
                    
                </Stack.Navigator>
            </NavigationContainer>
    )
}

    // else {
    //     return (
    //         <NavigationContainer>
    //             <Stack.Navigator>
    //                 <Stack.Screen name="BottomBar" component={BottomBar}  options={{headerShown: false}} />
    //                 <Stack.Screen name="edit_profile" component={EditProfile}  options={{headerShown: false}} />
    //                 <Stack.Screen name="all_categories" component={AllCompanyList}  options={{headerShown: false}} />
    //                 <Stack.Screen name="CompanyDetails" component={CompanyDetails}  options={{headerShown: false}} />
    //                 <Stack.Screen name="BookFeautures" component={BookFeautures}  options={{headerShown: false}} />
    //                 <Stack.Screen name="Massages_Chat" component={MassagesChat}  options={{headerShown: false}} />
    //             </Stack.Navigator>
    //         </NavigationContainer>
    //     )
    // }

    
// }