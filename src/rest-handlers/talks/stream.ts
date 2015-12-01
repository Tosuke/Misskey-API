import * as hapi from 'hapi';
import { IApplication, IUser } from '../../interfaces';
import getStream from '../../endpoints/talks/stream';

export default function timeline(
	app: IApplication,
	user: IUser,
	req: hapi.Request,
	res: hapi.IReply
): void {
	'use strict';
	getStream(
		user,
		req.payload['otherparty-id'],
		req.payload['limit'],
		req.payload['since-cursor'],
		req.payload['max-cursor']
	).then(stream => {
		res(stream);
	}, (err: any) => {
		res({error: err}).code(500);
	});
}
