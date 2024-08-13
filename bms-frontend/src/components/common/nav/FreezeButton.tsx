import { freezeBudget, getBudget, unfreezeBudget } from "@/lib/api/budget/budget";
import { useParams, useSearchParams } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import { toast } from "@/components/ui/use-toast";

export const FreezeBudget = () => { 
    const searchParams = useSearchParams();
    const budget_id = searchParams.get("budget_id");
    const [checked, setChecked] = useState(false);
    const showFreeze = budget_id ? true : false;

    const debouncedHandleChange = useCallback(
        debounce((checked, budget) => {
            if (checked) {
                handleFreeze(budget);
            } else {
                handleUnfreeze(budget);
            }
        }, 2000),
        []
    );

    const handleChange = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        debouncedHandleChange(newChecked, budget_id);
    };

    const handleFreeze = (id: any) => {
        if (id) {
            freezeBudget(id).then((res) => {
                if (res === null) {
                    setChecked(false);
                } else {
                    toast({
                        description: "Frozen successfuly",
                    });
                }
            });
        }
    };

    const handleUnfreeze = (id: any) => {
        if (id) {
            unfreezeBudget(id).then((res) => {
                if (res === null) {
                    setChecked(true);
                } else {
                    toast({
                        description: "Unfrozen successfully",
                    });
                }
            });
        }
    };

    const getBudgetReq = (id: any) => {
        if (id) {
            getBudget(id).then((res) => {
                if (res) {
                    setChecked(res.isFrozen);
                }
            });
        }
    };

    useEffect(() => {
        getBudgetReq(budget_id);
    }, [budget_id]);

    return (
        <div className={`flex items-center space-x-2 ${showFreeze ? "visible" : "invisible"}`}>
            <Switch checked={checked} onClick={handleChange} id="airplane-mode" />
            <Label htmlFor="airplane-mode">Freeze</Label>
        </div>
    );
};
