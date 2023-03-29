import { Box } from '@mui/material';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
import { Navigate, useLocation } from 'react-router-dom';
import { formatDate } from 'utils';

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    color: 'black',
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
  },
  viewer: {
    width: '100%', 
    height: '100%',
  },
});

const ExportGrades = () => {
  const location = useLocation();

  const data = location.state?.data;

  if(!data) {
    return (<Navigate to=".." />);
  }

  return (
    <Box maxWidth="100%" height="80vh" sx={{ mt: 2 }}>
      <PDFViewer style={styles.viewer}>
        {/* Start of the document*/}
        <Document>
          {/*render a single page*/}
          <Page size="LETTER" style={styles.page}>
            <View style={styles.section}>
              <Text style={{ fontSize: '22pt', fontFamily: 'Helvetica-Bold' }}>Quiztionnaire Grades</Text>
              <Text style={{ fontSize: '12pt', marginTop: 10 }}>Class: {data.title}</Text>
              <Text style={{ fontSize: '11pt', marginTop: 5 }}>Instructor: John Smith</Text>
            </View>
            <View style={{ paddingHorizontal: 10, marginHorizontal: 20 }}>
              <Text style={{ fontSize: '16pt', fontFamily: 'Helvetica-Bold' }}>Students</Text>
              {data.studentGrades.map((student, index) => (
                <View key={index} style={{ marginVertical: 5 }}>
                  <Text style={{ fontSize: '14pt', marginBottom: 5 }}>{student.name}</Text>
                  <Text style={{ fontSize: '12pt' }}>{student.email}</Text>
                  <View style={{ margin: 5 }}>
                    {student.grades.map((grade, index) => (
                      <Text key={index} style={{ fontSize: '11pt', marginBottom: 5, marginLeft: 5 }}>• {grade.quizTitle}, {formatDate(grade.date)}: {grade.grade}%</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </Box>
  );
};
export default ExportGrades;