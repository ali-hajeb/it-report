import type { IMaintenanceReport, INewMaintenanceReport } from "@/src/lib/module/maintenanceReport/";
import MaintenanceReport from "@/src/lib/module/maintenanceReport";
import { escapeRegex } from "@/src/utils/regex";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = body as INewMaintenanceReport;

        const maintenanceReport = await MaintenanceReport.create({ ...data });
        return NextResponse.json({ code: 200, message: '', maintenanceReport }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const { limit = '25', skip = '0', ...query } = Object.fromEntries(searchParams.entries());

        console.log('quey', query, searchParams.entries());
        const conditions = Object.keys(query).map(queryKey => {
            const regex = new RegExp(escapeRegex(query[queryKey]), 'i');
            return { [queryKey]: regex };
        });
        console.log('condition', conditions);


        const count = await MaintenanceReport.countDocuments({ $and: conditions });
        const maintenanceReports = await MaintenanceReport.find({ $and: conditions })
            .skip(parseInt(skip) * parseInt(limit))
            .limit(parseInt(limit))
            .populate(['location']);
        return NextResponse.json({ code: 200, message: '', maintenanceReports, count }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { _id, ...updatedData } = body as IMaintenanceReport;
        console.log(updatedData.location);

        const maintenanceReport = await MaintenanceReport.findByIdAndUpdate(_id, updatedData, { new: true });
        return NextResponse.json({ code: 200, message: '', maintenanceReport }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

