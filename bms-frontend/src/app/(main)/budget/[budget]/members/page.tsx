import { AddMemberButton } from "./components/AddMemberButton";

export default function page() {
    return (
        <div className="flex justify-center">
            <div className="w-3/5">
                <div className="w-full flex justify-end">
                    <AddMemberButton />
                </div>
                <div className="border rounded-lg border-secondary p-4" >

                </div>
            </div>
        </div>
    )
}
