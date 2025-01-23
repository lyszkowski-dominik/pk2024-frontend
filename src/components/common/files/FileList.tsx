import { useState } from 'react';
import { ApiFile } from '../../../types/types';
import { FileUploadForm } from './FileUploadForm';
import FileListEntry from './FileListEntry';
import FileListUploadEntry from './FileListUploadEntry';

type FileListProps = {
  files: ApiFile[];
  tableName: string;
  recordId: number;
  readonly invalidateQuery: readonly (number | string)[];
  canEditFiles: boolean;
};

export const FileList = ({
  files,
  tableName,
  recordId,
  invalidateQuery,
  canEditFiles,
}: FileListProps) => {
  const [uploadFileName, setUploadFileName] = useState<string>('');
  const [isPendingUpload, setIsPendingUpload] = useState<boolean>();

  return (
    <div>
      <h3>Pliki do pobrania</h3>
      <div>
        {files.length === 0 && !isPendingUpload && (
          <span>Brak plików do pobrania</span>
        )}
        <table>
          <tbody>
            {files.map((file) => (
              <FileListEntry
                key={file.id}
                invalidateQuery={invalidateQuery}
                canDelete={canEditFiles}
                file={file}
              />
            ))}
            {isPendingUpload && (
              <FileListUploadEntry fileName={uploadFileName} />
            )}
          </tbody>
        </table>
        {canEditFiles && (
          <FileUploadForm
            tableName={tableName}
            recordId={recordId}
            invalidateQuery={invalidateQuery}
            setFileName={setUploadFileName}
            setIsPendingUpload={setIsPendingUpload}
          />
        )}
      </div>
    </div>
  );
};
