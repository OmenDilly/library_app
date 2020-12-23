import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BookIcon from '@material-ui/icons/Book';
import { LogDialog } from './LogDialog';
import { UserDialog } from './UserDialog';
import { BookDialog } from './BookDialog';

const useStyles = makeStyles((theme) => ({
  root: {
		height: '100px',
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(4),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

const actions = [
  { icon: <BookIcon />, title: 'Книга', name: 'book'},
  { icon: <AssignmentIndIcon />, title: 'Пользователь', name: 'user'},
  { icon: <AssignmentIcon />, title: 'Запись', name: 'log'},
];

export function ActionButton() {
  const classes = useStyles();
  const [direction, setDirection] = useState('left');
	const [open, setOpen] = useState(false);
	const [book, setBook] = useState(false);
	const [user, setUser] = useState(false);
	const [log, setLog] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
	};
	
	const handleClick = (name) => {

		console.log(name)

    switch (name) {
			case 'book':
				return setBook(true)
			case 'user':
				return setUser(true)
			case 'log':
				return setLog(true)
		}
  };

  return (
    <div className={classes.root}>
			<LogDialog open={log} close={() => setLog(false)} title='Новая Запись'/>
			<BookDialog open={book} close={() => setBook(false)} title='Новая книга'/>
			<UserDialog open={user} close={() => setUser(false)} title='Новый пользователь'/>
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={direction}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.title}
							tooltipPlacement='top'
              onClick={() => handleClick(action.name)}
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  );
}


