import { SanityClient } from '@sanity/client';
import type { NextApiRequest, NextApiResponse } from 'next'
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const apiKey = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;

const config: any = {
    projectId,
    dataset,
    apiVersion,
    apiKey
}

export default async function createComment(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { _id, comment } = JSON.parse(req.body);
    console.log("comment", comment);
    try {
        await new SanityClient(config).create({
            _type: 'comment',
            post: {
                _type: 'reference',
                _ref: _id,
            },
            comment
        });
    } catch (error) {
        return res.status(500).send({
            message: "Couldn't submit comment!"
        })
    }
    return res.status(200).send({
        message: "Submitted successfully!"
    })
}