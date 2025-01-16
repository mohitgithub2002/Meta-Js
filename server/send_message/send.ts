import { connectDB } from '@/utils/db';
import { fetchResource } from '../fetchdata/fetchResource';
import { createEngagement } from '../enagageUser';

connectDB();

const handleComment =  async (commentData: any):Promise<object>  => {
    const reelId = commentData.value.media.id;
    const recipientId = commentData.value.from.id;
    const message = commentData.value.text;
    const userData = {
        userId: recipientId,
        username: commentData.value.from.username,
        postId: reelId,
        engagementType: 'comment'
    }
    const user = await createEngagement(userData);
    console.log('User data:', user);
    const resource = await fetchResource(reelId);
    if(message===resource.comment){
        let reply = `Checkout this website for more information: ${resource.resource}`;
        return {
            "recipient": {
                "id": recipientId
            },
            "message": {
                "text": reply
            }
        };
    }
    console.log('Comment data:', message,resource.comment);
    return {};
};

const handleReelShared =  async(messageData: any): Promise<object> => {
    const reelId = messageData.message.attachments[0].payload.reel_video_id;
    const recipientId = messageData.sender.id;
    const userData = {
        userId: recipientId,
        username: "",
        postId: reelId,
        engagementType: 'Dm Reel'
    }
    const user = await createEngagement(userData);
    const resource = await fetchResource(reelId);
    const reply = `checkout this website for more information: ${resource.resource}`;
    return {
        "recipient": {
            "id": recipientId
        },
        "message": {
            "text": reply
        }
    };
};

const handelMessage = async(messageData: any): Promise<object> => {
    const recipientId = messageData.sender.id;
    const message = messageData.message.text;
    const userData = {
        userId: recipientId,
        username: "",
        postId: "",
        engagementType: 'Dm Message'
    }
    const user = await createEngagement(userData);
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



const checkWebhookType = async(data: any) => {
    let payload = null
    if (data.entry[0].changes?.[0]) {
        payload = await handleComment(data.entry[0].changes[0]);
    } else {
        if (data.entry[0].messaging[0].message?.attachments?.[0]?.type === 'ig_reel') {
            payload = await handleReelShared(data.entry[0].messaging[0]);
        } else {
            if (data.entry[0].messaging[0].message?.text && data.entry[0].messaging[0].recipient?.id === process.env.INSTAGRAM_ACCOUNT_ID) {
                payload = await handelMessage(data.entry[0].messaging[0]);
            }
        }
    }
    return payload;
}

const sendMessage = async (data: any) => {
    try {
        const baseUrl = "https://graph.instagram.com/v21.0";
        const IGId = process.env.INSTAGRAM_ACCOUNT_ID;
        const token = process.env.INSTAGRAM_ACCESS_TOKEN;
        const payload = await checkWebhookType(data);
        const url = `${baseUrl}/${IGId}/messages`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload),
        });
        const res = await response.json();
        console.log('Message sent successfully:', res);
        return res;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export default sendMessage;