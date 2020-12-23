import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
	};

	const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
						variant='outlined'
            margin="dense"
            id="login"
            label="Логин"
            type="login"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
