export default function extractor({ body, from, subject }) {
  return {
    from: from.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)?.[0],
    subject,
    mobile: body.match(/(\+?\d{1,4}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}/g),
    emails: body.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/gi),
    name: body.match(/(?:best|regards|thanks|cheers|sincerely)[,\s-]*\n*([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)/i)
  };
}
