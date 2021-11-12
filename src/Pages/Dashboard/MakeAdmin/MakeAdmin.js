import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
	const [email, setEmail] = useState('');
	const [success, setSuccess] = useState(false);
	const { token } = useAuth();

	const handleOnBlur = e => {
		setEmail(e.target.value);
	}

	const handleAdminSubmit = e => {
		const user = { email };
		fetch('https://fierce-woodland-16592.herokuapp.com/users/admin', {
			method: 'PUT',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(user)
		})
			.then(res => res.json())
			.then(data => {
				if (data.modifiedCount) {
					console.log(data);
					// setEmail('');
					setSuccess(true);
				}
			})
		e.preventDefault()
	}
	return (
		<div>
			<h2>Make me admin</h2>
			<form onSubmit={handleAdminSubmit} >
				<TextField
					sx={{ width: '50%' }}
					label="Email"
					type="email"
					onBlur={handleOnBlur}
					variant="standard"
				/>
				<Button type="submit" variant="contained" >Make Admin</Button>
				{success && <Alert severity="success">Made Admin Successfully!</Alert>}
			</form>
		</div>
	);
};

export default MakeAdmin;