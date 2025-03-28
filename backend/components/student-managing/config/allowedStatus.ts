
import { StudyStatus } from "../domain/management/Student"

const allowStatus: Record<StudyStatus, StudyStatus[]> = {
  'Đang học': ['Đã thôi học', 'Đã tốt nghiệp', 'Tạm dừng học'],
  'Đã thôi học': [],
  'Đã tốt nghiệp': [],
  'Tạm dừng học': ['Đang học']
}

export default allowStatus;
