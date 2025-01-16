import { resourcesDataModel } from '@/models/resourcesModel';
import { connectDB } from '@/utils/db';
import { NextResponse } from 'next/server';
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postid');
    try {
        await connectDB();
        const post = await resourcesDataModel.findOne({ postId: postId });
        return NextResponse.json({ data: post }, { status: 200 });

    }
    catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const {postUrl, postId, resource, comment} = await request.json();
    try {
        await connectDB();
        const post = await resourcesDataModel.create({ postUrl, postId, resource, comment });
        return NextResponse.json({ data: post }, { status: 201 });
    }
    catch (error) {
        console.error('Error saving data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  
}
