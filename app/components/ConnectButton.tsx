import "@reown/appkit-wallet-button/react";
import { useAppKitAccount } from "@reown/appkit/react";

export default function ConnectButton() {
  const { address, caipAddress, isConnected } = useAppKitAccount();
  console.log("address : ", address);
  console.log("caipAddress : ", caipAddress);
  console.log("isConnected : ", isConnected);

  return <appkit-button />;
  //   return <appkit-wallet-button/>
}
