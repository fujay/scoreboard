const SocialMediaIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Twitter */}
    <path d="M22 4.01c-.77.35-1.6.58-2.46.69a4.28 4.28 0 0 0 1.88-2.37 8.46 8.46 0 0 1-2.7 1.03A4.23 4.23 0 0 0 16.3 2c-2.34 0-4.23 1.9-4.23 4.23 0 .33.04.65.11.96A11.98 11.98 0 0 1 3 3.16a4.23 4.23 0 0 0 1.31 5.64 4.21 4.21 0 0 1-1.92-.53v.05c0 2.05 1.46 3.76 3.4 4.14a4.23 4.23 0 0 1-1.91.07 4.24 4.24 0 0 0 3.95 2.94A8.5 8.5 0 0 1 2 19.54a11.95 11.95 0 0 0 6.49 1.9c7.79 0 12.05-6.46 12.05-12.05l-.01-.55A8.7 8.7 0 0 0 22 4.01z" />

    {/* Facebook (f logo stylized) */}
    <path d="M18 2h-2a4 4 0 0 0-4 4v2H10v3h2v7h3v-7h2.4l.6-3H15V6a1 1 0 0 1 1-1h2V2z" />

    {/* LinkedIn */}
    <path d="M4 9h3v10H4z" />
    <circle cx="5.5" cy="5.5" r="1.5" />
    <path d="M9 9h2.5v1.5c.4-.8 1.3-1.5 2.5-1.5 2.2 0 3 1.5 3 3.7V19h-3v-5c0-1-.5-1.5-1.3-1.5S12 13 12 14v5H9z" />
  </svg>
);

const SocialMediaIconSingle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2" />
    <path d="M3 9h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5l-4 4V11a2 2 0 0 1 2-2z" />
    <circle cx="7" cy="16" r="1" />
    <circle cx="11" cy="16" r="1" />
    <circle cx="15" cy="16" r="1" />
  </svg>
);

export { SocialMediaIcon, SocialMediaIconSingle };
