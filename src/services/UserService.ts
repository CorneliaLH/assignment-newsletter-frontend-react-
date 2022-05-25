import axios from "axios";
import { INewUser } from "../models/INewUser";
import { IResponseLogIn } from "../models/IResponseLogIn";
import { IUser } from "../models/IUser";

export class UserService {
  async postLogIn(userInfo: IUser) {
    let response = await axios.post<IResponseLogIn>(
      "http://localhost:3001/users/login",

      userInfo,

      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  }
  async postNewUser(newUserInfo: INewUser) {
    let response = await axios.post(
      "http://localhost:3001/users/newuser",

      newUserInfo,

      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  }
}
