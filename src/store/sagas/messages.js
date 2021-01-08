import { put, takeLatest } from 'redux-saga/effects';

import { messagesLoaded } from '../actions';

const messageDetails = {
    '2': [
        {
            id: '5',
            imageUrl: null,
            imageAlt: null,
            messageText: `
                ちょっと質問があるんだけど
            `,
            createdAt: '11/19',
            isMyMessage: true
        },
        {
            id: '6',
            imageUrl: require('../../images/profiles/kim.jpeg'),
            imageAlt: '田中課長',
            messageText: `
                暇だよ
            `,
            createdAt: '11/19',
            isMyMessage: false
        },
        {
            id: '7',
            imageUrl: null,
            imageAlt: null,
            messageText: '今暇？',
            createdAt: '11/19',
            isMyMessage: true
        },
        {
            id: '8',
            imageUrl: require('../../images/profiles/kim.jpeg'),
            imageAlt: 'Kim O\'Neil',
            messageText: 'こんにちは!!!! どうした？',
            createdAt: '11/19',
            isMyMessage: false
        },
        {
            id: '9',
            imageUrl: null,
            imageAlt: null,
            messageText: 'こんにちは',
            createdAt: '11/19',
            isMyMessage: true
        }
    ],
    '3': [
        {
            id: '1',
            imageUrl: require('../../images/profiles/john.jpeg'),
            imageAlt: 'シンゾー',
            messageText: `
                ジューシーであります
            `,
            createdAt: '1 week ago',
            isMyMessage: false
        },
    ],
    '6': [
        {
            id: '1',
            imageUrl: null,
            imageAlt: null,
            messageText: `
                ポケモンGoしよ
            `,
            createdAt: '11/10',
            isMyMessage: true
        },
    ],
};

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const messagesSaga = function*(action) {
    const { conversationId, numberOfMessages, lastMessageId } = action.payload;
    const messages = messageDetails[conversationId];
    const startIndex = lastMessageId ? messages.findIndex(message => message.id === lastMessageId) + 1: 0;
    const endIndex = startIndex + numberOfMessages;
    const pageGroup = messages.slice(startIndex, endIndex);
    const newLastMessageId = pageGroup.length > 0 ? pageGroup[pageGroup.length - 1].id: null;
    const hasMoreMessages = newLastMessageId && endIndex < (messages.length - 1);

    yield delay(1000);

    yield put(messagesLoaded(
        conversationId,
        pageGroup,
        hasMoreMessages,
        newLastMessageId
    ));

    if (hasMoreMessages) {
        yield delay(1000);
        yield put({
            type: 'MESSAGES_REQUESTED',
            payload: {
                conversationId,
                numberOfMessages,
                lastMessageId: newLastMessageId
            }
        })
    }
}

export const watchGetMessagesAsync = function*() {
    yield takeLatest('MESSAGES_REQUESTED', messagesSaga);
}