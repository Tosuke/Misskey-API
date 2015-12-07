import { List } from 'powerful';
const isEmpty = List.isEmpty;
import {User} from '../../models';

export default function screenNameAvailable(screenName: string): Promise<boolean> {
	'use strict';

	if (screenName) {
		return Promise.resolve(User.find({
			screenNameLower: screenName.toLowerCase()
		}).limit(1).exec()).then(isEmpty);
	} else {
		return <Promise<any>>Promise.reject('empty-screen-name');
	}
}