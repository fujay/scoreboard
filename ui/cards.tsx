import { fetchCardData } from "@/lib/data";
import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import XIcon from "./x-icon";
import { lusitana } from "./fonts";

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
  tweet: XIcon,
};

export default async function CardWrapper() {
  const { numberOfTweets } = await fetchCardData();
  // const numberOfTweets = 7;

  return (
    <>
      <Card title="Tweets" value={numberOfTweets} type="collected" />
      <Card title="Tweets" value={numberOfTweets} type="tweet" />
      <Card title="Tweets" value={numberOfTweets} type="invoices" />
      <Card title="Tweets" value={numberOfTweets} type="customers" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "invoices" | "customers" | "pending" | "collected" | "tweet";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
