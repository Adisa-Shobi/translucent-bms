import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FilePreviewProps {
    url: string;
    fileName: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ url, fileName }) => {
    const [fileType, setFileType] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFileType = async () => {
            try {
                const response = await fetch(url, { method: 'HEAD' });
                const contentType = response.headers.get('content-type');
                setFileType(contentType);
            } catch (error) {
                console.error('Error fetching file type:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFileType();
    }, [url]);

    if (loading) {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardContent className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </CardContent>
            </Card>
        );
    }

    const renderPreview = () => {
        if (fileType?.startsWith('image/')) {
            return (
                <img
                    src={url}
                    alt={fileName}
                    className="max-w-full max-h-64 object-contain"
                />
            );
        } else if (fileType === 'application/pdf') {
            return (
                <iframe
                    src={`${url}#view=FitH`}
                    className="w-full h-64"
                    title={fileName}
                />
            );
        } else {
            return (
                <div className="flex flex-col items-center justify-center h-64">
                    <p className="text-center mb-4">Preview not available for this file type.</p>
                    <Button asChild>
                        <a href={url} download={fileName}>Download File</a>
                    </Button>
                </div>
            );
        }
    };

    return (
        url && <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">Reciept</h3>
                {renderPreview()}
            </CardContent>
        </Card>
    );
};

export { FilePreview };