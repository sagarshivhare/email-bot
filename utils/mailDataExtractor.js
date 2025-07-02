export default function extractor({ body, from, subject }) {
  return {
    from: from.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)?.[0],
    subject,
    mobile: body.match(/(\+?\d{1,4}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}/g),
    emails: body.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/gi),
    name: extractName(body)
  };
}

const extractName = (text) => {
  const patterns = [
    /My name is ([A-Z][a-z]+ [A-Z][a-z]+)/i,
    /I'm ([A-Z][a-z]+ [A-Z][a-z]+)/i,
    /Name: ([^\n]+)/i,
    /Sender: ([^\n]+)/i
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }
  return null;
};
