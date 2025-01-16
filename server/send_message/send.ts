
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

// export const replyToComments = async (commentId: string, message: string): Promise<Response> => {
//     const response = await fetch(`${baseUrl}/send_message/send`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             commentId,
//             message,
//         }),
//     });
//     return response;
// };

const sendMessage = async (data: any) => {
    try {
        const baseUrl = "https://graph.instagram.com/v21.0";
        const IGId = process.env.INSTAGRAM_ACCOUNT_ID;
        const info = data.entry[0].messaging[0];
        const token = process.env.INSTAGRAM_ACCESS_TOKEN;
        const recipientId = info.sender.id;
        const message = "this is A test message";
        const payload = {
            "recipient": {
                "id": recipientId
            },
            "message": {
                "text": message
            }
        };

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