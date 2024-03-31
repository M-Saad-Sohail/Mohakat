import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Page not found`
}


export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
      <div className="text-3xl">Page not exists</div>
      <p className="text-1xl">Website is currently under development</p>
    </div>
  )
}