import * as hapi from 'hapi';
import { IApplication, IUser } from '../../interfaces';
import getTimeline from '../../endpoints/posts/user-timeline';

export default function userTimeline(
	app: IApplication,
	user: IUser,
	req: hapi.Request,
	res: hapi.IReply
): void {
	'use strict';
	getTimeline(
		user,
		req.payload['user-id'],
		req.payload['include-replies'] === 'true',
		req.payload['types'],
		req.payload['limit'],
		req.payload['since-cursor'],
		req.payload['max-cursor'])
	.then(timeline => {
		res(timeline);
	}, (err: any) => {
		res({error: err}).code(500);
	});
}
