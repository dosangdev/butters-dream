import ky from "ky";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: "Slug is required" });
  }

  const apiKey = process.env.NEYNAR_API_KEY;

  const response = await ky.get(
    `https://api.neynar.com/v2/farcaster/user/bulk-by-address?addresses=${slug}`,
    {
      headers: {
        accept: "application/json",
        api_key: apiKey,
      },
    }
  );

  const data = await response.json();
  const userData = Object.values(data || {})[0] as any;

  console.log(userData, "userData");

  res.status(200).json(userData);
}
