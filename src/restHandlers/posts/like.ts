import { Request, Response } from '../../misskey-express';
import like from '../../endpoints/posts/like';

export default function likePost(req: Request, res: Response): void {
	'use strict';
	like(req.misskeyUser, req.body['post-id']).then(() => {
		res.apiRender({ kyoppie: "yuppie" });
	}, (err: any) => {
		const statusCode = (() => {
			switch (err) {
				case 'post-not-found':
					return 400;
				case 'already-liked':
					return 400;
				default:
					return 500;
			}
		})();
		res.apiError(statusCode, err);
	});
};
