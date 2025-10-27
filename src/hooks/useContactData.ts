import { useEffect, useState } from "react";

export type ContactData = {
  office: {
    title: string;
    description: string;
    address: string;
    mapUrl: string;
  };
  phones: { label: string; number: string; tel: string }[];
  emails: { label: string; address: string; mailto: string }[];
  logo?: string | null;
};

export const useContactData = () => {
  const [data, setData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { data, loading };
};