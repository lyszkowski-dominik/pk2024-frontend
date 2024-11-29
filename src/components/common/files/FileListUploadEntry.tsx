import { truncateFileName } from '../../../utils/text';
import Spinner from '../../ui/spinner/Spinner';
import styles from './FileList.module.scss';
import { InsertDriveFileOutlined } from '@mui/icons-material';

type FileListUploadEntryProps = {
  fileName: string;
};

const FileListUploadEntry = ({ fileName }: FileListUploadEntryProps) => {
  return (
    <tr className={styles['file-list-item']}>
      <td>
        <InsertDriveFileOutlined
          style={{ paddingTop: '5px', color: 'var(--pink)' }}
        />
      </td>
      <td>{truncateFileName(fileName)}</td>
      <td>
        <Spinner size={12} />
      </td>
    </tr>
  );
};

export default FileListUploadEntry;
