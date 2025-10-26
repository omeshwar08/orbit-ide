import { SidebarProvider } from "@/components/ui/sidebar";
import { getAllPlaygroundForUser } from "@/modules/dashboard/actions";
import { DashboardSidebar } from "@/modules/dashboard/components/dashboard-sidebar";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const playgroundData = await getAllPlaygroundForUser();
	const technologyIconMap: Record<string, string> = {
		REACT: "Zap",
		NEXTJS: "Lightbulb",
		EXPRESS: "Database",
		VUE: "Compass",
		HONO: "FlameIcon",
		ANGULAR: "Terminal",
	};
	const formattedPlaygroundData = playgroundData?.map((item) => ({
		id: item.id,
		name: item.title,
		//todo: star
		starred: item.Starmark?.[0]?.isMarked || false,
		icon: technologyIconMap[item.template] || "Code2",
	}));
	return (
		<SidebarProvider>
			<div className="flex min-h-screen w-full overflow-x-hidden">
				<main className="flex-1">
					{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
					{/* @ts-expect-error: error for typecript */}
					<DashboardSidebar initialPlaygroundData={formattedPlaygroundData} />
					{children}
				</main>
			</div>
		</SidebarProvider>
	);
}
