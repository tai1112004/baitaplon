"use client"
import { DetailComputer } from "@/app/Components/Detail/DetailProduct";
export default function laptopAndComputerPageDetail() {
    const category = "Laptop"
    return (
        <>
            <DetailComputer category={category} />
        </>
    )
}