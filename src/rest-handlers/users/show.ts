import * as hapi from 'hapi';
import { IApplication, IUser } from '../../interfaces';
import show from '../../endpoints/users/show';

export default function showUser(
	app: IApplication,
	user: IUser,
	req: hapi.Request,
	res: hapi.IReply
): void {
	'use strict';
	show(
		user,
		req.payload['user-id'],
		req.payload['screen-name']
	).then(showee => {
		res(showee);
	}, (err: any) => {
		res({error: err}).code(500);
	});
}
