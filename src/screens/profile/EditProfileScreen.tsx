import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  Linking,
  Platform,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import {ArrowLeft, Edit2, RefreshCw, User, Phone, BookOpen, Info, Copy} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

type Student = {
  studentId: string;
  fullName: string;
  dob: string; // DD/MM/YYYY
  gender: string;
  idNumber: string;
  ethnicity?: string;
  religion?: string;
  nationality?: string;
  phone?: string;
  email?: string;
  permanentAddress?: string;
  currentAddress?: string;
  major?: string;
  className?: string;
  cohort?: string;
  faculty?: string;
  status?: string;
  gpa?: string;
  credits?: string;
  enrolledDate?: string;
  expectedGradDate?: string;
  trainingType?: string;
  scholarship?: string;
  activities?: string;
  awards?: string;
  notes?: string;
};

const sampleStudent: Student = {
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

const maskId = (id = '') => {
  if (id.length <= 4) return id;
  const left = id.slice(0, 2);
  const right = id.slice(-2);
  const middle = '*'.repeat(Math.max(0, id.length - 4));
  return `${left}${middle}${right}`;
};

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const [student, setStudent] = useState<Student>(sampleStudent);
  const [editing, setEditing] = useState(false);
  const [openBasic, setOpenBasic] = useState(true);
  const [openContact, setOpenContact] = useState(true);
  const [openAcademic, setOpenAcademic] = useState(true);
  const [openAdditional, setOpenAdditional] = useState(false);

  useEffect(() => {
    // enable LayoutAnimation on Android
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const handleCall = (phone?: string) => {
    if (!phone) return;
    const url = `tel:${phone}`;
    Linking.openURL(url).catch(() => Alert.alert('Lỗi', 'Không thể gọi số này'));
  };

  const handleEmail = (email?: string) => {
    if (!email) return;
    const url = `mailto:${email}`;
    Linking.openURL(url).catch(() => Alert.alert('Lỗi', 'Không thể mở email'));
  };

  const handleSave = () => {
    // Placeholder: here you would call API to save
    setEditing(false);
    Alert.alert('Lưu thành công', 'Đã lưu thông tin sinh viên (mô phỏng)');
  };

  const handleSync = () => {
    // Placeholder: trigger sync with backend
    Alert.alert('Đồng bộ', 'Đang đồng bộ dữ liệu... (mô phỏng)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => (navigation as any).goBack()} style={styles.backBtn}>
          <ArrowLeft size={20} color="#0f172a" />
        </Pressable>
        <Text style={styles.title}>Hồ sơ sinh viên</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable onPress={() => setEditing(v => !v)} style={styles.headerAction}>
            <Edit2 size={18} color={editing ? '#fff' : '#0f172a'} />
          </Pressable>
          <Pressable onPress={handleSync} style={[styles.headerAction, {marginLeft: 8}]}>
            <RefreshCw size={18} color="#0f172a" />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header card */}
        <View style={styles.cardHeader}>
          <View style={styles.avatarBig}>
            <Text style={styles.avatarBigText}>{student.fullName.split(' ').slice(-1)[0][0]}</Text>
          </View>
          <Pressable style={styles.avatarUpload} onPress={() => Alert.alert('Upload ảnh', 'Chức năng upload chưa cài')}>
            <Text style={{color: '#0f172a', fontWeight: '700'}}>Thay ảnh</Text>
          </Pressable>
          <View style={{flex: 1, marginLeft: 12}}>
            <Text style={styles.fullName}>{student.fullName}</Text>
            <Text style={styles.studentId}>{student.studentId}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
              <View style={styles.badge}><Text style={styles.badgeText}>{student.status}</Text></View>
              <View style={[styles.badge, {backgroundColor: '#eef2ff', marginLeft: 8}]}><Text style={[styles.badgeText, {color: '#0369a1'}]}>GPA {student.gpa}</Text></View>
            </View>
          </View>
        </View>

        {/* Section: Basic info (collapsible) */}
        <Pressable
          style={styles.sectionHeader}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setOpenBasic(v => !v);
          }}
        >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.iconCircle}><User size={16} color="#0369a1" /></View>
            <Text style={styles.sectionTitleSmall}>Thông tin cơ bản</Text>
          </View>
          <Text style={styles.toggle}>{openBasic ? 'Thu gọn' : 'Mở'}</Text>
        </Pressable>
        {openBasic && (
          <View style={styles.section}>
            <View style={styles.row}><Text style={styles.fieldLabel}>Mã sinh viên</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.fieldValue}>{student.studentId}</Text>
                <Pressable onPress={() => Alert.alert('Sao chép', `Mã đã được sao chép: ${student.studentId}`)} style={{marginLeft: 8}}>
                  <Copy size={16} color="#0f172a" />
                </Pressable>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.fieldLabel}>Họ và tên</Text>
              {editing ? (
                <TextInput value={student.fullName} onChangeText={v => setStudent({...student, fullName: v})} style={styles.inputInline} />
              ) : (
                <Text style={styles.fieldValue}>{student.fullName}</Text>
              )}
            </View>

            <View style={styles.row}>
              <Text style={styles.fieldLabel}>Ngày sinh</Text>
              {editing ? (
                <TextInput value={student.dob} onChangeText={v => setStudent({...student, dob: v})} style={styles.inputInline} />
              ) : (
                <Text style={styles.fieldValue}>{student.dob}</Text>
              )}
            </View>

            <View style={styles.row}><Text style={styles.fieldLabel}>Giới tính</Text><Text style={styles.fieldValue}>{student.gender}</Text></View>
            <View style={styles.row}><Text style={styles.fieldLabel}>CCCD/CMND</Text><Text style={styles.fieldValue}>{maskId(student.idNumber)}</Text></View>
            <View style={styles.row}><Text style={styles.fieldLabel}>Dân tộc</Text><Text style={styles.fieldValue}>{student.ethnicity}</Text></View>
            <View style={styles.row}><Text style={styles.fieldLabel}>Tôn giáo</Text><Text style={styles.fieldValue}>{student.religion}</Text></View>
            <View style={styles.row}><Text style={styles.fieldLabel}>Quốc tịch</Text><Text style={styles.fieldValue}>{student.nationality}</Text></View>
          </View>
        )}

        {/* Contact (collapsible) */}
        <Pressable
          style={styles.sectionHeader}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setOpenContact(v => !v);
          }}
        >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.iconCircle}><Phone size={14} color="#0369a1" /></View>
            <Text style={styles.sectionTitleSmall}>Thông tin liên hệ</Text>
          </View>
          <Text style={styles.toggle}>{openContact ? 'Thu gọn' : 'Mở'}</Text>
        </Pressable>
        {openContact && (
          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.fieldLabel}>Số điện thoại</Text>
              {editing ? (
                <TextInput value={student.phone} onChangeText={v => setStudent({...student, phone: v})} style={styles.inputInline} keyboardType="phone-pad" />
              ) : (
                <Pressable onPress={() => handleCall(student.phone)}><Text style={[styles.fieldValue, styles.link]}>{student.phone}</Text></Pressable>
              )}
            </View>
            <View style={styles.row}>
              <Text style={styles.fieldLabel}>Email</Text>
              {editing ? (
                <TextInput value={student.email} onChangeText={v => setStudent({...student, email: v})} style={styles.inputInline} keyboardType="email-address" />
              ) : (
                <Pressable onPress={() => handleEmail(student.email)}><Text style={[styles.fieldValue, styles.link]}>{student.email}</Text></Pressable>
              )}
            </View>
            <View style={styles.row}><Text style={styles.fieldLabel}>Địa chỉ thường trú</Text><Text style={styles.fieldValue}>{student.permanentAddress}</Text></View>
            <View style={styles.row}><Text style={styles.fieldLabel}>Địa chỉ tạm trú</Text><Text style={styles.fieldValue}>{student.currentAddress}</Text></View>
          </View>
        )}

        {/* Academic (collapsible) */}
        <Pressable
          style={styles.sectionHeader}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setOpenAcademic(v => !v);
          }}
        >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.iconCircle}><BookOpen size={14} color="#0369a1" /></View>
            <Text style={styles.sectionTitleSmall}>Thông tin học tập</Text>
          </View>
          <Text style={styles.toggle}>{openAcademic ? 'Thu gọn' : 'Mở'}</Text>
        </Pressable>
        {openAcademic && (
          <View style={styles.section}>
            <View style={styles.row}><Text style={styles.fieldLabel}>Ngành học</Text><Text style={styles.fieldValue}>{student.major}</Text></View>
            <View style={styles.row}><Text style={styles.fieldLabel}>Lớp</Text><Text style={styles.fieldValue}>{student.className}</Text></View>
            <View style={styles.row}><Text style={styles.fieldLabel}>Khóa</Text><Text style={styles.fieldValue}>{student.cohort}</Text></View>
            <View style={styles.row}><Text style={styles.fieldLabel}>Khoa</Text><Text style={styles.fieldValue}>{student.faculty}</Text></View>
            <View style={styles.row}><Text style={styles.fieldLabel}>Trạng thái</Text><Text style={styles.fieldValue}>{student.status}</Text></View>
            <View style={styles.row}><Text style={styles.fieldLabel}>GPA</Text><Text style={styles.fieldValue}>{student.gpa}</Text></View>
            <View style={styles.row}><Text style={styles.fieldLabel}>Tín chỉ</Text><Text style={styles.fieldValue}>{student.credits}</Text></View>
          </View>
        )}

        {/* Additional (collapsible) */}
        <Pressable
          style={styles.sectionHeader}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setOpenAdditional(v => !v);
          }}
        >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.iconCircle}><Info size={14} color="#0369a1" /></View>
            <Text style={styles.sectionTitleSmall}>Thông tin bổ sung</Text>
          </View>
          <Text style={styles.toggle}>{openAdditional ? 'Thu gọn' : 'Mở'}</Text>
        </Pressable>
        {openAdditional && (
          <View style={styles.section}>
            <View style={styles.row}><Text style={styles.fieldLabel}>Ngày nhập học</Text><Text style={styles.fieldValue}>{student.enrolledDate}</Text></View>
            <View style={styles.row}><Text style={styles.fieldLabel}>Ngày tốt nghiệp dự kiến</Text><Text style={styles.fieldValue}>{student.expectedGradDate}</Text></View>
            <View style={styles.row}><Text style={styles.fieldLabel}>Loại hình đào tạo</Text><Text style={styles.fieldValue}>{student.trainingType}</Text></View>
            <View style={styles.row}><Text style={styles.fieldLabel}>Học bổng</Text><Text style={styles.fieldValue}>{student.scholarship}</Text></View>
            <View style={styles.row}><Text style={styles.fieldLabel}>Hoạt động</Text><Text style={styles.fieldValue}>{student.activities}</Text></View>
            <View style={styles.row}><Text style={styles.fieldLabel}>Khen thưởng/Kỷ luật</Text><Text style={styles.fieldValue}>{student.awards}</Text></View>
            <View style={styles.row}><Text style={styles.fieldLabel}>Ghi chú</Text><Text style={styles.fieldValue}>{student.notes || '-'}</Text></View>
          </View>
        )}
      </ScrollView>

      {/* Footer actions */}
      <View style={styles.footerBar}>
        {editing ? (
          <>
            <Pressable style={styles.footerBtnCancel} onPress={() => setEditing(false)}><Text style={[styles.footerBtnText, {color: '#0f172a'}]}>Hủy</Text></Pressable>
            <Pressable style={[styles.footerBtnPrimary, {marginLeft: 8}]} onPress={handleSave}><Text style={[styles.footerBtnText, {color: '#fff'}]}>Lưu</Text></Pressable>
          </>
        ) : (
          <>
            <Pressable style={styles.footerBtn} onPress={() => setEditing(true)}><Text style={styles.footerBtnText}>Chỉnh sửa</Text></Pressable>
            <Pressable style={[styles.footerBtn, {marginLeft: 8}]} onPress={handleSync}><Text style={styles.footerBtnText}>Đồng bộ</Text></Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f6f8fb'},
  header: {height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eef2ff'},
  backBtn: {padding: 8},
  title: {fontSize: 18, fontWeight: '800', color: '#0f172a'},
  headerAction: {backgroundColor: '#fff', padding: 8, borderRadius: 8, borderWidth: 1, borderColor: '#e6eefc'},
  scroll: {padding: 16, paddingBottom: 96},

  cardHeader: {flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 12, elevation: 1},
  avatarBig: {width: 80, height: 80, borderRadius: 40, backgroundColor: '#e0f2fe', alignItems: 'center', justifyContent: 'center'},
  avatarBigText: {fontSize: 28, fontWeight: '900', color: '#0369a1'},
  fullName: {fontSize: 18, fontWeight: '900', color: '#0f172a'},
  studentId: {color: '#64748b', marginTop: 4},
  muted: {color: '#94a3b8', marginTop: 6},

  section: {backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 12},
  sectionTitle: {fontSize: 14, fontWeight: '800', marginBottom: 8},
  sectionHeader: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 4, marginBottom: 6},
  sectionTitleSmall: {fontSize: 14, fontWeight: '800', marginLeft: 8, color: '#0f172a'},
  iconCircle: {width: 36, height: 36, borderRadius: 10, backgroundColor: '#eef2ff', alignItems: 'center', justifyContent: 'center'},
  toggle: {color: '#64748b', fontSize: 13},
  row: {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f5f9'},
  fieldLabel: {color: '#64748b', fontWeight: '700'},
  fieldValue: {color: '#0f172a', maxWidth: '65%', textAlign: 'right'},
  link: {color: '#0ea5e9', textDecorationLine: 'underline'},

  footerBar: {position: 'absolute', left: 0, right: 0, bottom: 0, padding: 12, flexDirection: 'row', backgroundColor: 'transparent'},
  footerBtn: {flex: 1, backgroundColor: '#fff', padding: 14, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#e6eefc'},
  footerBtnCancel: {flex: 1, backgroundColor: '#fff', padding: 14, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#e6eefc'},
  footerBtnPrimary: {flex: 1, backgroundColor: '#0ea5e9', padding: 14, borderRadius: 10, alignItems: 'center'},
  footerBtnText: {color: '#0f172a', fontWeight: '800'},
  inputInline: {minWidth: 140, backgroundColor: '#f8fafc', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#e6eefc', textAlign: 'right'},
  badge: {backgroundColor: '#f0f9ff', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 20},
  badgeText: {color: '#0369a1', fontWeight: '800'},
  avatarUpload: {position: 'absolute', right: 12, top: 12, padding: 6},
});

export default EditProfileScreen;