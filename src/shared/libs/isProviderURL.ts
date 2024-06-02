const isProviderURL = (profileUrl?: string) => {
  if (!profileUrl) return false;

  if (profileUrl.startsWith("https://")) {
    // Provider reserved profile image
    return true;
  }

  return false;
};

export default isProviderURL;
