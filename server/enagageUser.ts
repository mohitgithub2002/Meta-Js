'use server';
import { connectDB } from '@/utils/db';
import { engageUserModel } from '@/models/engagement';

interface EngagementData {
    userId: string;
    username: string;
    postId?: string;
    engagementType: string;
}

export const createEngagement = async (data: EngagementData) => {
    try {
        // Connect to database
        await connectDB();

        // Create new engagement document
        const newEngagement = new engageUserModel({
            userId: data.userId,
            username: data.username,
            postId: data.postId,
            engagementType: data.engagementType,
            // timestamp will be added automatically by default
        });

        // Save to database
        await newEngagement.save();

        return {
            success: true,
            message: 'Engagement recorded successfully',
            data: newEngagement
        };

    } catch (error) {
        console.error('Error creating engagement:', error);
        return {
            success: false,
            message: 'Failed to record engagement',
            error: 'Internal Server Error'
        };
    }
}