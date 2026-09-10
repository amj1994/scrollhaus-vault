import type { ReactNode } from "react";
import { PolygonMarkIcon, RippleBrandIcon, RippleXIcon, WalletConnectIcon } from "../icons";

export interface TransactionTrace {
  direction: "sent" | "received";
  counterpart: string;
}

export interface Transaction {
  id: string;
  icon: ReactNode;
  name: string;
  status: string;
  amount: string;
  trace?: TransactionTrace;
  /** Renders the row de-emphasized, hinting at more history below the fold. */
  muted?: boolean;
}

export const transactions: Transaction[] = [
  {
    id: "polygon-sent",
    icon: <PolygonMarkIcon size={40} />,
    name: "Polygon",
    status: "Sent",
    amount: "$4,141",
    trace: { direction: "sent", counterpart: "X4ma..1da4" },
  },
  {
    id: "ripple-swapped",
    icon: <RippleXIcon size={40} />,
    name: "Ripple",
    status: "Swapped",
    amount: "$5,151",
  },
  {
    id: "walletconnect-received",
    icon: <WalletConnectIcon size={40} />,
    name: "Walletconnect",
    status: "Received",
    amount: "$1,613",
    trace: { direction: "received", counterpart: "Bfa1..41da" },
  },
  {
    id: "ripple-deposited",
    icon: <RippleBrandIcon size={40} />,
    name: "Ripple",
    status: "Deposited",
    amount: "$613",
    muted: true,
  },
];
