import { put, takeEvery } from 'redux-saga/effects';

import { messagesLoaded } from '../actions';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const conversations = [
    { 
        id: '1', 
        imageUrl: require('../../images/profiles/kim.jpeg'),
        imageAlt: 'キャサリン',
        title: 'キャサリン',
        createdAt: '11/19',
        latestMessageText: 'ちょっと質問があるんだけど',
        messages: [
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
                imageAlt: 'Kim O\'Neil',
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
    },
    {
        id: '3', 
        imageUrl: require('../../images/profiles/john.jpeg'),
        imageAlt: 'シンゾー　アベ',
        title: 'シンゾー　アベ',
        createdAt: '1 week ago',
        latestMessageText: 'ジューシーであります',
        messages: []
    },
    { 
        id: '4',
        imageUrl: require('../../images/profiles/ben.png'),
        imageAlt: 'Mr. takemin',
        title: 'Mr. takemin',
        createdAt: '2:49 PM',
        latestMessageText: 'Do you kotoyanen...',
        messages: []
    },
    { 
        id: '5',
        imageUrl: require('../../images/profiles/douglas.png'),
        imageAlt: '経理のキム',
        title: '経理のキム',
        createdAt: '6:14 PM',
        latestMessageText: '아뇨하세요',
        messages: []
    },
    { 
        id: '6',
        imageUrl: require('../../images/profiles/jacob.png'),
        imageAlt: '漆黒の翼',
        title: '漆黒の翼',
        createdAt: '3 secs ago',
        latestMessageText: 'ポケモンGoしよ',
        messages: []
    },
    // { 
    //     id: '7',
    //     imageUrl: require('../../images/profiles/stacey.jpeg'),
    //     imageAlt: 'Stacey Wilson',
    //     title: 'Stacey Wilson',
    //     createdAt: '30 mins ago',
    //     latestMessageText: 'Awesome!!! Congratulations!!!!',
    //     messages: []
    // },
    // { 
    //     id: '8',
    //     imageUrl: require('../../images/profiles/stan.jpeg'),
    //     imageAlt: 'Stan George',
    //     title: 'Stan George',
    //     createdAt: '1 week ago',
    //     latestMessageText: 'Good job',
    //     messages: []
    // },
    // { 
    //     id: '9',
    //     imageUrl: require('../../images/profiles/sarah.jpeg'),
    //     imageAlt: 'Sarah Momes',
    //     title: 'Sarah Momes',
    //     createdAt: '1 year ago',
    //     latestMessageText: 'Thank you. I appreciate that.',
    //     messages: []
    // }
];

export const conversationsSaga = function*() {
    yield delay(1000);
    yield put(messagesLoaded(conversations[0].id, conversations[0].messages, false, null));

    yield put({
        type: 'CONVERSATIONS_LOADED',
        payload: {
            conversations,
            selectedConversation: conversations[0]
        }
    });
}

export function* watchGetConversationsAsync() {
    yield takeEvery('CONVERSATIONS_REQUESTED', conversationsSaga);
}