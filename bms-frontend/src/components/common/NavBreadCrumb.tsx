"use client"
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "../ui/separator"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Fragment } from "react"
import { Button } from "../ui/button"

export const NavBreadCrumb = () => {
    const paths = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()


    function cumulativeConcatenation(
        arr: string[],
        delimiter: string = ""
    ): string[] {
        return arr.reduce((acc, num) => {
            const lastValue = acc.length > 0 ? acc[acc.length - 1].toString() : "";
            const newValue = lastValue + delimiter + num.toString();
            acc.push(newValue);
            return acc;
        }, [] as string[]);
    }

    const pathNames = paths.split("/").filter((path) => path !== "");
    const pathLinks = cumulativeConcatenation(pathNames, "/");

    return (
        <div className="pt-3 pb-1">
            {/* <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbEllipsis />
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/docs/components">Components</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb> */}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link
                                className="capitalize hover:text-primary hover:font-semibold py-2"
                                href="/"
                            >
                                Home
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {pathNames.map((path, index, arr) => {
                        // Decode the path to remove %20 and other encoded characters
                        const decodedPath = decodeURIComponent(path)

                        // Accumulate the path segments to create the full URL for each breadcrumb
                        const query = searchParams.toString()

                        return (
                            <Fragment key={index}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link
                                            className="capitalize hover:text-primary hover:font-semibold py-2"
                                            href={{
                                                pathname: pathLinks[index],
                                                query: query,
                                            }}
                                        >
                                            {decodedPath}
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </Fragment>
                        )
                    })}
                </BreadcrumbList>
            </Breadcrumb>
            <Separator className="border-secondary mt-1 mb-2" />
        </div>
    )
}
