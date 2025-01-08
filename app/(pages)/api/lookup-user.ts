// pages/api/lookup-user.ts
import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

// Neynar API 클라이언트 설정
const config = new Configuration({
  apiKey: process.env.NEYNAR_API_KEY || "", // 환경 변수에서 API 키 가져오기
});
const client = new NeynarAPIClient(config);

// API 핸들러
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    // 쿼리에서 지갑 주소 가져오기
    const { walletAddress } = req.query;

    if (!walletAddress || typeof walletAddress !== "string") {
      res
        .status(400)
        .json({ error: "Missing or invalid walletAddress parameter" });
      return;
    }

    // Neynar API로 사용자 데이터 조회
    const user = await client.lookupUserByCustodyAddress({
      custodyAddress: walletAddress,
    });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
}
