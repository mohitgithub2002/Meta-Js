'use server';
import { connectDB } from "@/utils/db";
import { resourcesDataModel } from "@/models/resourcesModel";


export const fetchResource = async (postId: string) => {
    try {
        await connectDB();
        const post = await resourcesDataModel.findOne({ postId: postId });
        return post;

    }
    catch (error) {
        console.error('Error fetching data:', error);
        return { error: 'Internal Server Error' };
    }
}
