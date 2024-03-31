import { UserType } from "@/state/user/types"
import { getUserFromLocalStorage } from "@/utils/auth";
import { useEffect, useState } from "react"

const useLoggedInUser = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true)
    const user = getUserFromLocalStorage()
    setUser(user)
    setIsLoading(false)
  }, [])

  return { user, isLoading }
}

export default useLoggedInUser;