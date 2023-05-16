import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import { BookFeatures } from "./src/Pages/AfterLogin/CompanyList/BookFeatures/BookFeatures";
import { FindByCategory } from "./src/Pages/AfterLogin/PageByCategory/FindByCategory";
import { getRefreshToken } from "./src/Storage/TokenStorage";
import { StatusBar } from 'react-native'
import { SpecialOffers } from "./src/Pages/AfterLogin/Home/SpecialOffers";
// import { OpenMap } from "./src/Pages/AfterLogin/CompanyList/Map/OpenMap";
import { MessagesChat } from "./src/Pages/AfterLogin/Messages/MassagesChat";
import { WelcomeChooseRole } from "./src/Pages/BeforeLogin/WelcomeChooseRole";
import { CompanyRegistration } from "./src/Pages/BeforeLogin/CompanyRegistration";
import { getRole } from "./src/Storage/RoleStorage";
import { BottomBarCompany } from "./src/Pages/CompanyView/BottomBarCompany";
import { CreateCompany } from "./src/Pages/CompanyView/CompanyController/CreateCompany";
import { MessagesCompRepChat } from "./src/Pages/CompanyView/Messages/MessagesCompRepChat";
import { CreateSpecialOffers } from "./src/Pages/CompanyView/Home/CreateSpecialOffers";
import { CreateCompanyButton } from "./src/Pages/CompanyView/CreateCompanyButton";
import { CreateServices } from "./src/Pages/CompanyView/CompanyController/CreateServices/CreateServices";
import { AddPriceToService } from "./src/Pages/CompanyView/CompanyController/CreateServices/AddPriceToService";
import { ProfileCompRep_EditInformation } from "./src/Pages/CompanyView/Profile/Information/ProfileCompRep_EditInformation";
import { CheckData } from "./src/Pages/CompanyView/CompanyController/CreateServices/CheckData";
import { MessagesChatStomp } from "./src/Pages/AfterLogin/Messages/MessagesChatStomp";
import { HomeOrders } from "./src/Pages/CompanyView/Home/HomeOrders";
import { AllOrderList } from "./src/Pages/CompanyView/Home/AllOrderList";
import { AllOrderListUser } from "./src/Pages/AfterLogin/Home/AllOrderListUser";


const Stack = createNativeStackNavigator();


export const Navigate = () => {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor='#414C60' barStyle='light-content' />
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                <Stack.Screen name="WelcomeChooseRole" component={WelcomeChooseRole} options={{ headerShown: false }} />
                <Stack.Screen name="Welcome2" component={Welcome2} options={{ headerShown: false }} />
                <Stack.Screen name="UserRegistration" component={UserRegistration} options={{ headerShown: false }} />
                <Stack.Screen name="CompanyRegistration" component={CompanyRegistration} options={{ headerShown: false }} />
                <Stack.Screen name="UserLogin" component={UserLogin} options={{ headerShown: false }} />

                <Stack.Screen name="BottomBar" component={BottomBar} options={{ headerShown: false }} />
                <Stack.Screen name="edit_profile" component={EditProfile} options={{ headerShown: false }} />
                <Stack.Screen name="all_categories" component={AllCategories} options={{ headerShown: false }} />
                <Stack.Screen name="CompanyDetails" component={CompanyDetails} options={{ headerShown: false }} />
                <Stack.Screen name="BookFeautures" component={BookFeatures} options={{ headerShown: false }} />
                <Stack.Screen name="FindByCategory" component={FindByCategory} options={{ headerShown: false }} />
                <Stack.Screen name="SpecialOffers" component={SpecialOffers} options={{ headerShown: false }} />
                <Stack.Screen name="Massages_Chat" component={MessagesChatStomp} options={{ headerShown: false }} />
                <Stack.Screen name="AllOrderListUser" component={AllOrderListUser} options={{ headerShown: false }} />

                <Stack.Screen name="BottomBarCompany" component={BottomBarCompany} options={{ headerShown: false }} />
                <Stack.Screen name="CreateCompany" component={CreateCompany} options={{ headerShown: false }} />
                <Stack.Screen name="MessagesCompRepChat" component={MessagesCompRepChat} options={{ headerShown: false }} />
                <Stack.Screen name="CreateSpecialOffers" component={CreateSpecialOffers} options={{ headerShown: false }} />
                <Stack.Screen name="CreateCompanyButton" component={CreateCompanyButton} options={{ headerShown: false }} />
                <Stack.Screen name="CreateServices" component={CreateServices} options={{ headerShown: false }} />
                <Stack.Screen name="AddPriceToService" component={AddPriceToService} options={{ headerShown: false }} />
                <Stack.Screen name="ProfileCompRep_EditInformation" component={ProfileCompRep_EditInformation} options={{ headerShown: false }} />
                <Stack.Screen name="CheckData" component={CheckData} options={{ headerShown: false }} />
                <Stack.Screen name="HomeOrders" component={HomeOrders} options={{ headerShown: false }} />
                <Stack.Screen name="AllOrderList" component={AllOrderList} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    )



}