"use client";

import { useEffect, useState } from "react";

export default function OrderLiveStatus({ id, initial }) {
    const [status, setStatus] = useState(initial);
    const [connection, setConnection] = useState("Connecting...");

  useEffect(() => {
  const es = new EventSource(`/api/orders/${id}/stream`);

  es.onopen = () => {
    setConnection("Live");
  };

  es.onmessage = (event) => {
    let data;
        try {
          data = JSON.parse(event.data);
        } catch {
          return;
        }

    if (data.error) {
      es.close();
      setConnection("Unavailable");
      return;
    }

    setStatus(data.status);

    if (["DELIVERED", "CANCELLED"].includes(data.status)) {
      es.close();
      setConnection("Completed");
    }
  };

  es.onerror = () => {
    setConnection("Reconnecting...");
  };

  return () => es.close();
}, [id]);
  return (
    <section className="rounded-xl border border-[#6f6252]/40 bg-[#211b15] p-5">
      <p className="text-sm text-[#b8afa3]">
        Connection: {connection}
      </p>

      <h2 className="mt-2 text-2xl font-semibold text-[#c9a96e]">
        {status}
      </h2>
    </section>
  );
}