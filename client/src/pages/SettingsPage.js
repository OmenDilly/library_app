import {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { BooksPage } from './BooksPage'
import { UsersPage } from './UsersPage'
import { CustomTable } from '../components/CustomTable'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function SettingsPage() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
	};
	
	const [data, setData] = useState({
		columns: [
			{title: 'Название', field: 'name'}
		],
		data: [
			{name: 'something'}
		]
	})

  return (
    <div>
      <AppBar position="static" color='transparent' style={{boxShadow: 'none'}}>
        <Tabs 
					value={value} 
					onChange={handleChange} 
					aria-label="simple tabs example"
					centered
				>
          <Tab label="Пользователи" {...a11yProps(0)} />
          <Tab label="Книги" {...a11yProps(1)} />
          {/* <Tab label="Сотурдники" {...a11yProps(2)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <UsersPage/>
      </TabPanel>
      <TabPanel value={value} index={1}>
				<BooksPage/>
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        {customTable(data)}
      </TabPanel> */}
    </div>
  );
}