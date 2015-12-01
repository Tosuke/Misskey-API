import * as hapi from 'hapi';
import {User} from '../models';
import {IApplication, IUser} from '../interfaces';
import doLogin from '../endpoints/login';

export default function login(
	app: IApplication,
	user: IUser,
	req: hapi.Request,
	res: hapi.IReply
): void {
	'use strict';
	const screenName: string = req.payload['screen-name'];
	const password: string = req.payload['password'];
	doLogin(screenName, password).then(same => {
		if (same) {
			User.findOne({
				screenNameLower: screenName.toLowerCase()
			}, (findErr: any, loginUser: IUser) => {
				if (findErr) {
					res('something happened').code(500);
				} else if (user === null) {
					res('something happened').code(500);
				} else {
					res({
						same: true,
						user: loginUser.toObject()
					});
				}
			});
		} else {
			res({same: false});
		}
	}, (err: any) => {
		res({error: err}).code(400);
	});
}
