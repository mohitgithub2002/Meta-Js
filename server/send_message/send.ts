
// export const replyToMessage = async (messageId: string, message: string): Promise<Response> => {
//     const response = await fetch(`${baseUrl}/${IGId}/messages`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             messageId,
//             message,
//         }),
//     });
//     return response;
// };

// export const replyToReel = async (reelId: string, message: string): Promise<Response> => {
//     const response = await fetch(`${baseUrl}/send_message/send`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             reelId,
//             message,
//         }),
//     });
//     return response;
// };

const handleComment =  (commentData: any):object  => {
    const reelId = commentData.value.media.id;
    const recipientId = commentData.value.from.id;
    const message = commentData.value.text;
    let reply = `You commented: ${message} on this reel: ${reelId}`;
    return {
        "recipient": {
            "id": recipientId
        },
        "message": {
            "text": reply
        }
    };
};

const handleReelShared =  (messageData: any): object => {
    const reelId = messageData.message.attachments[0].payload.reel_video_id;
    const recipientId = messageData.sender.id;
    const reply = `You shared this reel: ${reelId}`;
    return {
        "recipient": {
            "id": recipientId
        },
        "message": {
            "text": reply
        }
    };
};

const handelMessage = (messageData: any): object => {
    const recipientId = messageData.sender.id;
    const message = messageData.message.text;
    const reply = `You sent: ${message}`;
    return {
        "recipient": {
            "id": recipientId
        },
        "message": {
            "text": reply
        }
    };
};



const checkWebhookType = (data: any) => {
    let payload = null
    if (data.entry[0].changes?.[0]) {
        payload = handleComment(data.entry[0].changes[0]);
    } else {
        if (data.entry[0].messaging[0].message?.attachments?.[0]?.type === 'ig_reel') {
            payload = handleReelShared(data.entry[0].messaging[0]);
        } else {
            if (data.entry[0].messaging[0].message?.text && data.entry[0].messaging[0].recipient?.id === process.env.INSTAGRAM_ACCOUNT_ID) {
                payload = handelMessage(data.entry[0].messaging[0]);
            }
        }
    }
    return payload;
}

const sendMessage = async (data: any) => {
    try {
        // const info = data.entry[0].messaging[0];
        const baseUrl = "https://graph.instagram.com/v21.0";
        const IGId = process.env.INSTAGRAM_ACCOUNT_ID;
        const token = process.env.INSTAGRAM_ACCESS_TOKEN;
        // const recipientId = info.sender.id;
        const message = "this is A test message";
        // const payload = {
        //     "recipient": {
        //         "id": recipientId
        //     },
        //     "message": {
        //         "text": message
        //     }
        // };
        const payload = checkWebhookType(data);

        const url = `${baseUrl}/${IGId}/messages`;
        console.log('url is ', url);
        console.log('payload is ', payload);
        console.log('token is ', `Bearer ${token}`);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload),
        });
        console.log('Message sent successfully:', response);
        return response;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export default sendMessage;