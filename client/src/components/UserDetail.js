import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

export const UserDetail = ({data}) => {

	const [surname, name, patronomyc] = data.fullName.split(' ')

	console.log(surname)
	
	return (
		<div style={{alignItems: 'center', flexDirection: 'column'}}>
			{/* <Grid container spacing={2}> */}
				{/* <Grid item xs={12} md={6}> */}

						<List dense={true} style={{width: '50%'}}>
							<ListItem>
								<ListItemText
									primary={`Имя: ${name}`}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary={`Фамилия: ${surname}`}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary={`Отчество: ${patronomyc}`}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary={`Роль: ${data.role}`}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary={`Статус: ${data.status}`}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary={`Логин: ${data.login}`}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary={`id: ${data._id}`}
								/>
							</ListItem>
            </List>
						<Divider orientation="vertical" flexItem/>


					{/* <Typography>
						{`Имя: ${name}`}
					</Typography>
					<Typography>
						{`Фамилия: ${surname}`}
					</Typography>
					<Typography>
						{`Отчество: ${patronomyc}`}
					</Typography> */}

				{/* </Grid> */}
			{/* </Grid> */}
		</div>

	)
}
