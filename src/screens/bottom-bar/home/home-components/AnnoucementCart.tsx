import { View, Text, Dimensions, StyleSheet } from "react-native";
import { Mail } from "lucide-react-native";
import { Announcement } from "../../../../types/Types";

const {width} = Dimensions.get('window');
const AnnouncementCard = ({item}: {item: Announcement}) => {
  return (
    <View style={styles.announcementCard}>
      <View style={styles.announcementLeft}>
        <Mail size={18} color="#fff" />
      </View>
      <View style={styles.announcementBody}>
        <Text style={styles.announcementTitle}>{item.title}</Text>
        <Text style={styles.announcementText} numberOfLines={2}>{item.body}</Text>
      </View>
      <Text style={styles.announcementDate}>{item.date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    announcementCard: {width: width * 0.78, marginRight: 12, backgroundColor: '#2563EB', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center'},
    announcementLeft: {width: 44, height: 44, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', marginRight: 12},
    announcementBody: {flex: 1},
    announcementsRow: {marginBottom: 12},
    announcementTitle: {color: '#fff', fontWeight: '800', fontSize: 14},
    announcementText: {color: '#e6eefc', marginTop: 6, fontSize: 12},
    announcementDate: {color: '#cfe0ff', marginLeft: 8, fontSize: 11},
})

export default AnnouncementCard

