import { useState } from 'react';

import { useAppSelector } from '../../app/hooks';
import { selectRoles } from '../loginForm/loginFormSlice';
import { UserRole } from '../../types/types';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import usePagination from '../../hooks/usePagiantion';
import { useGetUsers } from '../../features/users/useGetUsers';
import List from '../common/list/List';
import { columns } from './utils';
import { User } from '../../features/users/usersTypes';
import RemoveUserConfirmation from './RemoveUserConfirmation';
import Spinner from '../ui/spinner/Spinner';

export interface UsersListProps {
  type: UserRole;
}

const UsersList = ({ type }: UsersListProps) => {
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const [selectedUser, setSelectedUser] = useState(-1);
  const { page, setPage, pageSize } = usePagination();
  const userRole = useAppSelector(selectRoles);
  const isManager =
    userRole === UserRole.Manager || userRole === UserRole.Admin;
  const hoa = useAppSelector(selectSelectedCommunity) || -1;

  function changePage(pageNumber: number) {
    setPage(pageNumber);
  }

  const { isLoading, data } = useGetUsers({
    role: type,
    hoaId: hoa,
    page,
    pageSize,
  });

  return (
    <>
      {deleteModalOn && (
        <RemoveUserConfirmation
          userId={selectedUser}
          role={type}
          onClose={() => setDeleteModalOn(false)}
        />
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        data && (
          <List
            data={data}
            columns={columns}
            onPageChange={changePage}
            page={page}
            pageSize={pageSize}
            {...(isManager && {
              onDelete: (user: User) => {
                setSelectedUser(user.id);
                setDeleteModalOn(true);
              },
            })}
          />
        )
      )}
    </>
  );
};

export default UsersList;
