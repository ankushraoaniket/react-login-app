import {createStore} from 'redux'
import { userReducer } from '../redux/loginData/userReducer'

const store = createStore(userReducer)

export default store