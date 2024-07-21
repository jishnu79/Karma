import { useAppSelector } from "@/Redux/Store"
import axios from "axios"
import { useRouter } from "next/router"
import React, { useCallback } from "react"
import { IconType } from "react-icons"
import useLoginModal from "@/hooks/LoginModal"
const API = axios.create({ baseURL: "http://127.0.0.1:3005" })

interface SideBarItemProp {
  label: string
  href?: string
  icon: IconType
  onClick?: () => void
  auth?: boolean
}

const SideBarItem: React.FC<SideBarItemProp> = ({
  label, href, icon: Icon, onClick,auth
}) => {
  const { user } = useAppSelector((state) =>
    state.user
)
  const router = useRouter()
  const loginModal = useLoginModal()
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick()
    }
    if (auth && !user) {
      loginModal.onOpen()
    }
   else if (href) {
      router.push(href)
    }
  }, [onClick, auth, user, href, loginModal, router])
  return (
    <div
      onClick={handleClick}
      className="flex flex-row items-center">
      <div className="relative rounded-full h-14 w-14 flex 
            items-center justify-center p-4 hover:bg-slate-300
            hover:bg-opacity-10 cursor-pointer lg:hidden
            ">
        <Icon size={28} color="white" />
      </div>
      <div className="
            relative hidden lg:flex items-center gap-4 p-4 rounded-full
            hover:bg-black hover:text-white hover:opacity-85 cursor-pointer
            ">
        <Icon size={28} color="white" />
        <p className="
                hidden lg:block text-white text-xl
                ">
          {label}
        </p>
      </div>
    </div>
  )
}

export default SideBarItem