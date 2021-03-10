import request from '@/utils/request'
import qs from 'qs'

export interface UserData {
  phone: string;
  password: string;
}

export interface Payload {
  state: number;
  message: string;
  content: string;
  success: boolean;
}

// 用户登录
export const login = (data: UserData) => {
  return request.post<Payload>('/front/user/login', qs.stringify(data))
}

export interface UserInfo {
  isUpdatedPassword: boolean;
  weixinNickName: string;
  userName: string;
  portrait: string;
}

export interface UserInfoPayload {
  state: number;
  message: string;
  content: UserInfo;
  success: boolean;
}

// 获取用户信息
export const getUserInfo = () => {
  return request.get<UserInfoPayload>('/front/user/getInfo')
}

// 用户退出
export const logout = () => {
  return request.post<Payload>('/front/user/logout')
}
