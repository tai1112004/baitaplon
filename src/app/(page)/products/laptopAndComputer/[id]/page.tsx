"use client"
import { DetailComputer } from "@/app/Components/Detail/DetailProduct";

import { useParams } from "next/navigation";
export default function laptopAndComputerPageDetail() {
    const category = "Laptop"
    return (
        <>
            <DetailComputer category={category} />
        </>
    )
}