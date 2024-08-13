"use client";
import { TbFileExport } from "react-icons/tb";
import * as XLSX from "xlsx"
import { LoadingButton } from "./LoadingButton";
import { useState } from "react";

interface ExportButtonProps {
    title: string;
    getData: () => Promise<any[]>;
}

export const ExportButton = (props: ExportButtonProps) => {
    const [loading, setLoading] = useState(false);

    const onClickExport = async () => {
        setLoading(true);
        try {
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils?.json_to_sheet((await props.getData()) || []);
            XLSX.utils.book_append_sheet(workbook, worksheet, props.title);
            XLSX.writeFile(workbook, `${props.title}.xlsx`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <LoadingButton loading={loading} onClick={onClickExport} className="text-white gap-2">
            <TbFileExport className="size-4" />
            Export
        </LoadingButton>
    );
}