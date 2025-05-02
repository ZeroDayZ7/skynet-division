import loginPage from './en/LoginPage.json'
import registerPage from './en/RegisterPage.json'
import registerForm from './en/RegisterForm.json'
import captcha from './en/Captcha.json'
import supportPage from './en/SupportPage.json'
import sidebar from './en/Sidebar.json'
import eDocuments from './en/EDocuments.json'
import navUser from './en/NavUser.json'
import dashboard from './en/Dashboard.json'
import userProfile from './en/UserProfile.json'

const messagesEN = {
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

export default messagesEN;
// console.log(JSON.stringify(messages, null, 2))
// tsx index.ts