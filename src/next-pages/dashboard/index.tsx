import React from 'react';
import Dashboard from '../../components/Screens/Dashboard';
import { getUserFromLocalStorage } from '../../utils/auth';

const index = () => {
	const user = getUserFromLocalStorage();
	const role = !!user && user.role === 'admin';
	return (
		<div>
			<Dashboard role={role} />
		</div>
	);
};

export default index;
