import ky from "ky";

export default async function GetWalletLogs() {
  try {
    const logs = await ky.get(`https://api.basescan.org/api
?module=logs
&action=getLogs
&address=0x5f45cd59ba7f2f6bcd935663f68ee1debe3b8a10
&fromBlock=1844947
&toBlock=1845947
&page=1
&offset=1000
&apikey=YourApiKeyToken`);
  } catch (e) {
    console.error(e);
  }
}
