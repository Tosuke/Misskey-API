import {AlbumFile} from '../../../db/db';
import {IUser, IAlbumFile} from '../../../db/interfaces';

/**
 * アルバムのファイル一覧を取得します
 * @param user API利用ユーザー
 * @param folderId 対象フォルダID(nullでルート)
 * @return ファイルオブジェクトの配列
 */
export default function(user: IUser, folderId: string = null): Promise<Object[]> {
	return new Promise<Object[]>((resolve, reject) => {
		AlbumFile.find({
			user: user.id,
			folder: folderId,
			isHidden: false,
			isDeleted: false
		}, (filesFindErr: any, files: IAlbumFile[]) => {
			if (filesFindErr !== null) {
				return reject(filesFindErr);
			}
			resolve(files.map<Object>(file => file.toObject()));
		});
	});
}
