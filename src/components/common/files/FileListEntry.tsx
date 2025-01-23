import { InsertDriveFileOutlined } from '@mui/icons-material';
import styles from './FileList.module.scss';
import { useDeleteFile } from './useDeleteFile';
import IconButton from '../../ui/iconButton/IconButton';
import { ApiFile } from '../../../types/types';
import Spinner from '../../ui/spinner/Spinner';
import { truncateFileName } from '../../../utils/text';

type FileListEntryProps = {
  readonly invalidateQuery: readonly (number | string)[];
  canDelete: boolean;
  file: ApiFile;
};

const FileListEntry = ({
  invalidateQuery,
  canDelete,
  file,
}: FileListEntryProps) => {
  const deleteFile = useDeleteFile(invalidateQuery);

  const handleDelete = async (fileId: number) => {
    deleteFile.mutate(fileId);
  };

  return (
    <tr className={styles['file-list-item']}>
      <td>
        <InsertDriveFileOutlined
          style={{ paddingTop: '5px', color: 'var(--pink)' }}
        />
      </td>
      <td>
        <a href={file.url}>{truncateFileName(file.file_name)}</a>
      </td>
      <td>
        {canDelete && (
          <>
            {deleteFile.status === 'pending' && <Spinner size={14} />}
            {deleteFile.status !== 'pending' && (
              <IconButton
                iconName="delete"
                onClick={() => handleDelete(file.id || -1)}
                altText="Usuń plik"
                size={18}
              />
            )}
          </>
        )}
      </td>
    </tr>
  );
};

export default FileListEntry;
