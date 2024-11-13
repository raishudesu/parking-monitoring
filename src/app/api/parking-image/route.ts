import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const body = await req.json();

  const { parkingImageId } = body;

  try {
    const deletedImage = await prisma.parkingSpaceImage.delete({
      where: {
        id: parkingImageId,
      },
    });

    return NextResponse.json(
      { message: "Deleted", deletedImage },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
