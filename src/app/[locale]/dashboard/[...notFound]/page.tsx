import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Page not found`
}

export default function CatchAll() {
  return notFound()
}