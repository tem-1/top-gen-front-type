const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "static-cse.canva.com",
      "localhost",
      "topgenius.tanusoft.mn", // ✅ protocol байхгүй
      "i.ibb.co",
      "s3.qpay.mn",
      "qpay.mn",
      "www.facebook.com", // ✅
      "www.instagram.com", // ✅
    ],
  },
};

export default nextConfig;
