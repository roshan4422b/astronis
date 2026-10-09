"use client";

import { useState } from "react";

type PrivateLimitedFaqProps = {
  faqs: [string, string][];
  styles: { list: string };
};

export default function PrivateLimitedFaq({ faqs, styles }: PrivateLimitedFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.list}>
      {faqs.map(([question, answer], index) => (
        <details key={question} open={openIndex === index}>
          <summary
            onClick={(event) => {
              event.preventDefault();
              setOpenIndex((current) => (current === index ? null : index));
            }}
          >
            {question}
            <span aria-hidden="true">{openIndex === index ? "−" : "+"}</span>
          </summary>
          {openIndex === index && <p>{answer}</p>}
        </details>
      ))}
    </div>
  );
}
