import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarRail,
} from "@/components/ui/sidebar";
import { SearchForm } from "./search-form";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
    notes?: { title: string; url: string }[]; // Added notes prop type
};

export function AppSidebar({ notes = [], ...props }: AppSidebarProps) {
    console.log(notes);
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <div className="flex items-center space-x-3 p-3">
                    <img
                        src="/icon-light.png"
                        alt="NotePilot Icon"
                        className="w-6 h-6 block dark:hidden"
                    />
                    <img
                        src="/icon-dark.png"
                        alt="NotePilot Icon"
                        className="hidden dark:block w-6 h-6"
                    />
                    <span className="text-lg font-semibold">NotePilot</span>
                </div>
                <SearchForm />
            </SidebarHeader>
            <SidebarContent>
                {notes.map((item, i) => (
                    <SidebarGroup key={i}>
                        <SidebarMenu>
                            <SidebarMenuButton key={i}>
                                <a href={item.title}>{item.title}</a>
                            </SidebarMenuButton>
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
