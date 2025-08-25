import * as React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { SearchForm } from "./search-form";

// This is sample data.
const data = {
    navMain: [
        {
            title: "My Notebooks",
            url: "#",
            items: [
                {
                    title: "Personal",
                    url: "#",
                },
                {
                    title: "Work",
                    url: "#",
                },
                {
                    title: "Study",
                    url: "#",
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>{item.title}</a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
