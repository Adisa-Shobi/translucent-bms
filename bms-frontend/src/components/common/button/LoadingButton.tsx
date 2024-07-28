import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React from 'react'

interface LoadingButtonProps {
    loading: boolean
    children?: React.ReactNode
    className: string
    type?: "submit" | "button" | "reset"
}

export const LoadingButton = (props: LoadingButtonProps) => {
    return (
        <Button
            disabled={props.loading}
            type={props.type}
            className={props.className}
        >
            {props.loading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
            {props.children}
        </Button>
    )
}
