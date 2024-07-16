import { ArgumentMetadata, Injectable, ParseBoolPipe } from "@nestjs/common";

@Injectable()
export class ParseOptBoolPipe extends ParseBoolPipe {
    transform(value: string | boolean, metadata: ArgumentMetadata): Promise<boolean> {
        if (typeof value === "undefined") {
            return null;
        }
        return super.transform(value, metadata);
    }
}