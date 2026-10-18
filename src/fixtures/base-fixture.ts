import {test as baseTest} from '@playwright/test'
import { BasePage } from '../pages/BasePage'
import {HomePage} from "../pages/HomePage"
import { LoginPage } from '../pages/LoginPage';
import { Header } from '../components/Header';
import { RegisterPage } from '../pages/RegisterPage';
import { AccountPage } from '../pages/AccountPage';


export const test = baseTest.extend<{
    basePage: BasePage,
    homePage: HomePage,
    loginPage: LoginPage,
    header: Header,
    registerPage:RegisterPage,
    accountPage: AccountPage
}>({
    basePage: async ({page}, use)=>{
        await use(new BasePage(page));
    },
    homePage: async ({page}, use) =>{
        await use(new HomePage(page));
    },
    loginPage: async({page}, use) =>{
        await use(new LoginPage(page));
    },
    header: async({page}, use)=>{
        await use(new Header(page));
    },
    registerPage: async({page}, use)=>{
        await use(new RegisterPage(page));
    },
    accountPage: async({page}, use)=>{
        await use(new AccountPage(page));
    }
});