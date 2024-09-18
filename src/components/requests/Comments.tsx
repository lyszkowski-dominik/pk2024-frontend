import React, { useState } from 'react';
import type { Comment } from '../../types/reqeustTypes';
import styles from './Comments.module.scss';
import { AddComment } from '../../utils/AddComment';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../app/slices/sharedDataSlice';
import { useNotifications } from '../notifications/NotificationContext';
import { Button, Divider, FormControl, InputLabel, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';

type CommentsProps = {
  comments: Comment[];
  newCommentEndpoint: string;
  isDisabled: boolean;
  refreshPage: () => void;
  requestID: number;
};

const Comments = ({
  comments,
  newCommentEndpoint,
  isDisabled,
  refreshPage,
  requestID,
}: CommentsProps) => {
  const [text, setText] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);
  const [isError, setIsError] = useState(false);

  const hoaID = useAppSelector(selectSelectedCommunity);
  const { addNotification } = useNotifications();

  const onAddComment = async (event: React.FormEvent) => {
    event.preventDefault();
    setText('');
    setIsWaiting(true);

    const res = await AddComment({
      hoa: hoaID || -1,
      text: text,
      request: Number(requestID),
    });

    setIsWaiting(false);

    if (res.status === 400) {
      setIsError(true);
    } else {
      setIsError(false);
      addNotification('Dodano komentarz.', 'success');
      refreshPage();
    }
  };

  return (
    <div className={styles.comments}>
      {!isDisabled && <div className={styles.new_comment}>
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
          </FormControl>
        </form>
      </div>}
      <div className={styles.comments_list}>
        <List>
        {comments.map((comment) => (
           <React.Fragment key={comment.id}>
            <ListItem alignItems="flex-start">
            <ListItemText
              primary={comment.author_name}
              secondary={
                <>
                 <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>
                  {new Date(comment.created).toLocaleString()}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    // className={classes.inline}
                    color="textPrimary"
                    style={{ whiteSpace:"pre-line"}}
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
