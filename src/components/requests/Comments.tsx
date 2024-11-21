import React, { useState } from 'react';
import styles from './Comments.module.scss';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import { useNotifications } from '../alerts/NotificationContext';
import {
  Button,
  FormControl,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { useAddComment } from '../../features/comments/useAddComment';
import Spinner from '../ui/spinner/Spinner';
import { Comment } from '../../features/requests/requestTypes';

/**
 * @property {Comment[]} comments - The `comments` property represents the list of comments.
 * @property {string} newCommentEndpoint - The `newCommentEndpoint` property represents the endpoint for adding a new comment.
 * @property {boolean} isDisabled - The `isDisabled` property represents whether the comments are disabled.
 * @property {function} refreshPage - The `refreshPage` property represents the function to refresh the page.
 * @property {number} requestID - The `requestID` property represents the id of the request.
 */
export type CommentsProps = {
  comments: Comment[];
  isDisabled: boolean;
  requestId: number;
};

/**
 *
 * @param {CommentsProps} params
 * @returns {JSX.Element} The `Comments` component returns a list of comments.
 */
const Comments = ({ comments, isDisabled, requestId }: CommentsProps) => {
  const [text, setText] = useState('');
  const [isError, setIsError] = useState(false);

  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const { addNotification } = useNotifications();
  const addComment = useAddComment(requestId);

  const onAddComment = async (event: React.FormEvent) => {
    event.preventDefault();
    setText('');
    addComment.mutate(
      { hoa: hoaId, text, request: requestId },
      {
        onSuccess: () => {
          setIsError(false);
          addNotification('Dodano komentarz.', 'success');
        },
        onError: () => {
          setIsError(true);
        },
      },
    );
  };

  if (addComment.isPending) {
    return <Spinner />;
  }

  return (
    <div className={styles.comments}>
      {!isDisabled && (
        <div className={styles.new_comment}>
          <form onSubmit={onAddComment} className={styles.comment_form}>
            <FormControl>
              <TextField
                label="Nowy Komentarz"
                multiline
                size="small"
                rows={4}
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
              <div className={styles.comment_controls}>
                <Button variant="contained" type="submit">
                  Prześlij
                </Button>
              </div>
              {isError && (
                <p className={styles.error}>Nie udało się dodać komentarza.</p>
              )}
            </FormControl>
          </form>
        </div>
      )}
      <div className={styles.comments_list}>
        <List>
          {comments.map((comment) => (
            <React.Fragment key={comment.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={comment.author_name}
                  secondary={
                    <>
                      <Typography
                        variant="caption"
                        gutterBottom
                        sx={{ display: 'block' }}
                      >
                        {new Date(comment.created).toLocaleString()}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                        style={{ whiteSpace: 'pre-line' }}
                      >
                        {comment.text}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Comments;
