import { CardHeader, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';

import styles from './TodoCard.module.scss'
import { useCallback } from 'react';

export interface TodoCardProps {
  content: string,
  deleteCardCallback: (content: string) => void
}

export default function TodoCard({content, deleteCardCallback}: TodoCardProps) {
  const handleDeleteClick = useCallback(() => {
    deleteCardCallback(content);
  }, [content])
  
  return (
    <Card variant='outlined' className={styles.cardLayout}>
      
      <CardHeader title={content} action={
        <IconButton id={styles.closeButton} onClick={handleDeleteClick}>
        <CloseIcon/>
      </IconButton>
      }>
      </CardHeader>
    </Card>
  )
}