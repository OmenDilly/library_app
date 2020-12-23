import {React, useContext, useEffect, useState} from 'react';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useApi } from '../hooks/useApi'
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from "date-fns/locale/ru";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { DataContext } from '../context/DataContext'
import CircularProgress from '@material-ui/core/CircularProgress';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export function LogDialog(props) {
  const userData = useContext(DataContext)
	const [open, setOpen] = useState(false);
	const [data, setData] = useState({
		date: '',
		endDate: '',
		user: '',
		status: 'не сданы',
		books: '',
  })

  const [users, setUsers] = useState([])
  const [books, setBooks] = useState([])
  
  const {error, request, clearError} = useApi()

  const loading = open && users.length === 0;

	const handleChange = (e) => {
    console.log(e.target)
    console.log(data)
    setData({...data, [e.target.name]: e.target.value})
  };

  useEffect(() => {
    // let active = true;

    // if (!loading) {
    //   return undefined;
    // }

    (async () => {
      const fetchedUsers = await request('api/user', 'GET', null, {
        Authorization: `Bearer ${userData.token}`
      });
      const fetchedBooks = await request('api/book', 'GET', null, {
        Authorization: `Bearer ${userData.token}`
      });
      // await sleep(1e3); // For demo purposes.

      // if (active) {
      setBooks(fetchedBooks)
      return setUsers(fetchedUsers);
      // }
    })();

  }, [loading]);

  console.log(users)
  
  const handleChangeUser = (e, value) => {
    console.log(value)
    if (value) {
      setData(prevData => {
        return {...prevData, user: value._id}
       })
    }

  }

  const handleDateChange = (value) => {
    console.log(value)
    setData(prevData => {
      return {...prevData, endDate: value}
     })
  }

  const handleChangeBooks = (e, value) => {
    console.log(value)
    setData(prevData => {
      return {...prevData, books: value}
     })
  }

  // const handleClose = () => {
  //   props.close(false)
	// };

	const handleSubmit = async () => {
    try {
      clearError()
      setData(prevData => {
        return {...prevData, date: Date.now()}
       })
      const respomse = await request('/api/log', 'POST', {...data}, {
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
          <Autocomplete
            id="combo-box-demo"
            options={users}
            loading={loading}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            open={open}
            size='small'
            fullwidth
            margin='dense'
            onChange={handleChangeUser}
            // getOptionSelected={(option) => console.log(option.title)}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Asynchronous"
                variant="outlined"
                margin='dense'
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
          <Autocomplete
            multiple
            options={books}
            disableCloseOnSelect
            fullWidth
            margin='dense'
            size='small'
            onChange={handleChangeBooks}
            getOptionLabel={(option) => option.name}
            renderOption={(option, { selected }) => (
              <>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  checked={selected}
                />
                {option.name}
              </>
            )}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Книги" margin='dense' placeholder="Favorites" />
            )}
          />
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                <KeyboardDatePicker
                    autoOk
                    fullWidth
                    margin="dense"
                    label='Период действия'
                    variant="inline"
                    inputVariant='outlined'
                    size='medium'
                    format="dd/MM/yyyy"
                    disablePast 
                    invalidDateMessage=''
                    value={data.endDate}
                    onChange={date => handleDateChange(date)}
                />
              </MuiPickersUtilsProvider>
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
