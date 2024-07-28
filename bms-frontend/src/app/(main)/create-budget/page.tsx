import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CreateBudgetForm from "./components/CreateBudgetForm";

export default function CreatBudgetPage() {
    return (
        <div>
            <div>
                <h1 className='c-heading-3' >Create Budget</h1>
                <p className='c-subtitle text-base' >Create a new budget and collaborate with anyone</p>
            </div>
            <Separator className="mt-4 mb-10" />
            <div className="flex justify-center w-full" >
                <Card className="drop-shadow-md w-1/2 border-none mb-10" >
                    <CardContent className="p-6" >
                        <CreateBudgetForm />
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}
