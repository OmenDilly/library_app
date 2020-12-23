import { useState, useContext } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useApi } from '../hooks/useApi'
import Typography from '@material-ui/core/Typography';
import { DataContext } from '../context/DataContext'
// import '../styles/index.css'

export const AuthPage = () => {
    const auth = useContext(DataContext)
    const {loading, error, clearError, request} = useApi()
    const [form, setForm] = useState({
        login: '',
        password: ''
    })

    const [disabled, setDisabled] = useState(true)

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value})
        if (form.login && form.password) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    const signInHandler = async (e) => {
        try {
            if (e.key === 'Enter' || e.type == 'click') {
                const data = await request('/api/auth/signin', 'POST', {...form})
                auth.signIn(data.token, data.userId)
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <Grid container direction='row'>
            <Grid item xs={false} sm={1} md={2} lg={3} xl={4}/>
            <Grid item container xs={12} sm={10} md={8} lg={6} xl={4} style={{margin: '25vh 0'}} alignItems='center' justify='center'>
                {/* <Grid item xs={12}> */}
                    <Typography variant='h4' align='center'>Авторизация</Typography>
                {/* </Grid>  */}
                {/* <Grid item xs={12}> */}
                    <TextField
                        variant='outlined'
                        label='Логин'
                        id='login' 
                        type="login"
                        fullWidth
                        size='small'
                        margin='dense'
                        // required
                        name='login'
                        style={{margin: '1vh 0'}}
                        // autoComplete='off' 
                        placeholder='Введите логин' 
                        className="validate input__login" 
                        onChange={handleChange} 
                        onKeyPress={signInHandler}
                        value={form.login}
                    />
                {/* </Grid>   */}
                {/* <Grid item xs={12}> */}
                    <TextField 
                        variant='outlined'
                        label='Пароль'
                        id='pw' 
                        type="password" 
                        // required
                        fullWidth
                        size='small'
                        margin='dense'
                        name='password'
                        style={{margin: '1vh 0'}}
                        // autoComplete='off' 
                        placeholder='Введите пароль' 
                        className="validate input__pw"
                        onChange={handleChange} 
                        onKeyPress={signInHandler}
                        value={form.password}
                    />
                {/* </Grid> */}
                {/* <Grid item xs={12}> */}
                    <Button 
                        // disabled='true'
                        variant='contained'
                        name='button'
                        style={{margin: '1vh 0'}}
                        color='primary'
                        disabled={disabled}
                        fullWidth
                        margin='dense'
                        onClick={signInHandler}
                        disabled={loading}
                    >
                        Войти
                    </Button>
                    <div>{error}</div>
                {/* </Grid> */}
            </Grid>
            <Grid item xs={false} sm={1} md={2} lg={3} xl={4}/>
        </Grid>
    )
}
