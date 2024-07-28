import { freezeBudget, unfreezeBudget } from "@/lib/api/budget/budget";
import { useSearchParams } from "next/navigation";
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const FreezeBudget = () => {
    const params = useSearchParams();
    const budget_id = params.get('budget_id');
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const showFreeze = budget_id ? true : false;

    const handleChange = (e: any) => {
        if (!checked) {
            handleFreeze(budget_id);
        } else {
            handleUnfreeze(budget_id);
        }
        setChecked(!checked);
    };

    const handleFreeze = (id: string | null) => {
        if (id) {
            setLoading(true);
            freezeBudget(id).then((res) => {
                if (res === null) {
                    setChecked(false);
                }
            }).finally(() => {
                setLoading(false)
            });
        }
    };

    const handleUnfreeze = (id: string | null) => {
        if (id) {
            setLoading(true);
            unfreezeBudget(id).then((res) => {
                if (res === null) {
                    setChecked(false);
                }
            }).finally(() => {
                setLoading(false)
            });
        }
    }


    return (
        <div className={`flex items-center space-x-2 ${showFreeze ? "visible" : "invisible"}`}>
            <Switch checked={checked} disabled={loading} onClick={handleChange} id="airplane-mode" />
            <Label htmlFor="airplane-mode">Freeze</Label>
        </div>
    )
}
