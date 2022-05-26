import axios from "axios";
import { INewUser } from "../models/INewUser";
import { IResponseLogIn } from "../models/IResponseLogIn";
import { IUser } from "../models/IUser";

export class UserService {
  async postLogIn(userInfo: IUser) {
    let response = await axios.post<IResponseLogIn>(
      "https://assignmentnewsletterbackend.herokuapp.com/users/login",

      userInfo,

      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  }
  async postNewUser(newUserInfo: INewUser) {
    let response = await axios.post(
      "https://assignmentnewsletterbackend.herokuapp.com/users/newuser",

      newUserInfo,

      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  }
}
