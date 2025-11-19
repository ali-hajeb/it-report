import MaintenanceReport from "@/src/lib/module/maintenanceReport";
import { escapeRegex } from "@/src/utils/regex";
import { NextRequest, NextResponse } from "next/server";
import '@/src/lib/module/location';

export async function GET(req: NextRequest, ctx: RouteContext<'/api/maintenance/type/[id]'>) {
    try {
        const { id } = await ctx.params;
        const searchParams = req.nextUrl.searchParams;
        const { limit = '25', skip = '0', location, ...query } = Object.fromEntries(searchParams.entries());

        console.log('quey', query, searchParams.entries());
        const conditions = Object.keys(query).map(queryKey => {
            const regex = new RegExp(escapeRegex(query[queryKey]), 'i');
            return { [queryKey]: regex };
        });
        console.log('condition', conditions);

        const filter: { $and: Record<string, string | RegExp>[] } = { $and: [ ...conditions, { deviceType: id } ] };
        if (location) {
            filter.$and = [...(filter.$and), { location }]
        }


        const count = await MaintenanceReport.countDocuments(filter);
        console.log('count', count);
        const maintenanceReports = await MaintenanceReport.find(filter)
            .skip(parseInt(skip) * parseInt(limit))
            .limit(parseInt(limit))
            .populate(['location']);

        // console.log('reports', maintenanceReports);
        return NextResponse.json({ code: 200, message: '', maintenanceReports, count }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
