import React, { useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'
import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { NavLink, useHistory } from 'react-router-dom'
import { DataContext } from '../context/DataContext'

export function Nav() {

  const history = useHistory()

  const auth = useContext(DataContext)

  const signOutHandler = async (e) => {
    e.preventDefault()
    auth.signOut()
    history.push('/')
  }

  return (
    <div>
      <AppBar 
        position="static" 
        color='transparent' 
        style={{boxShadow: 'none'}}
      >
        <Toolbar>
          <Tooltip title='Записи'>
            <IconButton 
              component={NavLink} 
              to='/' 
              edge="start" 
              color="inherit" 
              aria-label="menu"
            >
              <LibraryBooksIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Настройки'>
            <IconButton 
              component={NavLink} 
              to='/settings' 
              edge="start" 
              color="inherit" 
              aria-label="menu"
            >
              <SettingsApplicationsIcon />
            </IconButton>
          </Tooltip>
          <Typography 
            variant="h6" 
            style={{flexGrow: 1, textAlign: 'center'}}
          >
            Сайт находится в разработке
          </Typography>
          <Tooltip title='Выйти'>
            <IconButton 
              component={NavLink} 
              to='/settings' 
              edge="start" 
              color="inherit" 
              aria-label="menu"
              onClick={signOutHandler}
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}
