import {setGenericPassword, getGenericPassword, resetGenericPassword} from 'react-native-keychain'

// Lưu token đã mã hóa vào vùng lưu trữ của hệ điều hành
export const saveTokens = async (accessToken: string, refreshToken: string) => {
    await setGenericPassword('auth', JSON.stringify({accessToken, refreshToken}))
}

// Lấy thông tin token sau khi đã xác thực thông tin
export const getTokens = async () => {
    const credentials = await getGenericPassword()
    if(credentials)
        return JSON.parse(credentials.password)
    return null
}

// Xóa tất cả token
export const clearTokens = async () => {
    await resetGenericPassword()
}