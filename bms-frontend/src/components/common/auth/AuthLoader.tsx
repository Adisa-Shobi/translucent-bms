import { HoneycombLoader } from "@/components/common"

export const AuthLoader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <HoneycombLoader />
      <div className="absolute bottom-5 left-0 right-0 text-center text-lg">
        BMS
      </div>
    </div>
  )
}