import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FolderCode, Lock, Zap } from "lucide-react";

export default function Features() {
    const features = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Quick Notes",
            description:
                "Capture ideas instantly with lightning-fast input and keyboard-first UX. No friction — just flow.",
        },
        {
            icon: <FolderCode className="w-6 h-6" />,
            title: "Developer Friendly",
            description:
                "Markdown, code blocks, CLI shortcuts, and Git-style versioning. Feels like home.",
        },
        {
            icon: <Lock className="w-6 h-6" />,
            title: "Secure by Design",
            description:
                "Your notes are private. Local-first architecture and optional end-to-end encryption mean full control.",
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-semibold md:text-5xl">
                    🔧 Crafted for Developers Like You
                </h2>
                <p className="mt-4 text-muted-foreground">
                    Smart, flexible, and powerful — everything you need to build
                    your second brain.
                </p>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center">
                            <CardHeader>
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-medium">
                                    {feature.title}
                                </h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
