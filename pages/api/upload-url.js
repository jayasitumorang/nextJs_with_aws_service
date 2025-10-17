import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { filename, contentType } = req.query;

  if (!filename || !contentType) {
    return res.status(400).json({ error: "Missing filename or contentType" });
  }

  try {
    const s3 = new S3Client({
      region: process.env.NEXT_PUBLIC_AWS_REGION,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
      },
    });

    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
      Key: `uploads/${Date.now()}-${filename}`,
      ContentType: contentType,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 60 });
    return res.status(200).json({ url });
  } catch (error) {
    console.error("S3 Error:", error);
    return res.status(500).json({ error: "Failed to generate presigned URL" });
  }
}
