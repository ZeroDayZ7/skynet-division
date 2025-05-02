import loginPage from './pl/LoginPage.json'
import registerPage from './pl/RegisterPage.json'
import registerForm from './pl/RegisterForm.json'
import captcha from './pl/Captcha.json'
import supportPage from './pl/SupportPage.json'
import sidebar from './pl/Sidebar.json'
import eDocuments from './pl/EDocuments.json'
import navUser from './pl/NavUser.json'
import dashboard from './pl/Dashboard.json'
import userProfile from './pl/UserProfile.json'

const messagesPL = {
    ...loginPage,
    ...registerPage,
    ...registerForm,
    ...captcha,
    ...supportPage,
    ...sidebar,
    ...eDocuments,
    ...navUser,
    ...dashboard,
    ...userProfile,
  }

export default messagesPL;
// console.log(JSON.stringify(messages, null, 2))
// tsx index.ts