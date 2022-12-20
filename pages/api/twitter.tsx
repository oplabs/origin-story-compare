import type { NextApiRequest, NextApiResponse } from "next";
import TwitterApi, { EUploadMimeType } from "twitter-api-v2";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body) {
    return res.status(400).json({ error: "No body" });
  }

  if (!process.env.TWITTER_KEY || !process.env.TWITTER_SECRET) {
    return res.status(400).json({ error: "No twitter keys" });
  }

  const client = new TwitterApi({
    appKey: process.env.TWITTER_KEY || "",
    appSecret: process.env.TWITTER_SECRET || "",
    accessToken: process.env.TWITTER_ACCESS_TOKEN || "",
    accessSecret: process.env.TWITTER_ACCESS_SECRET || "",
  });

  const { image, tweetText } = JSON.parse(req.body);

  if (!image) {
    return res.status(400).json({ error: "No image" });
  }

  try {
    const mediaId = await client.v1.uploadMedia(
      Buffer.from(image.replace("data:image/png;base64,", ""), "base64"),
      { mimeType: EUploadMimeType.Png }
    );
    if (!mediaId) {
      return res.status(400).json({ error: "No media id" });
    }

    const tweet = await client.v1.tweet(tweetText || "", {
      media_ids: [mediaId],
    });
    if (!tweet) {
      return res.status(400).json({ error: "No tweet" });
    }
    return res.status(200).json({ success: true, tweet });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

export default handler;
