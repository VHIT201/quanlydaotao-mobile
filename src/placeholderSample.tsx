import { Student, Action, ClassItem, Announcement } from "./types/Types";
import {
  CalendarDays,
  // Clock,
  CheckSquare,
  BookOpen,
  // User,
  Star,
  // Search,
  // PieChart,
  // Activity,
  // Check,
} from 'lucide-react-native';
export const sampleStudent: Student = {
  studentId: 'SV2020001',
  fullName: 'Nguyễn Văn A',
  dob: '15/08/2001',
  gender: 'Nam',
  idNumber: '012345678901',
  ethnicity: 'Kinh',
  religion: 'Không',
  nationality: 'Việt Nam',
  phone: '0123456789',
  email: 'nguyenvana@example.com',
  permanentAddress: 'Hà Nội, Ba Đình, Phúc Xá',
  currentAddress: 'Hà Nội, Cầu Giấy, Nghĩa Tân',
  major: 'Công nghệ thông tin',
  className: 'D20_TH01',
  cohort: '2020–2024',
  faculty: 'Khoa CNTT',
  status: 'Đang học',
  gpa: '3.5/4.0',
  credits: '120',
  enrolledDate: '01/09/2020',
  expectedGradDate: '30/06/2024',
  trainingType: 'Chính quy',
  scholarship: 'Không',
  activities: 'Câu lạc bộ lập trình, Tình nguyện',
  awards: 'Sinh viên tiên tiến 2022',
  notes: '',
};

export const quickActions: Action[] = [
  {id: '1', title: 'Đăng ký lớp', icon: BookOpen, color: '#5E60CE'},
  {id: '2', title: 'Xem điểm', icon: Star, color: '#FFB703'},
  {id: '3', title: 'Lịch học', icon: CalendarDays, color: '#2196F3'},
  {id: '4', title: 'Điểm danh', icon: CheckSquare, color: '#06D6A0'},
];


export const announcements: Announcement[] = [
  {id: 'n1', title: 'Thông báo nghỉ lễ', body: 'Trường nghỉ lễ từ 1/5 đến 3/5. Lưu ý lịch học online.', date: '01 May'},
  {id: 'n2', title: 'Lịch thi giữa kỳ', body: 'Đăng ký phòng thi trước ngày 10. Xem chi tiết ở phần Thi.', date: '20 May'},
  {id: 'n3', title: 'Cập nhật điểm', body: 'Điểm giữa kỳ đã được cập nhật. Vui lòng kiểm tra bảng điểm.', date: '02 Jun'},
];

export const upcoming: ClassItem[] = [
  {id: 'a', subject: 'Toán Đại số', time: '08:00 - 09:30', room: 'P101', teacher: 'Thầy Hùng', status: 'upcoming'},
  {id: 'b', subject: 'Lập trình di động', time: '10:00 - 11:30', room: 'P202', teacher: 'Cô Lan', status: 'live'},
  {id: 'c', subject: 'Tiếng Anh', time: '14:00 - 15:30', room: 'P303', teacher: 'Thầy Nam', status: 'upcoming'},
  {id: 'd', subject: 'Vật lý', time: '16:00 - 17:30', room: 'P404', teacher: 'Cô Mai', status: 'done'},
];

export const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30'
export const REFRESH_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IjBjODFkNmNjZWI5NWM5Y2VkYTBmOGUzOWVlN2RhODZiIn0.e30.xnh3qmfFNeoe4Lh5XMsFXTIlxVcRDj02O0ZzDJk7CQGDq4NWIPX1i2sdqzHSbBDFYtWIzXULZaZGFeGpsKNoUQ'