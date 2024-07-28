import { Badge } from "@/components/ui/badge";
import { toDDMMM } from "@/lib/helpers/datetimeFormatters";
import { MdOutlineCalendarMonth } from "react-icons/md";

interface DateRangeBadgeProps {
    startDate: string;
    endDate: string;
}

export const DateRangeBadge = (props: DateRangeBadgeProps) => {
    return (
        <Badge variant="outline" className='text-secondary rounded-lg py-1 px-2 items-center gap-2' >
            <MdOutlineCalendarMonth size={20} />
            {toDDMMM(props.startDate)} - {toDDMMM(props.endDate)}
        </Badge>
    )
}
