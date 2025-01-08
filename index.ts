// import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";

// // 환경설정 및 API 키 설정
// const config = new Configuration({
//   apiKey: process.env.NEYNAR_API_KEY as string,
//   basePath: "https://api.neynar.com",
// });

// const neynarClient = new NeynarAPIClient(config);

// export default neynarClient;

import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";

const config = new Configuration({
  apiKey: process.env.NEYNAR_API_KEY as string,
});
