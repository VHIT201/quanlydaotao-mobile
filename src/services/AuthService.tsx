import axios from 'axios'
import { getTokens, saveTokens } from './TokenService'
import { API_URL } from '@env'

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000 // Thời gian tối đa chờ phản hồi từ server (10s)
})


// Gắn accessToken vào mỗi request
api.interceptors.request.use(async (config) => {
    const tokens = await getTokens()
    const accessToken = tokens?.accessToken;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config
})

api.interceptors.response.use(
    res => {
        return res
    }, // Nếu response thành công, trả lại kết quả bình thường
    async (error) => { 
        const originalRequest = error.config  // Lưu lại request ban đầu
        // Nếu server trả về 401 (token hết hạn) và request chưa được retry
        if(error.response?.status === 401 && !originalRequest._retry) {  
            originalRequest._retry = true // Đánh dấu đã thử refresh token một lần
            const { refreshToken } = await getTokens() // Lấy refresh token từ storage 
            if (refreshToken) { 
                const response = await axios.post(`${API_URL}`, {refreshToken})  // Gửi request refresh token để lấy access token mới
                await saveTokens(response.data.accessToken, response.data.refreshToken) // Lưu lại cặp token mới
                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}` // Gắn access token mới vào request ban đầu
                return api(originalRequest) // Thực hiện lại request ban đầu với token mới
            }
        }
        //  Nếu không có refresh token hoặc refresh thất bại → ném lỗi ra
        console.log(error)
        return Promise.reject(error)
    }
)

export const loginApi = async (username: string, password: string) => {
  const payload = {identifier: username, password}
  console.log(API_URL)
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    const json = await res.json()
    return json.data   
  }
  catch(e) {
    console.log(e)
  }
}

export const logoutApi = async () => {
    await api.post('/auth/logout')
}

export default api