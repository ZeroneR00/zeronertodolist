import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    
    const body = await req.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
        where: { email }
    })
}