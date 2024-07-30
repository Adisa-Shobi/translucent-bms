import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React from 'react'

interface LoadingButtonProps {
    loading: boolean
    children?: React.ReactNode
    className?: string
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
    type?: "submit" | "button" | "reset"
    onClick?: () => void
}

export const LoadingButton = (props: LoadingButtonProps) => {
    return (
        <Button
            variant={props.variant}
            disabled={props.loading}
            type={props.type}
            className={props.className}
            onClick={props.onClick}
        >
            {props.loading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
            {props.children}
        </Button>
    )
}
