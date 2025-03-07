import prisma from "@/prisma";
import { SUPABASE_API_KEY, SUPABASE_URL } from "@/shared/flags";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(SUPABASE_URL!, SUPABASE_API_KEY!);

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const userId = request.nextUrl.searchParams.get("userId");

  const image = formData.get("image") as any;

  if (!image) {
    return NextResponse.json(
      { message: "Image is required." },
      { status: 404 }
    );
  }

  const relativeImagePath = `topic-hub/${userId}/${image.name}`;

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(relativeImagePath, image, { cacheControl: "3600", upsert: true });

  if (!data || error) {
    return NextResponse.json(
      { message: "Couldn't upload the image." + error.message },
      { status: 500 }
    );
  }

  const signedUrlData = await supabase.storage
    .from("avatars")
    .createSignedUrl(relativeImagePath, 60 * 60 * 24 * 360);

  if (!signedUrlData || !signedUrlData.data) {
    return NextResponse.json(
      {
        message:
          "Couldn't create a signed url for the image." +
          signedUrlData.error.message,
      },
      { status: 500 }
    );
  }

  await prisma.user.update({
    where: { id: userId! },
    data: { avatar: signedUrlData.data.signedUrl },
  });

  return NextResponse.json({ message: "Success" }, { status: 200 });
};
