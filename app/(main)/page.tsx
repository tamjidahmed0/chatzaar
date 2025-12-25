import Chats from "@/components/pages/Chats";
import { Suspense } from "react";


export default function Home() {
  return (

    <Suspense fallback={<div>Loading...</div>}>
      <Chats />
    </Suspense>

  );
}
