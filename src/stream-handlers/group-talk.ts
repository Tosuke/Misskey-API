import * as Websocket from 'ws';
import { IUser } from '../db/interfaces';
import event, { MisskeyEventMessage } from '../event';
import talkmessages_show from '../endpoints/talks/messages/show';

import * as url_process from 'url';
import * as query_process from 'querystring';

export default async function(user: IUser, ws: Websocket, query: { [key: string]: string|string[] }): Promise<void> {
	if (query['group-id'] === undefined || query['group-id'] === null) {
		reject("'group-id' is required");
		return;
	}

	const groupID = query['group-id'] as string;

	const client = event.subscribeGroupTalkStream(groupID, subscriber);
	ws.on('close', (code, mes) => {
		client.quit();
	});
	return;

	async function subscriber(message: MisskeyEventMessage): Promise<void> {
		const obj = await (() => {
			switch (message.type) {
				case 'message':
					return talkmessages_show(user, message.value.id);

				default:
					return Promise.resolve({
						id: message.value
					});
			}
		})();
		sendEvent({
			type: message.type,
			value: obj
		});
	}

	function sendEvent(mes: MisskeyEventMessage): void {
		ws.send(JSON.stringify(mes));
	}

	function reject(mes: string): void {
		sendEvent({
			type: 'error',
			value: {
				message: mes
			}
		});
		ws.close();
	}
}
