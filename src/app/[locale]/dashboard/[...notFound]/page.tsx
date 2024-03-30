import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: `Page not found`
}

export default function CatchAll() {
  return notFound()
}