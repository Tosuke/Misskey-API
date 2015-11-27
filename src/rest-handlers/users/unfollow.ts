import { Request, Response } from '../../misskey-express';
import unfollow from '../../endpoints/users/unfollow';

export default function unfollowUser(req: Request, res: Response): void {
	'use strict';
	if (req.body['user-id'] === undefined || req.body['user-id'] === null) {
		res.apiError(400, "user-id-is-empty");
	} else {
		unfollow(req.misskeyUser, req.body['user-id']).then(() => {
			res.apiRender({kyoppie: 'yuppie'});
		}, (err: any) => {
			res.apiError(500, err);
		});
	}
};