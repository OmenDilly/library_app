import {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { useApi } from '../hooks/useApi'
import MenuItem from '@material-ui/core/MenuItem';
import { DataContext } from '../context/DataContext';

export function UserDialog(props) {

	const userData = useContext(DataContext)

	const [open, setOpen] = useState(false);
	const [data, setData] = useState({
		login: '',
		password: '',
		name: '',
		surname: '',
		patronomyc: '',
		role: '',
		status: ''
  })
  
  const {loading, error, request, clearError} = useApi()

	const handleChange = (e) => {
    console.log(e.target)
    console.log(data)
    setData({...data, [e.target.name]: e.target.value})
	};

  // const handleClose = () => {
  //   props.close(false)
	// };

	const handleSubmit = async () => {
    try {
      clearError()
      const respomse = await request('/api/auth/register', 'POST', {...data}, {
        Authorization: `Bearer ${userData.token}`
      })
      console.log(respomse)
    } catch (e) {
      console.log(e.message)
    }
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <div>{error}</div>
        <DialogContent>
          <TextField
            autoFocus
						variant='outlined'
            margin="dense"
            name="login"
            label="Логин"
            type="login"
						onChange={handleChange}
            fullWidth
          />
					<TextField
            autoFocus
						variant='outlined'
            margin="dense"
            name="password"
            label="Пароль"
            type="password"
						onChange={handleChange}
            fullWidth
          />
					<TextField
            autoFocus
						variant='outlined'
            margin="dense"
            name="name"
            label="Имя"
            type="name"
						onChange={handleChange}
            fullWidth
          />
					<TextField
            autoFocus
						variant='outlined'
            margin="dense"
            name="surname"
            label="Фамилия"
            type="surname"
						onChange={handleChange}
            fullWidth
          />
					<TextField
            autoFocus
						variant='outlined'
            margin="dense"
            name="patronomyc"
            label="Отчество"
            type="patronomyc"
						onChange={handleChange}
            fullWidth
          />
					<FormControl
            fullWidth
            margin='dense'
            variant="outlined"
          >
						<InputLabel id="role">Роль</InputLabel>
						<Select
							labelId="role"
							name="role"
							value={data.role}
							onChange={handleChange}
              label="Роль"
						>
							<MenuItem value='Администратор'>Администратор</MenuItem>
							<MenuItem value='Сотрудник'>сотрудник</MenuItem>
							<MenuItem value='Пользователь'>Пользователь</MenuItem>
						</Select>
					</FormControl>
					<FormControl
            fullWidth
            margin='dense'
            variant="outlined"
          >
						<InputLabel id="status">Статус</InputLabel>
						<Select
							labelId="status"
							name="status"
							value={data.status}
              label="Статус"
							onChange={handleChange}
						>
							<MenuItem value='Студент'>Студент</MenuItem>
							<MenuItem value='Преподаватель'>Преподаватель</MenuItem>
							<MenuItem value='Ученый'>Ученый</MenuItem>
						</Select>
					</FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="secondary" disabled={loading}>
            Отмена
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={loading}>
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
