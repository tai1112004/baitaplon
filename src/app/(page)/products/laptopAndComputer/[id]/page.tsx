"use client"
import { DetailComputer } from "@/app/Components/Detail/DetailProduct";
export default function laptopAndComputerPageDetail() {
    const category = "laptop"
    return (
        <>
            <DetailComputer category={category} />
        </>
    )
}